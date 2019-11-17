<script>
import { getContext } from 'svelte';
import { key } from './key.js';

const context = getContext(key);
console.log(context);
</script>

<!-- <p>width is {$width}</p>
<p>height is {$height}</p>
 -->
<svg>
	<g>
		{#each context.data as row}
			<circle cx="{context.xGet(row)}" cy="{context.yGet(row)}" r="5" fill="black" />
		{/each}

		<slot></slot>
	</g>
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
