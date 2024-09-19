import{h as z,a as c,t as h,s as w}from"../chunks/disclose-version.DNYiTfVC.js";import{p as E,a as I,$ as M,L as U,s as o,c as t,r as a,w as s,t as b,M as V}from"../chunks/runtime.B7mK2QHg.js";import{e as L,i as $,s as v,t as X}from"../chunks/class.w-fjc9ue.js";import{h as Y}from"../chunks/html.BoZhowlm.js";import{c as C}from"../chunks/svelte-component.Cg80y6Fz.js";import{i as q}from"../chunks/lifecycle.VwM39mxy.js";import{H as _,h as H}from"../chunks/hljsDefineSvelte.DGdUdlmg.js";import{e as B}from"../chunks/_examples.iN1Wf0lE.js";import{e as P}from"../chunks/_examples_ssr.CLv-pAZU.js";var R=h('<meta name="og:title" content="Layer Cake"> <meta name="twitter:title" content="Layer Cake">',1),W=h('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),D=h('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),F=h(`<div class="main svelte-1paa69s"><div class="logo-container svelte-1paa69s"><div id="logo" class="svelte-1paa69s"></div> <h1 class="svelte-1paa69s">Layer Cake</h1></div> <div id="dek" class="svelte-1paa69s"><p class="svelte-1paa69s">Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="svelte-1paa69s">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong svelte-1paa69s">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong svelte-1paa69s">mostly-reusable Svelte components</span>, whether they be SVG, HTML,
			Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic
			one layer at a time. It can also be used to easily create <span class="strong svelte-1paa69s">responsive graphics server-side</span> that <a href="#server-side" class="svelte-1paa69s">work without JavaScript</a>.</p> <p class="svelte-1paa69s">Unlike other libraries, <a href="/components" class="svelte-1paa69s">chart components</a> live <span class="strong svelte-1paa69s">inside your project</span>, so you have complete control for <span class="strong svelte-1paa69s">customization</span>. It also includes some handy <a href="/guide#helper-functions" class="svelte-1paa69s">helper functions</a> to help format your data into the right
			shape.</p> <p class="svelte-1paa69s">Read the <a href="guide" class="svelte-1paa69s">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer" class="svelte-1paa69s">starter template</a> or check out the <a href="components" class="svelte-1paa69s">example components</a>. See the examples below and even
			edit them live. Here's a sample of what the code looks like:</p></div> <div class="code-example svelte-1paa69s"><pre class="svelte-1paa69s"><!></pre></div> <div id="gallery"></div> <div class="section-hed svelte-1paa69s" id="server-side"><h2 class="svelte-1paa69s">Server-side rendering</h2> <p class="svelte-1paa69s">Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to
			make it even easier for charts. All of these examples below (except for their canvas
			components) will load and be responsive without client-side JavaScript. The advantage is that
			you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML
			charts use percentage-based scales and SVG charts take advanage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer" class="svelte-1paa69s">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer" class="svelte-1paa69s">this blog post</a>.</p> <p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake
			makes it easy to superimpose client-side components that will hydrate once JavaScript is
			available. See the annotated column example below.</p></div> <div id="ssr-gallery"></div></div>`);function re(A,j){E(j,!1),_.registerLanguage("svelte",H),H(_);const G=`<script>
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
</div>`.trim().replace(/\t/g,"  ");q();var d=F();z(n=>{var e=R();M.title="Layer Cake",U(2),c(n,e)});var m=o(t(d),4),x=t(m),J=t(x);Y(J,()=>_.highlight(G,{language:"svelte"}).value),a(x),a(m);var g=o(m,2);L(g,5,()=>B,$,(n,e)=>{var r=W(),p=t(r),l=t(p),i=t(l);a(l);var f=o(l,2);a(p);var u=o(p,2);C(u,()=>s(e).component,(y,k)=>{k(y,{})}),a(r),b(()=>{v(l,"href",`/example/${s(e).slug??""}`),w(i,s(e).title),v(f,"href",`https://svelte.dev/repl/${s(e).replPath??""}`)}),c(n,r)}),a(g);var S=o(g,4);L(S,5,()=>P,$,(n,e)=>{var r=D();const p=V(()=>s(e).title.toLowerCase().includes("map"));b(()=>X(r,"scaled",s(p)));var l=t(r),i=t(l),f=t(i);a(i);var u=o(i,2);a(l);var y=o(l,2);C(y,()=>s(e).component,(k,T)=>{T(k,{})}),a(r),b(()=>{v(i,"href",`/example-ssr/${s(e).slug??""}`),w(f,s(e).title),v(u,"href",`https://svelte.dev/repl/${s(e).replPath??""}`)}),c(n,r)}),a(S),a(d),c(A,d),I()}export{re as component};
