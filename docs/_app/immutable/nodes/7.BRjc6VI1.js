import{e as R}from"../chunks/DNSHY1Ls.js";import{h as T,b as h,t as g,s as S}from"../chunks/CS1UFJiM.js";import{i as U}from"../chunks/CO3l9hkp.js";import{o as I,Q,L as Y,q as D,x as s,P as _,$ as F,t as H,M as j,v as o,w as r,u,y as z,z as J}from"../chunks/DGgq1KgZ.js";import{e as A,i as B,a as C}from"../chunks/C5AaCsac.js";import{h as K}from"../chunks/vRk5fI8W.js";import{p as N,b as V}from"../chunks/-JVGrOUV.js";import{G as W}from"../chunks/TpGuX20Q.js";async function X({fetch:w}){const l=await w("guide.json"),c=await l.json();if(l.status===200)return{sections:c};R(500,"Could not load.")}const ue=Object.freeze(Object.defineProperty({__proto__:null,load:X},Symbol.toStringTag,{value:"Module"}));var Z=g('<meta name="og:title" content="Layer Cake — Guide"> <meta name="twitter:title" content="Layer Cake — Guide">',1),ee=g('<li class="svelte-7qt7ip"><a class="svelte-7qt7ip"> </a></li>'),te=g('<section class="svelte-7qt7ip"><h2 class="svelte-7qt7ip"> <small class="svelte-7qt7ip"><a target="_blank" rel="noreferrer">edit this section</a></small></h2> <!></section>'),ae=g('<sidebar class="svelte-7qt7ip"><!></sidebar> <div id="container" class="content svelte-7qt7ip"><section id="toc" class="svelte-7qt7ip"><h3 class="svelte-7qt7ip">Table of contents</h3> <ul class="svelte-7qt7ip"></ul></section> <!></div>',1);function pe(w,l){I(l,!1);let c=N(l,"data",8),d=j(),G=[],p="introduction",v=j(),m=[];Q(()=>{typeof window<"u"&&(m=s(d).querySelectorAll("[id]"),p=window.location.hash.slice(1),_(v,p),x(),$(),window.addEventListener("scroll",$,!0),window.addEventListener("resize",x,!0))});function x(){if(s(d)){const{top:t}=s(d).getBoundingClientRect();G=[].map.call(m,e=>e.getBoundingClientRect().top-t)}}function $(){const t=-window.scrollY;let e=m.length;for(;e--;)if(G[e]+t<100){const i=m[e],{id:a}=i;a!==p&&(_(v,a),p=a);return}}U();var k=ae();T(t=>{var e=Z();F.title="LayerCake - Guide",H(2),h(t,e)});var b=Y(k),E=o(b);W(E,{get sections(){return c().sections},get activeGuideSection(){return s(v)},set activeGuideSection(t){_(v,t)},$$legacy:!0}),r(b);var q=u(b,2),y=o(q),L=u(o(y),2);A(L,5,()=>c().sections,B,(t,e)=>{var i=ee(),a=o(i),f=o(a);r(a),r(i),z(n=>{C(a,"href",`#${s(e).slug??""}`),S(f,`- ${n??""}`)},[()=>s(e).slug.replace(/^\w/,n=>n.toUpperCase()).replaceAll("-"," ")],J),h(t,i)}),r(L),r(y);var M=u(y,2);A(M,1,()=>c().sections,B,(t,e)=>{var i=te(),a=o(i),f=o(a),n=u(f),O=o(n);r(n),r(a);var P=u(a,2);K(P,()=>s(e).html),r(i),z(()=>{C(i,"id",s(e).slug),S(f,`${s(e).metadata.title??""} `),C(O,"href",`https://github.com/mhkeller/layercake/edit/master/src/content/guide/${s(e).file??""}`)}),h(t,i)}),r(q),V(q,t=>_(d,t),()=>s(d)),h(w,k),D()}export{pe as component,ue as universal};
