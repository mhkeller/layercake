import Line from './_examples_ssr/Line.svelte';
import Scatter from './_examples_ssr/Scatter.svelte';
import MapSvg from './_examples_ssr/MapSvg.svelte';
import Column from './_examples_ssr/Column.svelte';
import AreaStacked from './_examples_ssr/AreaStacked.svelte';
import ColumnStacked from './_examples_ssr/ColumnStacked.svelte';
import MultiLine from './_examples_ssr/MultiLine.svelte';
import MapLayered from './_examples_ssr/MapLayered.svelte';
import Bar from './_examples_ssr/Bar.svelte';
import BarStacked from './_examples_ssr/BarStacked.svelte';
import ScatterWebGL from './_examples_ssr/ScatterWebgl.svelte';
import ClevelandDotPlot from './_examples_ssr/ClevelandDotPlot.svelte';
import Histogram from './_examples_ssr/Histogram.svelte';
import SmallMultiples from './_examples_ssr/SmallMultiples.svelte';
import Calendar from './_examples_ssr/Calendar.svelte';
import Timeplot from './_examples_ssr/Timeplot.svelte';
import Brush from './_examples_ssr/Brush.svelte';
import SyncedBrush from './_examples_ssr/SyncedBrush.svelte';

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
		title: 'Map (svg, pre-projected)',
		slug: 'MapSvg',
		component: MapSvg
	},
	// {
	// 	title: 'Multilayer map (canvas + svg)',
	// 	slug: 'MapLayered',
	// 	component: MapLayered
	// },
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
		title: 'Scatter (html)',
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
		title: 'Brush',
		slug: 'Brush',
		component: Brush
	}
	// {
	// 	title: 'Synced brush',
	// 	slug: 'SyncedBrush',
	// 	component: SyncedBrush
	// }
];
