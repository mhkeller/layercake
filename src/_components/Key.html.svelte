<!--
	@component
	Creates a key for ordinal scales on `zScale`.
 -->
<script>
	import { getContext } from 'svelte';

	/** @type {String} [shape='square'] - The shape for each item. Can be 'circle', 'line', or 'square'; */
	export let shape = 'square';

	/** @type {String} [align='start'] - Sets the CSS flexbox justify-content setting for the box as a whole. Can be 'start', 'center' or 'end'. */
	export let align = 'start';

	/** @type {Function|Object} [lookup] - Either a function that takes the value and returns a formatted string, or an object of values. If a given value is not present in a lookup object, it returns the original value. */
	export let lookup = undefined;

	/** @type {Boolean} [capitalize=true] - Capitalize the first character. */
	export let capitalize = true;

	const { zDomain, zScale } = getContext('LayerCake');

	function cap (val) {
		return String(val).replace(/^\w/, d => d.toUpperCase());
	}

	function displayName (val) {
		if (lookup) {
			return typeof lookup === 'function' ? lookup(val) : (lookup[val] || val);
		}
		return capitalize === true ? cap(val) : val;
	}
</script>

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
		text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff;
	}
</style>

<div class='key' style="justify-content: {align === 'end' ? 'flex-end': align};">
	{#each $zDomain as item}
		<div class='key-item'>
			<div
				class='chip chip__{shape}'
				style='background: {
					shape === `line` ?
					`linear-gradient(-45deg, #ffffff 40%, ${$zScale(item)} 41%, ${$zScale(item)} 59%, #ffffff 60%)`
					: $zScale(item)};'
			></div>
			<div class='name'>{displayName(item)}</div>
		</div>
	{/each}
</div>
