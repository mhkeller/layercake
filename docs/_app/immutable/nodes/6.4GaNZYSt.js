import{e as ae}from"../chunks/index.CzR0xuCU.js";import{h as oe,e as J,a as b,t as C,s as K}from"../chunks/disclose-version.CmtI0EPl.js";import{p as se,P as _,Q as g,R as re,t as h,a as ne,$ as le,w as e,c as n,s as v,r,v as p,K as T,N}from"../chunks/runtime.B3Do0ZXm.js";import{i as ie}from"../chunks/if.DMXaGV_-.js";import{e as Q,i as R,s as q,a as A}from"../chunks/class.B1rLQBbq.js";import{h as F}from"../chunks/html.DHUwS5Lv.js";import{c as ce}from"../chunks/svelte-component.DC_MlXxY.js";import{i as de}from"../chunks/lifecycle.B5gl02A_.js";import{p as ve}from"../chunks/index-client.CfugqxwE.js";import{M as pe}from"../chunks/downloadBlob.DPn4pLDi.js";import{H as E,h as G}from"../chunks/hljsDefineSvelte.DvPdTMHb.js";import{D as me,c as k}from"../chunks/cleanTitle.BHIW8-x7.js";import{e as ue}from"../chunks/_examples_ssr.BkbL8euZ.js";async function fe({fetch:z,params:m}){const i=`${m.slug}.json`,l=await z(i),x=await l.json();if(l.status===200)return{slug:m.slug,content:x,active:"+page"};ae(500,`Could not load ${i}: ${x.message}`)}const qe=Object.freeze(Object.defineProperty({__proto__:null,load:fe},Symbol.toStringTag,{value:"Module"}));var _e=C('<div class="dek svelte-78pozx"><!></div>'),ge=C("<li> </li>"),he=C('<div class="contents"><pre class="svelte-78pozx"><!></pre></div>'),xe=C('<div class="main svelte-78pozx" data-label="Server-side"><h1> <a class="edit-repl svelte-78pozx" target="_blank" rel="noreferrer">Edit</a></h1> <div class="chart-hero svelte-78pozx"><!></div> <div class="download svelte-78pozx"><!></div> <!> <div id="pages"><ul id="page-nav" class="svelte-78pozx"></ul> <div id="contents-container" class="svelte-78pozx"><div class="copy svelte-78pozx"></div> <!></div></div></div>');function Ee(z,m){se(m,!1);const i=_(),l=_();E.registerLanguage("svelte",G),G(E);const x=new pe({html:!0,linkify:!0});let c=ve(m,"data",8),$=c(),u=_($.slug),s=_($.content),f=_($.active);function U(a){return x.render(a)}function V(a,t){const o=t.split(".");let d=o[o.length-1];return d==="csv"&&(d="diff"),E.highlight(a,{language:d}).value}const H=new Map;ue.forEach(a=>{H.set(a.slug.toLowerCase(),a)});function W(){const a=e(i).filter(t=>k(t.title)===e(f))[0].contents;if(window.clipboardData&&window.clipboardData.setData)return window.clipboardData.setData("Text",a);if(document.queryCommandSupported&&document.queryCommandSupported("copy")){const t=document.createElement("textarea");t.textContent=a,t.style.position="fixed",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}catch(o){return console.warn("Copy to clipboard failed.",o),!1}finally{document.body.removeChild(t)}}}g(()=>T(c()),()=>{p(u,c().slug)}),g(()=>T(c()),()=>{p(s,c().content)}),g(()=>T(c()),()=>{p(f,c().active)}),g(()=>e(s),()=>{p(i,[e(s).main].concat(e(s).components).concat(e(s).componentModules).concat(e(s).modules).concat(e(s).componentComponents).concat(e(s).jsons).concat(e(s).csvs))}),g(()=>e(u),()=>{p(l,H.get(e(u).toLowerCase()))}),re(),de();var D=xe();oe(a=>{h(()=>le.title=e(l).title)});var S=n(D),P=n(S),X=v(P);r(S);var y=v(S,2);h(()=>q(y,"data-slug",e(u).toLowerCase()));var Y=n(y);ce(Y,()=>e(l).component,(a,t)=>{t(a,{})}),r(y);var j=v(y,2),Z=n(j);me(Z,{get data(){return e(s)},get slug(){return e(u)},ssr:!0}),r(j);var O=v(j,2);ie(O,()=>e(s).dek,a=>{var t=_e(),o=n(t);F(o,()=>U(e(s).dek)),r(t),b(a,t)});var L=v(O,2),M=n(L);Q(M,5,()=>e(i),R,(a,t)=>{var o=ge();const d=N(()=>`tab ${(e(f)===k(e(t).title)?"active":"")??""} svelte-78pozx`);var w=n(o);r(o),h(()=>{A(o,e(d)),K(w,e(t).title)}),J("click",o,()=>p(f,k(e(t).title))),b(a,o)}),r(M);var B=v(M,2),I=n(B),ee=v(I,2);Q(ee,1,()=>e(i),R,(a,t)=>{var o=he();const d=N(()=>`display: ${(e(f)===k(e(t).title)?"block":"none")??""};`);var w=n(o),te=n(w);F(te,()=>V(e(t).contents,e(t).title)),r(w),r(o),h(()=>q(o,"style",e(d))),b(a,o)}),r(B),r(L),r(D),h(()=>{K(P,e(l).title),q(X,"href",`https://svelte.dev/repl/${e(l).replPath??""}`),A(L,`${(e(s).dek?"has-dek":"")??""} svelte-78pozx`)}),J("click",I,W),b(z,D),ne()}export{Ee as component,qe as universal};
