<script>
	import { LayerCake, Svg } from 'layercake';

	import ArrowheadMarker from '../../_components/ArrowheadMarker.svelte';
</script>

<div class="chart-container">
	<LayerCake padding={{ top: 10, right: 10, bottom: 10, left: 10 }}>
		{#snippet children(k)}
			<Svg>
				{#snippet defs()}
					<ArrowheadMarker />
				{/snippet}
				<!-- Any path can end in the marker by pointing marker-end at its id -->
				<path
					class="arrow"
					marker-end="url(#arrowhead)"
					d="M {k.width * 0.1} {k.height * 0.85} L {k.width * 0.45} {k.height * 0.2}"
				/>
				<path
					class="arrow"
					marker-end="url(#arrowhead)"
					d="M {k.width * 0.55} {k.height * 0.85} Q {k.width * 0.75} {k.height * 0.85} {k.width *
						0.9} {k.height * 0.25}"
				/>
			</Svg>
		{/snippet}
	</LayerCake>
</div>

<style>
	/* Give the wrapper a width and height. LayerCake fills it. */
	.chart-container {
		width: 100%;
		height: 250px;
	}
	.arrow {
		fill: none;
		stroke: #000;
		stroke-width: 1;
	}
</style>
