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
	{ replPath: 'ad32f9f301484d0cace82272126e9d09?version=3.46.2', title: 'Line + area', slug: 'Line', component: Line },
	{ replPath: '71cde05fa1e94583be57046207f72c02?version=3.46.2', title: 'WebGL Scatter (svg axes, quadtree hover)', slug: 'ScatterWebgl', component: ScatterWebGL },
	{ replPath: '14b8f866cc414a9ebdfbb5eaabf66ae2?version=3.46.2', title: 'Map (svg, tooltip, pre-projected)', slug: 'MapSvg', component: MapSvg },
	{ replPath: 'a8135fcccf3d42e68b1f29be00fc72c6?version=3.46.2', title: 'Multilayer map (canvas + svg)', slug: 'MapLayered', component: MapLayered },
	{ replPath: '666164c95fb9441188aab2622a4e8547?version=3.46.2', title: 'Column annotated', slug: 'Column', component: Column },
	{ replPath: 'f38656e90d0644cfb460206005c492e5?version=3.46.2', title: 'Stacked column', slug: 'ColumnStacked', component: ColumnStacked },
	{ replPath: '91fe94cac36c4829903238382563bc81?version=3.46.2', title: 'Bar', slug: 'Bar', component: Bar },
	{ replPath: '8d2e9a75cb0e4bf7abb86cb65915a93c?version=3.46.2', title: 'Stacked bar', slug: 'BarStacked', component: BarStacked },
	{ replPath: 'cc8d7b6ace40433da8d694f2877258a8?version=3.46.2', title: 'Multiline (html labels + quadtree tooltip)', slug: 'MultiLine', component: MultiLine },
	{ replPath: 'e6ae831e723646c8a01a039b3eeb33cb?version=3.46.2', title: 'Stacked area', slug: 'AreaStacked', component: AreaStacked },
	{ replPath: 'd9a9c151058d4e3eb74a4eed60eabb54?version=3.46.2', title: 'Scatter (svg + canvas + voronoi)', slug: 'Scatter', component: Scatter },
	{ replPath: 'f9f33add37d440f78b24092c7ba8154d?version=3.46.2', title: 'Cleveland dot plot', slug: 'ClevelandDotPlot', component: ClevelandDotPlot },
	{ replPath: 'fd96397862ff43e09fc8c83bfd818642?version=3.46.2', title: 'Calendar (one cake per month)', slug: 'Calendar', component: Calendar },
	{ replPath: '2c5131bd0b694d54a6211b40afbd3c09?version=3.46.2', title: 'Time of day plot', slug: 'Timeplot', component: Timeplot },
	{ replPath: '58a15bea15bd46ee8364409c15045a8b?version=3.46.2', title: 'Histogram (variable bins)', slug: 'Histogram', component: Histogram },
	{ replPath: '1c3297c4347248fc885b215f4907f8b2?version=3.46.2', title: 'Small multiples (animated domain transition)', slug: 'SmallMultiples', component: SmallMultiples },
	{ replPath: 'cb6bb95b7d1549f7be8d8fc7258ea1da?version=3.46.2', title: 'Radar chart', slug: 'Radar', component: Radar },
	{ replPath: '5d3d22482b3d400d96c88d7de7ff45b1?version=3.46.2', title: 'Circle pack', slug: 'CirclePack', component: CirclePack },
	{ replPath: '8ecba3df31e24658bf039a1a4d5daedc?version=3.46.2', title: 'Nested circle pack', slug: 'CirclePackNested', component: CirclePackNested },
	{ replPath: '0f7f35ffe2f14a25860772897f7a0b5c?version=3.46.2', title: 'Sankey', slug: 'Sankey', component: Sankey },
	{ replPath: '4e7a8affd4724d03b33493c85e50471c?version=3.46.2', title: 'Brush', slug: 'Brush', component: Brush },
	{ replPath: '0eaf387a0a564971865fb6176f959940?version=3.46.2', title: 'Synced brush', slug: 'SyncedBrush', component: SyncedBrush },
	{ replPath: '132d2c81c3f841a0be0162443b008a92?version=3.46.2', title: 'Beeswarm', slug: 'Beeswarm', component: Beeswarm },
	{ replPath: '9d0e23f494f645b4a9623c46474462f6?version=3.46.2', title: 'Beeswarm, force layout', slug: 'BeeswarmForce', component: BeeswarmForce },
	// { replPath: '', title: 'Force-directed graph', slug: 'ForceDirectedGraph', component: ForceDirectedGraph },
	{ replPath: '1879eb5e27f74784a69b65a11844f373?version=3.46.2', title: 'Circle pack, force layout', slug: 'CirclePackForce', component: CirclePackForce },
];

