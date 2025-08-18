<script>
	import CopyIcon from './CopyIcon.svelte';

	/** @type Function */
	export let getText;

	async function copyToClipboard() {
		let text = getText();

		try {
			if (navigator.clipboard && window.isSecureContext) {
				// Use modern Clipboard API
				await navigator.clipboard.writeText(text);
				return true;
			} else {
				// Fallback for older browsers or non-secure contexts
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.left = '-999999px';
				textarea.style.top = '-999999px';
				document.body.appendChild(textarea);
				textarea.focus();
				textarea.select();

				const success = document.execCommand('copy');
				document.body.removeChild(textarea);
				return success;
			}
		} catch (error) {
			console.warn('Copy to clipboard failed:', error);
			return false;
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="copy" onclick={copyToClipboard} onkeypress={copyToClipboard}><CopyIcon /></div>

<style>
	.copy {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 36px;
		opacity: 0.25;
		background-size: contain;
		cursor: pointer;
	}

	.copy:hover {
		opacity: 1;
	}

	.copy:active {
		opacity: 0.7;
	}

	.copy:hover:before {
		display: block;
	}

	.copy:before {
		content: 'Copy to clipboard';
		position: absolute;
		top: -7px;
		right: 0;
		background-color: #000;
		border-radius: 2px;
		color: #fff;
		display: none;
		font-size: 13px;
		padding: 3px 5px;
		white-space: nowrap;
		transform: translate(0%, -100%);
	}

	@media (max-width: 750px) {
		.copy {
			transform: translate(0, -80%);
		}
	}
</style>
