import Line from './_examples_ssr/Line.svelte';
import Scatter from './_examples_ssr/Scatter.svelte';
import MapSvg from './_examples_ssr/MapSvg.svelte';
import MapSvgPreProjected from './_examples_ssr/MapSvgPreProjected.svelte';
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
	{ replPath: 'ac23120460b1409a9e1e6fd328b63b64?version=3.46.2', title: 'Line + area', slug: 'Line', component: Line },
	{ replPath: '1969b7c74b124445ad9d55ad28542cd6?version=3.46.2', title: 'WebGL Scatter (svg axes, quadtree hover)', slug: 'ScatterWebgl', component: ScatterWebGL },
	{ replPath: 'b103883600fe49c2afeffa6ec2ed5136?version=3.46.2', title: 'Map (svg)', slug: 'MapSvg', component: MapSvg },
	{ replPath: '7f50eacbd0874cf79a88c6f1498c3017?version=3.46.2', title: 'Map, pre-projected (svg)', slug: 'MapSvgPreProjected', component: MapSvgPreProjected },
	{ replPath: '14c49b034a1e49bbbcd32e0ba749378c?version=3.46.2', title: 'Multilayer map (canvas + svg)', slug: 'MapLayered', component: MapLayered },
	{ replPath: '3dcdfc8c7aab4ca5a82f912f377a25e2?version=3.46.2', title: 'Column annotated', slug: 'Column', component: Column },
	{ replPath: '9d7b933184db447c83cc315ad278dabd?version=3.46.2', title: 'Stacked column', slug: 'ColumnStacked', component: ColumnStacked },
	{ replPath: '3e18cab5e88a4b29a14a08fdccd418c2?version=3.46.2', title: 'Bar', slug: 'Bar', component: Bar },
	{ replPath: 'af5ce39a12d74ed7a484010a49f09eaa?version=3.46.2', title: 'Stacked bar', slug: 'BarStacked', component: BarStacked },
	{ replPath: 'ea09c9f533594b3ab9ebb509c9bfc03a?version=3.46.2', title: 'Multiline (html labels + quadtree tooltip)', slug: 'MultiLine', component: MultiLine },
	{ replPath: '1eb71294f7c147ce906aa2dfc6e2f64e?version=3.46.2', title: 'Stacked area', slug: 'AreaStacked', component: AreaStacked },
	{ replPath: '9862620a31cd4f9dac8191df953e4532?version=3.46.2', title: 'Scatter (html)', slug: 'Scatter', component: Scatter },
	{ replPath: 'f3f78a8b122b40dda9ac1e32dee0737f?version=3.46.2', title: 'Cleveland dot plot', slug: 'ClevelandDotPlot', component: ClevelandDotPlot },
	{ replPath: 'c1e6634def024499ad026ecab3c39499?version=3.46.2', title: 'Calendar (one cake per month)', slug: 'Calendar', component: Calendar },
	{ replPath: '3142518ab68f493cad0e327dba5cae1a?version=3.46.2', title: 'Time of day plot', slug: 'Timeplot', component: Timeplot },
	{ replPath: '74c8fd12be824840bb78bcaa2eea33bb?version=3.46.2', title: 'Histogram (variable bins)', slug: 'Histogram', component: Histogram },
	{ replPath: '82b6e8a37e9f4eaa8140498c1b1f490d?version=3.46.2', title: 'Small multiples (animated domain transition)', slug: 'SmallMultiples', component: SmallMultiples },
	{ replPath: '7b692f97938f4bc2a79d62d5ccdbb02d?version=3.46.2', title: 'Brush', slug: 'Brush', component: Brush },
	{ replPath: '1868bf7315654558894580f43ddeace8?version=3.46.2', title: 'Synced brush', slug: 'SyncedBrush', component: SyncedBrush },
];
