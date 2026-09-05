<!--
	@component
	Generates an HTML key for an ordinal `c` scale, with one chip and label per domain value.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	const k = getLayerCakeContext();

	/**
	 * @typedef {Object} Props
	 * @property {'circle'|'line'|'square'} [shape='square'] - The shape of each chip.
	 * @property {'start'|'center'|'end'} [align='start'] - Where the key sits in its box, as flexbox `justify-content`.
	 * @property {((d: any) => string)|Record<string, string>} [lookup] - Either a function that formats a value, or an object mapping values to labels. A value missing from the object is shown as is.
	 * @property {boolean} [capitalize=true] - Capitalize the first character of each label.
	 */

	/** @type {Props} */
	let { shape = 'square', align = 'start', lookup, capitalize = true } = $props();

	/** @param {any} val */
	function capitalizeFirst(val) {
		return String(val).replace(/^\w/, d => d.toUpperCase());
	}

	/** @param {any} val */
	function displayName(val) {
		if (lookup) {
			return typeof lookup === 'function' ? lookup(val) : lookup[val] || val;
		}
		return capitalize === true ? capitalizeFirst(val) : val;
	}
</script>

<div class="key" style="justify-content: {align === 'end' ? 'flex-end' : align};">
	{#each k.cDomain as item}
		<div class="key-item">
			<div
				class="chip chip__{shape}"
				style="background: {shape === `line`
					? `linear-gradient(-45deg, #ffffff 40%, ${k.cScale?.(item) ?? '#ccc'} 41%, ${k.cScale?.(item) ?? '#ccc'} 59%, #ffffff 60%)`
					: (k.cScale?.(item) ?? '#ccc')};"
			></div>
			<div class="name">{displayName(item)}</div>
		</div>
	{/each}
</div>

<style>
	.key {
		display: flex;
	}
	.key-item {
		margin-right: 14px;
	}
	.chip {
		display: inline-block;
		position: relative;
		width: 12px;
		height: 12px;
	}
	.chip__circle {
		border-radius: 50%;
	}
	.chip__line:after {
		content: '';
		position: absolute;
		border-width: 3px;
		width: 14px;
		transform: rotate(-45deg);
		transform-origin: 14px 5px;
	}
	.name {
		display: inline;
		font-size: 14px;
		text-shadow:
			-1px -1px 0 #fff,
			1px -1px 0 #fff,
			-1px 1px 0 #fff,
			1px 1px 0 #fff;
	}
</style>
