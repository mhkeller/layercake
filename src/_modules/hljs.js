/**
 * The site's highlight.js instance. It registers just the languages the site
 * shows: Svelte files and the JS, JSON and CSV files they import, plus the
 * html, js, sh and txt code blocks in the guide. Loading only these keeps the
 * full highlight.js language bundle out of the client build.
 */
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import diff from 'highlight.js/lib/languages/diff';
import plaintext from 'highlight.js/lib/languages/plaintext';

import hljsDefineSvelte from './hljsDefineSvelte.js';

/**
 * The language files are plain JS, so TypeScript reads their return shapes
 * loosely and won't accept them where highlight.js asks for a LanguageFn.
 * @param {unknown} language
 * @returns {import('highlight.js').LanguageFn}
 */
const asLanguage = language => /** @type {import('highlight.js').LanguageFn} */ (language);

hljs.registerLanguage('xml', asLanguage(xml));
hljs.registerLanguage('javascript', asLanguage(javascript));
hljs.registerLanguage('css', asLanguage(css));
hljs.registerLanguage('json', asLanguage(json));
hljs.registerLanguage('bash', asLanguage(bash));
// CSV files are shown with the diff grammar, which colors the header row
hljs.registerLanguage('diff', asLanguage(diff));
hljs.registerLanguage('plaintext', asLanguage(plaintext));
hljs.registerLanguage('svelte', asLanguage(hljsDefineSvelte));

export default hljs;
