import Line from './_examples/Line.svelte';
import Scatter from './_examples/Scatter.svelte';
import MapSvg from './_examples/MapSvg.svelte';
import Column from './_examples/Column.svelte';
import AreaStacked from './_examples/AreaStacked.svelte';
import ColumnStacked from './_examples/ColumnStacked.svelte';
import MultiLine from './_examples/MultiLine.svelte';
import MapLayered from './_examples/MapLayered.svelte';
import Bar from './_examples/Bar.svelte';
import BarStacked from './_examples/BarStacked.svelte';
import ScatterWebGL from './_examples/ScatterWebgl.svelte';
import ClevelandDotPlot from './_examples/ClevelandDotPlot.svelte';
import Histogram from './_examples/Histogram.svelte';
import SmallMultiples from './_examples/SmallMultiples.svelte';
import Calendar from './_examples/Calendar.svelte';
import Timeplot from './_examples/Timeplot.svelte';
import Radar from './_examples/Radar.svelte';
import CirclePack from './_examples/CirclePack.svelte';
import CirclePackNested from './_examples/CirclePackNested.svelte';
import Sankey from './_examples/Sankey.svelte';
import Brush from './_examples/Brush.svelte';
import SyncedBrush from './_examples/SyncedBrush.svelte';
import Beeswarm from './_examples/Beeswarm.svelte';
import BeeswarmForce from './_examples/BeeswarmForce.svelte';
import CirclePackForce from './_examples/CirclePackForce.svelte';

export default [
	{
		title: 'Line + area',
		slug: 'Line',
		component: Line
	},
	{
		title: 'WebGL Scatter (svg axes, quadtree hover)',
		slug: 'ScatterWebgl',
		component: ScatterWebGL
	},
	{
		title: 'Map (svg, tooltip, pre-projected)',
		slug: 'MapSvg',
		component: MapSvg
	},
	{
		title: 'Multilayer map (canvas + svg)',
		slug: 'MapLayered',
		component: MapLayered
	},
	{
		title: 'Column annotated',
		slug: 'Column',
		component: Column
	},
	{
		title: 'Stacked column',
		slug: 'ColumnStacked',
		component: ColumnStacked
	},
	{
		title: 'Bar',
		slug: 'Bar',
		component: Bar
	},
	{
		title: 'Stacked bar',
		slug: 'BarStacked',
		component: BarStacked
	},
	{
		title: 'Multiline (html labels + quadtree tooltip)',
		slug: 'MultiLine',
		component: MultiLine
	},
	{
		title: 'Stacked area',
		slug: 'AreaStacked',
		component: AreaStacked
	},
	{
		title: 'Scatter (svg + canvas + voronoi)',
		slug: 'Scatter',
		component: Scatter
	},
	{
		title: 'Cleveland dot plot',
		slug: 'ClevelandDotPlot',
		component: ClevelandDotPlot
	},
	{
		title: 'Calendar (one cake per month)',
		slug: 'Calendar',
		component: Calendar
	},
	{
		title: 'Time of day plot',
		slug: 'Timeplot',
		component: Timeplot
	},
	{
		title: 'Histogram (variable bins)',
		slug: 'Histogram',
		component: Histogram
	},
	{
		title: 'Small multiples (animated domain transition)',
		slug: 'SmallMultiples',
		component: SmallMultiples
	},
	{
		title: 'Radar chart',
		slug: 'Radar',
		component: Radar
	},
	{
		title: 'Circle pack',
		slug: 'CirclePack',
		component: CirclePack
	},
	{
		title: 'Nested circle pack',
		slug: 'CirclePackNested',
		component: CirclePackNested
	},
	{
		title: 'Sankey',
		slug: 'Sankey',
		component: Sankey
	},
	{
		title: 'Brush',
		slug: 'Brush',
		component: Brush
	},
	{
		title: 'Synced brush',
		slug: 'SyncedBrush',
		component: SyncedBrush
	},
	{
		title: 'Beeswarm',
		slug: 'Beeswarm',
		component: Beeswarm
	},
	{
		title: 'Beeswarm, force layout',
		slug: 'BeeswarmForce',
		component: BeeswarmForce
	},
	{
		title: 'Circle pack, force layout',
		slug: 'CirclePackForce',
		component: CirclePackForce
	}
];
