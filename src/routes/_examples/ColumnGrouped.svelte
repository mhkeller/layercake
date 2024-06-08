<script>
  import { LayerCake, Svg, Html, groupLonger, flatten } from 'layercake';
  import { scaleBand, scaleOrdinal } from 'd3-scale';

  import ColumnGrouped from '../../_components/ColumnGrouped.svelte';
  import AxisX from '../../_components/AxisX.svelte';
  import AxisY from '../../_components/AxisY.svelte';

	import data from '../../_data/yearGroups.js';

	const groupName = 'year';
	const subgroupNames = ['apples', 'bananas'];

	const subgroups = groupLonger(data, subgroupNames);
	const flatData = flatten(subgroups, d => d.values);

	const xKey = groupName;
  const yKey = 'value';
	const subgroupKey = 'subgroup';

	const groups = data.map(d => {
		return {
			[xKey]: d[xKey],
			values: subgroupNames.map(g => {
			return {
				[subgroupKey]: g,
				[yKey]: d[g]
			}
		})
		}
	});
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
    height: 250px;
  }
</style>

<div class="chart-container">
  <LayerCake
    padding={{ top: 0, right: 10, bottom: 20, left: 20 }}
    x={xKey}
    y={yKey}
		r={subgroupKey}
		z={subgroupKey}

    xScale={scaleBand().paddingInner(0.1).round(true)}
		rScale={scaleBand().paddingInner(0).round(true)}
		rDomain={subgroupNames}

		zScale={scaleOrdinal()}
		zRange={['#fc0', '#c0f']}

		deriveScales={{
			subgroupScale: ({ xScale, rScale }) => {
				rScale.range([0, xScale.bandwidth()]);
				return rScale;
			}
		}}

    yDomain={[0, null]}
    data={groups}
		{flatData}
		debug={false}
  >
    <Svg>
      <AxisX
        gridlines={false}
      />

      <AxisY
        snapBaselineLabel
      />
      <ColumnGrouped/>
    </Svg>

  </LayerCake>
</div>
