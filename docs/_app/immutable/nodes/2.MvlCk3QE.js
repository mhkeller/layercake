import{g as I,a as c,t as h,$ as U,f as V,b as e,c as a,i as v,s as k}from"../chunks/disclose-version.DBj9Vt0q.js";import{p as X,a as Y,z as s,r as u}from"../chunks/runtime.D9nQNyi8.js";import{e as _,i as $,s as p,t as B}from"../chunks/class.ClfF0HVi.js";import{h as M}from"../chunks/html.pu-OIvc1.js";import{c as S}from"../chunks/svelte-component.42KP6Uti.js";import{i as P}from"../chunks/lifecycle.fbi-k1SI.js";import{H as f,h as w}from"../chunks/hljsDefineSvelte.C5yA7T4x.js";import{e as R}from"../chunks/_examples.CLeW-Hl-.js";import{e as W}from"../chunks/_examples_ssr.BOXRkFVx.js";var q=h('<meta name="og:title" content="Layer Cake"> <meta name="twitter:title" content="Layer Cake">',1),D=h('<div class="gallery-item svelte-9objxt"><h4 class="title svelte-9objxt"><a class="svelte-9objxt"> </a> <a class="edit-repl svelte-9objxt" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),F=h('<div class="gallery-item svelte-9objxt"><h4 class="title svelte-9objxt"><a class="svelte-9objxt"> </a> <a class="edit-repl svelte-9objxt" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),K=h(`<div class="main svelte-9objxt"><div class="logo-container svelte-9objxt"><div id="logo" class="svelte-9objxt"></div> <h1 class="svelte-9objxt">Layer Cake</h1></div> <div id="dek" class="svelte-9objxt"><p class="svelte-9objxt">Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="svelte-9objxt">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong svelte-9objxt">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong svelte-9objxt">mostly-reusable Svelte components</span>, whether they be SVG, HTML, Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic one layer at a time. It can also be used to easily create <span class="strong svelte-9objxt">responsive graphics server-side</span> that <a href="#server-side" class="svelte-9objxt">work without JavaScript</a>.</p> <p class="svelte-9objxt">Unlike other libraries, <a href="/components" class="svelte-9objxt">chart components</a> live <span class="strong svelte-9objxt">inside your project</span>, so you have complete control for <span class="strong svelte-9objxt">customization</span>. It also includes some handy <a href="/guide#helper-functions" class="svelte-9objxt">helper functions</a> to help format your data into the right shape.</p> <p class="svelte-9objxt">Read the <a href="guide" class="svelte-9objxt">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer" class="svelte-9objxt">starter template</a> or check out the <a href="components" class="svelte-9objxt">example components</a>. See the examples below and even edit them live. Here's a sample of what the code looks like:</p></div> <div class="code-example svelte-9objxt"><pre class="svelte-9objxt"><!></pre></div> <div id="gallery"></div> <div class="section-hed svelte-9objxt" id="server-side"><h2 class="svelte-9objxt">Server-side rendering</h2> <p class="svelte-9objxt">Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to make it even easier for charts. All of these examples below (except for their canvas components) will load and be responsive without client-side JavaScript. The advantage is that you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML charts use percentage-based scales and SVG charts take advanage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer" class="svelte-9objxt">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer" class="svelte-9objxt">this blog post</a>.</p> <p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake makes it easy to superimpose client-side components that will hydrate once JavaScript is available. See the annotated column example below.</p></div> <div id="ssr-gallery"></div></div>`);function oe(L,C){X(C,!1),f.registerLanguage("svelte",w),w(f);const H=`<script>
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
</div>`.trim().replace(/\t/g,"  ");P();var x=K();I(l=>{var t=q();U.title="Layer Cake";var d=V(t),r=e(e(d,!0));c(l,t)});var A=a(x),z=e(e(A,!0)),y=e(e(z,!0)),G=a(y),J=a(G);M(J,()=>f.highlight(H,{language:"svelte"}).value);var j=e(e(y,!0));_(j,9,()=>R,$,(l,t,d)=>{var r=D(),i=a(r),o=a(i),m=a(o),b=e(e(o,!0)),n=e(e(i,!0));S(n,()=>s(t).component,g=>{g(n,{})}),u(()=>{p(o,"href",`/example/${v(s(t).slug)}`),k(m,s(t).title),p(b,"href",`https://svelte.dev/repl/${v(s(t).replPath)}`)}),c(l,r)});var T=e(e(j,!0)),E=e(e(T,!0));_(E,9,()=>W,$,(l,t,d)=>{var r=F();u(()=>B(r,"scaled",s(t).title.toLowerCase().includes("map")));var i=a(r),o=a(i),m=a(o),b=e(e(o,!0)),n=e(e(i,!0));S(n,()=>s(t).component,g=>{g(n,{})}),u(()=>{p(o,"href",`/example-ssr/${v(s(t).slug)}`),k(m,s(t).title),p(b,"href",`https://svelte.dev/repl/${v(s(t).replPath)}`)}),c(l,r)}),c(L,x),Y()}export{oe as component};
