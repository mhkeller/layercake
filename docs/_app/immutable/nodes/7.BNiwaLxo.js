import{e as R}from"../chunks/DNSHY1Ls.js";import{h as T,b as h,t as _,s as j}from"../chunks/BBz-090T.js";import{z as U,Q as D,L as F,A as I,w as s,P as g,$ as Q,B as Y,M as z,D as o,F as r,C as d,G as C}from"../chunks/Cxro91qv.js";import{e as A,i as B,s as G}from"../chunks/LAHbaaU8.js";import{h as H}from"../chunks/CmxJZDHG.js";import{p as J,b as K}from"../chunks/IEQ67wLA.js";import{i as N}from"../chunks/BZkFnTQF.js";import{G as V}from"../chunks/BKCPmdBs.js";async function W({fetch:w}){const n=await w("guide.json"),l=await n.json();if(n.status===200)return{sections:l};R(500,"Could not load.")}const de=Object.freeze(Object.defineProperty({__proto__:null,load:W},Symbol.toStringTag,{value:"Module"}));var X=_('<meta name="og:title" content="Layer Cake — Guide"> <meta name="twitter:title" content="Layer Cake — Guide">',1),Z=_('<li class="svelte-7qt7ip"><a class="svelte-7qt7ip"> </a></li>'),ee=_('<section class="svelte-7qt7ip"><h2 class="svelte-7qt7ip"> <small class="svelte-7qt7ip"><a target="_blank" rel="noreferrer">edit this section</a></small></h2> <!></section>'),te=_('<sidebar class="svelte-7qt7ip"><!></sidebar> <div id="container" class="content svelte-7qt7ip"><section id="toc" class="svelte-7qt7ip"><h3 class="svelte-7qt7ip">Table of contents</h3> <ul class="svelte-7qt7ip"></ul></section> <!></div>',1);function pe(w,n){U(n,!1);let l=J(n,"data",8),c=z(),$=[],p="introduction",u=z(),v=[];D(()=>{typeof window<"u"&&(v=s(c).querySelectorAll("[id]"),p=window.location.hash.slice(1),g(u,p),k(),x(),window.addEventListener("scroll",x,!0),window.addEventListener("resize",k,!0))});function k(){if(s(c)){const{top:t}=s(c).getBoundingClientRect();$=[].map.call(v,e=>e.getBoundingClientRect().top-t)}}function x(){const t=-window.scrollY;let e=v.length;for(;(e-=1)+1;)if($[e]+t<100){const i=v[e],{id:a}=i;a!==p&&(g(u,a),p=a);return}}N();var L=te();T(t=>{var e=X();Q.title="LayerCake - Guide",Y(2),h(t,e)});var b=F(L),E=o(b);V(E,{get sections(){return l().sections},get activeGuideSection(){return s(u)},set activeGuideSection(t){g(u,t)},$$legacy:!0}),r(b);var q=d(b,2);K(q,t=>g(c,t),()=>s(c));var y=o(q),S=d(o(y),2);A(S,5,()=>l().sections,B,(t,e)=>{var i=Z(),a=o(i),m=o(a);C(()=>j(m,`- ${s(e).slug.replace(/^\w/,f=>f.toUpperCase()).replaceAll("-"," ")??""}`)),r(a),r(i),C(()=>G(a,"href",`#${s(e).slug??""}`)),h(t,i)}),r(S),r(y);var M=d(y,2);A(M,1,()=>l().sections,B,(t,e)=>{var i=ee(),a=o(i),m=o(a),f=d(m),O=o(f);r(f),r(a);var P=d(a,2);H(P,()=>s(e).html),r(i),C(()=>{G(i,"id",s(e).slug),j(m,`${s(e).metadata.title??""} `),G(O,"href",`https://github.com/mhkeller/layercake/edit/master/src/content/guide/${s(e).file??""}`)}),h(t,i)}),r(q),h(w,L),I()}export{pe as component,de as universal};
