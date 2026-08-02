<!--
	@component
	Creates a key for ordinal scales on `cScale`.
 -->
<script>
	import { getLayerCakeContext } from 'layercake';

	/**
	 * @typedef {Object} Props
	 * @property {string} [shape='square'] - The shape for each item. Can be 'circle', 'line', or 'square';
	 * @property {string} [align='start'] - Sets the CSS flexbox justify-content setting for the box as a whole. Can be 'start', 'center' or 'end'.
	 * @property {Function|Object} [lookup] - Either a function that takes the value and returns a formatted string, or an object of values. If a given value is not present in a lookup object, it returns the original value.
	 * @property {boolean} [capitalize=true] - Capitalize the first character.
	 */

	/** @type {Props} */
	let { shape = 'square', align = 'start', lookup, capitalize = true } = $props();

	const cake = getLayerCakeContext();

	function cap(val) {
		return String(val).replace(/^\w/, d => d.toUpperCase());
	}

	function displayName(val) {
		if (lookup) {
			return typeof lookup === 'function' ? lookup(val) : lookup[val] || val;
		}
		return capitalize === true ? cap(val) : val;
	}
</script>

<div class="key" style="justify-content: {align === 'end' ? 'flex-end' : align};">
	{#each cake.cDomain as item}
		<div class="key-item">
			<div
				class="chip chip__{shape}"
				style="background: {shape === `line`
					? `linear-gradient(-45deg, #ffffff 40%, ${cake.cScale(item)} 41%, ${cake.cScale(item)} 59%, #ffffff 60%)`
					: cake.cScale(item)};"
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
