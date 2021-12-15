<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
  import { LayerCake, Svg } from '$lib/index.js';

  import Line from './components/Line.svelte';
  import Area from './components/Area.svelte';
  import AxisX from './components/AxisX.svelte';
  import AxisY from './components/AxisY.svelte';

  // This example loads csv data as json using @rollup/plugin-dsv
	const data = [
	{
		myX: 1979,
		myY: 7.19
	},
	{
		myX: 1980,
		myY: 7.83
	},
	{
		myX: 1981,
		myY: 7.24
	},
	{
		myX: 1982,
		myY: 7.44
	},
	{
		myX: 1983,
		myY: 7.51
	},
	{
		myX: 1984,
		myY: 7.1
	},
	{
		myX: 1985,
		myY: 6.91
	},
	{
		myX: 1986,
		myY: 7.53
	},
	{
		myX: 1987,
		myY: 7.47
	},
	{
		myX: 1988,
		myY: 7.48
	},
	{
		myX: 1989,
		myY: 7.03
	},
	{
		myX: 1990,
		myY: 6.23
	},
	{
		myX: 1991,
		myY: 6.54
	},
	{
		myX: 1992,
		myY: 7.54
	},
	{
		myX: 1993,
		myY: 6.5
	},
	{
		myX: 1994,
		myY: 7.18
	},
	{
		myX: 1995,
		myY: 6.12
	},
	{
		myX: 1996,
		myY: 7.87
	},
	{
		myX: 1997,
		myY: 6.73
	},
	{
		myX: 1998,
		myY: 6.55
	},
	{
		myX: 1999,
		myY: 6.23
	},
	{
		myX: 2000,
		myY: 6.31
	},
	{
		myX: 2001,
		myY: 6.74
	},
	{
		myX: 2002,
		myY: 5.95
	},
	{
		myX: 2003,
		myY: 6.13
	},
	{
		myX: 2004,
		myY: 6.04
	},
	{
		myX: 2005,
		myY: 5.56
	},
	{
		myX: 2006,
		myY: 5.91
	},
	{
		myX: 2007,
		myY: 4.29
	},
	{
		myX: 2008,
		myY: 4.72
	},
	{
		myX: 2009,
		myY: 5.38
	},
	{
		myX: 2010,
		myY: 4.92
	},
	{
		myX: 2011,
		myY: 4.61
	},
	{
		myX: 2012,
		myY: 3.62
	},
	{
		myX: 2013,
		myY: 5.35
	},
	{
		myX: 2014,
		myY: 5.28
	},
	{
		myX: 2015,
		myY: 4.63
	},
	{
		myX: 2016,
		myY: 4.72
	}
];


  const xKey = 'myX';
  const yKey = 'myY';

  data.forEach(d => {
    d[yKey] = +d[yKey];
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
    height: 100%;
  }
</style>

<div class="chart-container">
  <LayerCake
    padding={{ right: 10, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    yDomain={[0, null]}
    data={data}
  >
    <Svg>
      <AxisX/>
      <AxisY
        ticks={4}
      />
      <Line/>
      <Area/>
    </Svg>
  </LayerCake>
</div>
