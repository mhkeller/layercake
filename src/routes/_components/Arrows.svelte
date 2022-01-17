<script>
	import { LayerCake, Svg, Html } from 'layercake';

	import Annotations from '../../components/Annotations.html.svelte';
	import Arrows from '../../components/Arrows.svelte';
	import ArrowheadMarker from '../../components/ArrowheadMarker.svelte';

	const annotations = [
		{
			text: 'Arrows...',
			top: '18%',
			left: '30%',
			arrows: [{
				clockwise: false, // true or false, defaults to true
				source: {
					anchor: 'left-bottom', // can be `{left, middle, right},{top-middle-bottom}`
					dx: -2,
					dy: -7
				},
				target: {
					x: '28%',
					y: '75%'
				}
			},
			{
				source: {
					anchor: 'right-bottom',
					dy: -7,
					dx: 5
				},
				target: {
					x: '68%',
					y: '48%'
				}
			}]
		}
	];
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 100%;
	}
</style>

<div class="chart-container">
	<LayerCake>
		<Html>
			<Annotations {annotations}/>
		</Html>

		<Svg>
			<svelte:fragment slot="defs">
				<ArrowheadMarker/>
			</svelte:fragment>
			<Arrows {annotations}/>
		</Svg>
	</LayerCake>
</div>
