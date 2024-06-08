<!--
  @component
  Generates an SVG column chart.
 -->
 <script>
  import { getContext } from 'svelte';

	const { data, xGet, yGet, x, yRange, xScale, subgroupScale, r, y, height, zGet } = getContext('LayerCake');

	/** @type {String} [fill] - The shape's fill color. */
	export let fill = undefined;

	/** @type {String} [stroke='#000'] - The shape's stroke color. */
	export let stroke = '#000';

	/** @type {Number} [strokeWidth=0] - The shape's stroke width. */
	export let strokeWidth = 0;

	/** @type {Boolean} [false] - Show the numbers for each column */
	export let showLabels = false;

  $: columnWidth = d => {
    const vals = $subgroupScale($r(d));
    return Math.abs(vals[1] - vals[0]);
  };

  $: columnHeight = d => {
    return $yRange[0] - $yGet(d);
  };
</script>

<g class="column-group">
  {#each $data as group, i}
		<g data-which="{$x(group)}" transform='translate({$xGet(group) + $xScale.bandwidth () / 2}, 0)'>
		  {#each group.values as d, i}
				{@const colHeight = columnHeight(d)}
				{@const got = $subgroupScale($r(d))}
				{@const xPos = Array.isArray(got) ? got[0] : got}
				{@const colWidth = $subgroupScale.bandwidth ? $subgroupScale.bandwidth() : columnWidth(d)}
				{@const yValue = $y(d)}
				{@const subgroupRange = $subgroupScale.range()}
					<g transform="translate({(subgroupRange[1] - subgroupRange[0]) / -2}, 0)">
				    <rect
				      class='group-rect'
				      data-id="{i}"
				      data-range="{$r(d)}"
				      data-count="{yValue}"
				      x="{xPos}"
				      y="{$yGet(d)}"
				      width="{colWidth}"
				      height="{colHeight}"
				      fill={fill || $zGet(d)}
				      {stroke}
				      stroke-width="{strokeWidth}"
				    />
				    {#if showLabels && yValue}
				      <text x="{xPos + colWidth / 2}" y="{$height - colHeight - 5}" text-anchor="middle">{yValue}</text>
				    {/if}
					</g>
			{/each}
		</g>
	{/each}
</g>

<style>
  text {
    font-size: 12px;
  }
</style>
