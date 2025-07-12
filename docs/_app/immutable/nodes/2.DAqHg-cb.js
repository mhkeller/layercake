import{t as d,h as T,b as v,s as S}from"../chunks/Bh0c0Bo_.js";import{i as q}from"../chunks/DMRkByBl.js";import{o as E,q as I,t as o,u as s,$ as U,v as V,w as a,x as t,y as w,z as X}from"../chunks/Dc8w0MKf.js";import{e as L,i as $,s as h,a as Y}from"../chunks/C6dkNy40.js";import{h as B}from"../chunks/BWkyw__h.js";import{c as C}from"../chunks/D4ufLdXk.js";import{H as k,h as H}from"../chunks/DJDSvA6t.js";import{e as M}from"../chunks/BaaacPue.js";import{e as P}from"../chunks/DOKVJsHh.js";var R=d('<meta name="og:title" content="Layer Cake"> <meta name="twitter:title" content="Layer Cake">',1),W=d('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),D=d('<div><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),F=d(`<div class="main svelte-1paa69s"><div class="logo-container svelte-1paa69s"><div id="logo" class="svelte-1paa69s"></div> <h1 class="svelte-1paa69s">Layer Cake</h1></div> <div id="dek" class="svelte-1paa69s"><p class="svelte-1paa69s">Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="svelte-1paa69s">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong svelte-1paa69s">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong svelte-1paa69s">mostly-reusable Svelte components</span>, whether they be SVG, HTML,
			Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic
			one layer at a time. It can also be used to easily create <span class="strong svelte-1paa69s">responsive graphics server-side</span> that <a href="#server-side" class="svelte-1paa69s">work without JavaScript</a>.</p> <p class="svelte-1paa69s">Unlike other libraries, <a href="/components" class="svelte-1paa69s">chart components</a> live <span class="strong svelte-1paa69s">inside your project</span>, so you have complete control for <span class="strong svelte-1paa69s">customization</span>. It also includes some handy <a href="/guide#helper-functions" class="svelte-1paa69s">helper functions</a> to help format your data into the right
			shape.</p> <p class="svelte-1paa69s">Read the <a href="guide" class="svelte-1paa69s">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer" class="svelte-1paa69s">starter template</a> or check out the <a href="components" class="svelte-1paa69s">example components</a>. See the examples below and even
			edit them live. Here's a sample of what the code looks like:</p></div> <div class="code-example svelte-1paa69s"><pre class="svelte-1paa69s"><!></pre></div> <div id="gallery"></div> <div class="section-hed svelte-1paa69s" id="server-side"><h2 class="svelte-1paa69s">Server-side rendering</h2> <p class="svelte-1paa69s">Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to
			make it even easier for charts. All of these examples below (except for their canvas
			components) will load and be responsive without client-side JavaScript. The advantage is that
			you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML
			charts use percentage-based scales and SVG charts take advantage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer" class="svelte-1paa69s">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer" class="svelte-1paa69s">this blog post</a>.</p> <p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake
			makes it easy to superimpose client-side components that will hydrate once JavaScript is
			available. See the annotated column example below.</p></div> <div id="ssr-gallery"></div></div>`);function re(A,j){E(j,!1),k.registerLanguage("svelte",H),H(k);const z=`<script>
	// The library provides a main wrapper component
	// and a bunch empty layout components...
	import { LayerCake, Svg, Html, Canvas } from 'layercake';

	// ...that you fill with your own chart components,
	// that live inside your project and which you
	// can copy and paste from here as starting points.
	import AxisX from './components/AxisX.svelte';
  import AxisY from './components/AxisY.svelte';
  import Line from './components/Line.svelte';
  import Scatter from './components/Scatter.svelte';
  import Labels from './components/Labels.svelte';

	const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }];
<\/script>

<style>
	.chart-container {
		width: 100%;
		height: 500px;
	}
</style>

<div class="chart-container">
	<LayerCake
		x='x'
		y='y'
		{data}
	>
		<Svg>
			<AxisX/>
			<AxisY/>
			<Line color='#f0c'/>
		</Svg>

		<Canvas>
			<Scatter color='#0fc'/>
		</Canvas>

		<Html>
			<Labels/>
		</Html>
	</LayerCake>
</div>`.trim().replace(/\t/g,"  ");q();var m=F();T(p=>{var e=R();U.title="Layer Cake",V(2),v(p,e)});var g=o(s(m),4),_=s(g),G=s(_);B(G,()=>k.highlight(z,{language:"svelte"}).value),a(_),a(g);var f=o(g,2);L(f,5,()=>M,$,(p,e)=>{var r=W(),i=s(r),l=s(i),n=s(l,!0);a(l);var u=o(l,2);a(i);var y=o(i,2);C(y,()=>t(e).component,(b,c)=>{c(b,{})}),a(r),w(()=>{h(l,"href",`/example/${t(e).slug??""}`),S(n,t(e).title),h(u,"href",`https://svelte.dev/repl/${t(e).replPath??""}`)}),v(p,r)}),a(f);var x=o(f,4);L(x,5,()=>P,$,(p,e)=>{var r=D();let i;var l=s(r),n=s(l),u=s(n,!0);a(n);var y=o(n,2);a(l);var b=o(l,2);C(b,()=>t(e).component,(c,J)=>{J(c,{})}),a(r),w(c=>{i=Y(r,1,"gallery-item svelte-1paa69s",null,i,c),h(n,"href",`/example-ssr/${t(e).slug??""}`),S(u,t(e).title),h(y,"href",`https://svelte.dev/repl/${t(e).replPath??""}`)},[()=>({scaled:t(e).title.toLowerCase().includes("map")})],X),v(p,r)}),a(x),a(m),v(A,m),I()}export{re as component};
