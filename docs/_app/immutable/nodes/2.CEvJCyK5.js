import{t as h,d as G,a as c,s as _}from"../chunks/zokK3d0m.js";import{i as J}from"../chunks/Cu6O_qlS.js";import{p as V,a as z,s as o,c as s,$ as E,T as I,r as a,g as t,t as x,V as U}from"../chunks/BeX3mE7-.js";import{e as S,i as w,s as v,a as X}from"../chunks/B6m2HsDd.js";import{h as Y}from"../chunks/Dswjfof8.js";import{H as y,h as L}from"../chunks/wyLrZBe2.js";import{e as q}from"../chunks/B4YTbK-a.js";import{e as B}from"../chunks/BLMeZyvb.js";var M=h('<meta name="og:title" content="Layer Cake"> <meta name="twitter:title" content="Layer Cake">',1),P=h('<div class="gallery-item svelte-1paa69s"><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),R=h('<div><h4 class="title svelte-1paa69s"><a class="svelte-1paa69s"> </a> <a class="edit-repl svelte-1paa69s" target="_blank" rel="noreferrer">Edit</a></h4> <!></div>'),W=h(`<div class="main svelte-1paa69s"><div class="logo-container svelte-1paa69s"><div id="logo" class="svelte-1paa69s"></div> <h1 class="svelte-1paa69s">Layer Cake</h1></div> <div id="dek" class="svelte-1paa69s"><p class="svelte-1paa69s">Layer Cake is a graphics framework for <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="svelte-1paa69s">Svelte</a>. It uses the measurements of your target div and your data extents to create scales that <span class="strong svelte-1paa69s">stay synced</span> on layout changes. Use these scales to organize multiple, <span class="strong svelte-1paa69s">mostly-reusable Svelte components</span>, whether they be SVG, HTML,
			Canvas or WebGL. Since they all share the same coordinate space, you can build your graphic
			one layer at a time. It can also be used to easily create <span class="strong svelte-1paa69s">responsive graphics server-side</span> that <a href="#server-side" class="svelte-1paa69s">work without JavaScript</a>.</p> <p class="svelte-1paa69s">Unlike other libraries, <a href="/components" class="svelte-1paa69s">chart components</a> live <span class="strong svelte-1paa69s">inside your project</span>, so you have complete control for <span class="strong svelte-1paa69s">customization</span>. It also includes some handy <a href="/guide#helper-functions" class="svelte-1paa69s">helper functions</a> to help format your data into the right
			shape.</p> <p class="svelte-1paa69s">Read the <a href="guide" class="svelte-1paa69s">guide</a>, try the <a href="https://github.com/mhkeller/layercake-template" target="_blank" rel="noreferrer" class="svelte-1paa69s">starter template</a> or check out the <a href="components" class="svelte-1paa69s">example components</a>. See the examples below and even
			edit them live. Here's a sample of what the code looks like:</p></div> <div class="code-example svelte-1paa69s"><pre class="svelte-1paa69s"><!></pre></div> <div id="gallery"></div> <div class="section-hed svelte-1paa69s" id="server-side"><h2 class="svelte-1paa69s">Server-side rendering</h2> <p class="svelte-1paa69s">Svelte makes it easy to render your project server side and Layer Cake has built-in helpers to
			make it even easier for charts. All of these examples below (except for their canvas
			components) will load and be responsive without client-side JavaScript. The advantage is that
			you can see the chart as soon as the page loads, avoiding blank placeholder spaces. HTML
			charts use percentage-based scales and SVG charts take advantage of certain <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox" target="_blank" rel="noreferrer" class="svelte-1paa69s">viewBox</a> and CSS settings that Rich Harris, Svelte's creator, outlined in <a href="https://dev.to/richharris/a-new-technique-for-making-responsive-javascript-free-charts-gmp" target="_blank" rel="noreferrer" class="svelte-1paa69s">this blog post</a>.</p> <p>For shapes that are difficult to render using percentages, such as swoopy arrows, Layer Cake
			makes it easy to superimpose client-side components that will hydrate once JavaScript is
			available. See the annotated column example below.</p></div> <div id="ssr-gallery"></div></div>`);function ae($,C){V(C,!1),y.registerLanguage("svelte",L),L(y);const H=`<script>
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
</div>`.trim().replace(/\t/g,"  ");J();var d=W();G(p=>{var e=M();E.title="Layer Cake",I(2),c(p,e)});var m=o(s(d),4),k=s(m),A=s(k);Y(A,()=>y.highlight(H,{language:"svelte"}).value),a(k),a(m);var g=o(m,2);S(g,5,()=>q,w,(p,e)=>{var r=P(),i=s(r),l=s(i),n=s(l,!0);a(l);var f=o(l,2);a(i);var u=o(i,2);t(e).component(u,{}),a(r),x(()=>{v(l,"href",`/example/${t(e).slug??""}`),_(n,t(e).title),v(f,"href",`https://svelte.dev/repl/${t(e).replPath??""}`)}),c(p,r)}),a(g);var b=o(g,4);S(b,5,()=>B,w,(p,e)=>{var r=R();let i;var l=s(r),n=s(l),f=s(n,!0);a(n);var u=o(n,2);a(l);var j=o(l,2);t(e).component(j,{}),a(r),x(T=>{i=X(r,1,"gallery-item svelte-1paa69s",null,i,T),v(n,"href",`/example-ssr/${t(e).slug??""}`),_(f,t(e).title),v(u,"href",`https://svelte.dev/repl/${t(e).replPath??""}`)},[()=>({scaled:t(e).title.toLowerCase().includes("map")})],U),c(p,r)}),a(b),a(d),c($,d),z()}export{ae as component};
