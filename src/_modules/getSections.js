import fs from 'fs';
import path from 'path';
import * as fleece from 'golden-fleece';
import hljs from 'highlight.js';

import * as marked from 'marked';
import processMarkdown from './processMarkdown.js';
import slugify from './slugify.js';
import hljsDefineSvelte from './hljsDefineSvelte.js';

hljs.registerLanguage('svelte', hljsDefineSvelte);

hljsDefineSvelte(hljs);

const escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

const unescaped = Object.keys(escaped).reduce(
	(unescaped, key) => ((unescaped[escaped[key]] = key), unescaped),
	{}
);

function unescape(str) {
	return String(str).replace(/&.+?;/g, match => unescaped[match] || match);
}

const blockTypes =
	'blockquote html heading hr list listitem paragraph table tablerow tablecell'.split(' ');

function extractMeta(line, lang) {
	try {
		if (lang === 'html' || lang === 'svelte') {
			if (line.startsWith('<!--') && line.endsWith('-->')) {
				return fleece.evaluate(line.slice(4, -3).trim());
			}
		}

		if (lang === 'js' || lang === 'json') {
			if (line.startsWith('/*') && line.endsWith('*/')) {
				return fleece.evaluate(line.slice(2, -2).trim());
			}
		}
		return null;
	} catch (err) {
		console.error(err);
		return null;
	}
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function getHash(str) {
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return (hash >>> 0).toString(36);
}

const demos = new Map();

export default function (returnHtml = true) {
	const store = {};
	return fs
		.readdirSync(`src/content/guide`)
		.filter(file => file[0] !== '.' && path.extname(file) === '.md')
		.map(file => {
			const markdown = fs.readFileSync(`src/content/guide/${file}`, 'utf-8').replace(/\t/g, '  ');

			const { content, metadata } = processMarkdown(markdown);

			const groups = [];
			let group = null;
			let uid = 1;

			const renderer = {
				heading(token) {
					// In marked v16, the heading renderer receives a single token object
					const textString = token.text || '';
					const level = token.depth || 1;
					const slug = slugify(textString, null, store);

					return `<h${level} id="${slug}">${textString}<a href="/guide#${slug}"> </a></h${level}>`;
				},

				code(token) {
					// In marked v16, the code renderer receives a single token object
					let actualSource = token.text || token.raw || '';
					const actualLang = token.lang || 'text';

					if (!actualSource) {
						return '';
					}

					const lines = actualSource.split('\n');

					const meta = extractMeta(lines[0].trim(), actualLang);

					let prefix = '';
					let className = 'code-block';

					if (actualLang === 'html' && !group) {
						// if (!meta || meta.repl !== false) {
						// 	prefix = `<a class='open-in-repl' href='repl?demo=@@${uid}'>REPL</a>`;
						// }

						group = { id: uid++, blocks: [] };
						groups.push(group);
					}

					if (meta) {
						actualSource = lines.slice(1).join('\n');
						const filename = meta.filename || (actualLang === 'html' && 'App.html');
						if (filename) {
							prefix = `<span class='filename'>${prefix} ${filename}</span>`;
							className += ' named';
						}
					}
					if (group)
						group.blocks.push({ meta: meta || {}, lang: actualLang, source: actualSource });

					if (meta && meta.hidden) return '';

					const highlighted = hljs.highlight(actualSource, {
						language: actualLang || 'text'
					}).value;
					return `<div class='${className}'>${prefix}<pre><code>${highlighted}</code></pre></div>`;
				},

				// Reset group for block-level elements
				blockquote() {
					group = null;
					return false;
				},
				html() {
					group = null;
					return false;
				},
				hr() {
					group = null;
					return false;
				},
				list() {
					group = null;
					return false;
				},
				listitem() {
					group = null;
					return false;
				},
				paragraph() {
					group = null;
					return false;
				},
				table() {
					group = null;
					return false;
				},
				tablerow() {
					group = null;
					return false;
				},
				tablecell() {
					group = null;
					return false;
				}
			};

			marked.use({ renderer });

			let html = marked.marked(content);

			const hashes = {};

			groups.forEach(group => {
				const main = group.blocks[0];
				if (main.meta.repl === false) return;

				const hash = getHash(group.blocks.map(block => block.source).join(''));
				hashes[group.id] = hash;

				const json5 = group.blocks.find(block => block.lang === 'json');

				const title = main.meta.title;
				// if (!title) console.error(`Missing title for demo in ${file}`);

				demos.set(
					hash,
					JSON.stringify({
						title: title || 'Example from guide',
						components: group.blocks
							.filter(block => block.lang === 'html' || block.lang === 'js')
							.map(block => {
								const [name, type] = (block.meta.filename || '').split('.');
								return {
									name: name || 'App',
									type: type || 'html',
									source: block.source
								};
							}),
						json5: json5 && json5.source
					})
				);
			});

			const subsections = [];
			const pattern = /<h3 id="(.+?)">(.+?)<\/h3>/g;
			let match;

			while ((match = pattern.exec(html))) {
				const slug = match[1];
				const title = unescape(
					match[2]
						.replace(/^(\w+)(\((.+)?\))?/, (m, $1, $2, $3) => {
							if ($3) return `${$1}(...)`;
							if ($2) return `${$1}()`;
							return $1;
						})
						.replace(/\.(\w+)(\((.+)?\))?/, (m, $1, $2, $3) => {
							if ($3) return `.${$1}(...)`;
							if ($2) return `.${$1}()`;
							return `.${$1}`;
						})
						.split('<a')[0]
						.split(' <code>')[0]
						.replace(/<\/?code>/g, '')
				);
				subsections.push({ slug, title });
			}

			// Nicer formatting for function calls and args
			while ((match = pattern.exec(html))) {
				const formatted = match[2].replace(/((\w+)\.)?(\w+)\((.+)?\)/, (m, $1, $2, $3, $4 = '') => {
					if ($1)
						return `<span class="function">${$1}</span>${$3}<span class="call">(<span class="arguments">${$4}</span>)</span>`;
					return m.replace(
						`(${$4})`,
						`<span class="call">(<span class="arguments">${$4}</span>)</span>`
					);
				});
				html = html.replace(match[2], formatted);
			}

			return {
				html: returnHtml === true ? html.replace(/@@(\d+)/g, (m, id) => hashes[id] || m) : null,
				metadata,
				subsections,
				slug: file.replace(/^\d+-/, '').replace(/\.md$/, ''),
				file
			};
		});
}
