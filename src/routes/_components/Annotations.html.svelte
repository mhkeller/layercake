<script>
	import { LayerCake, Html } from 'layercake';

	import Annotations from '../../_components/Annotations.html.svelte';

	const annotations = [
		{
			text: 'CSS-positioned annotation...',
			top: '10%',
			left: '15%'
		},
		{
			text: '...and another one',
			right: '18%',
			bottom: '10%'
		}
	];
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 0, right: 0, bottom: 20, left: 20 }}>
		<Html>
			<Annotations {annotations} />
		</Html>
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
