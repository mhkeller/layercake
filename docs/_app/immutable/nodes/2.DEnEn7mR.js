import{g as I,a as p,t as h,$ as U,f as V,b as e,c as s,i as c,s as x}from"../chunks/disclose-version.DBj9Vt0q.js";import{p as X,a as Y,z as t,r as f}from"../chunks/runtime.D9nQNyi8.js";import{e as $,i as S,s as v,t as B}from"../chunks/class.ClfF0HVi.js";import{h as M}from"../chunks/html.pu-OIvc1.js";import{c as w}from"../chunks/svelte-component.42KP6Uti.js";import{i as P}from"../chunks/lifecycle.fbi-k1SI.js";import{H as y,h as L}from"../chunks/hljsDefineSvelte.Dj5jkkhw.js";import{e as R}from"../chunks/_examples.CkiihXGr.js";import{e as W}from"../chunks/_examples_ssr.Drnvs0Xw.js";var q=h('<meta name="og:title" content="Layer Cake"> <meta name="twitter:title" content="Layer Cake">',1),D=h('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),F=h('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),K=h(`<div class="main svelte-1paa69s"><div class="logo-container svelte-1paa69s"><div id="logo" class="svelte-1paa69s"></div> <h1 class="svelte-1paa69s">Layer Cake</h1></div> <div id="dek" class="svelte-1paa69s"><p class="svelte-1paa69s">Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="svelte-1paa69s">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong svelte-1paa69s">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong svelte-1paa69s">mostly-reusable Svelte components</span>, whether they be SVG, HTML,
			Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic
			one layer at a time. It can also be used to easily create <span class="strong svelte-1paa69s">responsive graphics server-side</span> that <a href="#server-side" class="svelte-1paa69s">work without JavaScript</a>.</p> <p class="svelte-1paa69s">Unlike other libraries, <a href="/components" class="svelte-1paa69s">chart components</a> live <span class="strong svelte-1paa69s">inside your project</span>, so you have complete control for <span class="strong svelte-1paa69s">customization</span>. It also includes some handy <a href="/guide#helper-functions" class="svelte-1paa69s">helper functions</a> to help format your data into the right
			shape.</p> <p class="svelte-1paa69s">Read the <a href="guide" class="svelte-1paa69s">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer" class="svelte-1paa69s">starter template</a> or check out the <a href="components" class="svelte-1paa69s">example components</a>. See the examples below and even
			edit them live. Here's a sample of what the code looks like:</p></div> <div class="code-example svelte-1paa69s"><pre class="svelte-1paa69s"><!></pre></div> <div id="gallery"></div> <div class="section-hed svelte-1paa69s" id="server-side"><h2 class="svelte-1paa69s">Server-side rendering</h2> <p class="svelte-1paa69s">Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to
			make it even easier for charts. All of these examples below (except for their canvas
			components) will load and be responsive without client-side JavaScript. The advantage is that
			you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML
			charts use percentage-based scales and SVG charts take advanage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer" class="svelte-1paa69s">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer" class="svelte-1paa69s">this blog post</a>.</p> <p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake
			makes it easy to superimpose client-side components that will hydrate once JavaScript is
			available. See the annotated column example below.</p></div> <div id="ssr-gallery"></div></div>`);function le(C,H){X(H,!1),y.registerLanguage("svelte",L),L(y);const A=`<script>
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
</div>`.trim().replace(/\t/g,"  ");P();var b=K();I(o=>{var a=q();U.title="Layer Cake";var d=V(a),r=e(e(d,!0));p(o,a)});var j=s(b),z=e(e(j,!0)),k=e(e(z,!0)),G=s(k),J=s(G);M(J,()=>y.highlight(A,{language:"svelte"}).value);var _=e(e(k,!0));$(_,9,()=>R,S,(o,a,d)=>{var r=D(),i=s(r),l=s(i),m=s(l),g=e(e(l,!0)),n=e(e(i,!0));w(n,()=>t(a).component,u=>{u(n,{})}),f(()=>{v(l,"href",`/example/${c(t(a).slug)}`),x(m,t(a).title),v(g,"href",`https://svelte.dev/repl/${c(t(a).replPath)}`)}),p(o,r)});var T=e(e(_,!0)),E=e(e(T,!0));$(E,9,()=>W,S,(o,a,d)=>{var r=F();f(()=>B(r,"scaled",t(a).title.toLowerCase().includes("map")));var i=s(r),l=s(i),m=s(l),g=e(e(l,!0)),n=e(e(i,!0));w(n,()=>t(a).component,u=>{u(n,{})}),f(()=>{v(l,"href",`/example-ssr/${c(t(a).slug)}`),x(m,t(a).title),v(g,"href",`https://svelte.dev/repl/${c(t(a).replPath)}`)}),p(o,r)}),p(C,b),Y()}export{le as component};
