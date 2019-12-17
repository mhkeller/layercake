<script>
import { LayerCake, Svg, Html } from '../LayerCake';

import Dots from './Dots.svelte';
import HtmlDots from './HtmlDots.svelte';

let width;
let height;

const data = [
	{ x: 0, y: 0 },
	{ x: 10, y: 20 },
	{ x: 15, y: 15 },
	{ x: 12, y: 10 },
	{ x: 5, y: 10 }
];

const padding = { top: 10, right: 10, bottom: 10, left: 10,  };
</script>

<style>
	#my-container {
		width: 100%;
		height: 200px;
		background: #f0c;
	}
</style>

<div id="my-container" bind:clientWidth={width} bind:clientHeight={height}>
	<LayerCake
		{width}
		{height}
		x={'x'}
		y={'y'}
		data={data}
		reverseY={false}
		{padding}
	>
		<Svg>
			<Dots/>
		</Svg>

		<Html>
			<HtmlDots/>
		</Html>

	</LayerCake>
</div>
