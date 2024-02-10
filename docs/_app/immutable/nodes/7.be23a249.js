import"../chunks/index.8f2ca6db.js";import{s as W,p as J,f as S,a as M,K as X,g as C,d as m,c as B,h as L,r as Z,j as r,x as v,i as O,A as $,B as D,b as x,l as N,m as R,n as Q,M as ee,N as te}from"../chunks/scheduler.101db06a.js";import{S as le,i as se,f as ne,b as ae,d as ie,m as oe,a as ce,t as re,e as ue}from"../chunks/index.5bc76508.js";import{e as z}from"../chunks/each.af0871f9.js";import{G as de}from"../chunks/GuideContents.2804f685.js";async function he({fetch:a}){const t=await a("guide.json"),l=await t.json();if(t.status===200)return{sections:l}}const ke=Object.freeze(Object.defineProperty({__proto__:null,load:he},Symbol.toStringTag,{value:"Module"}));function P(a,t,l){const u=a.slice();return u[10]=t[l],u}function K(a,t,l){const u=a.slice();return u[10]=t[l],u}function V(a){let t,l,u,o=a[10].slug.replace(/^\w/,F).replaceAll("-"," ")+"",h,f;return{c(){t=S("li"),l=S("a"),u=N("- "),h=N(o),this.h()},l(s){t=C(s,"LI",{});var i=L(t);l=C(i,"A",{href:!0,class:!0});var d=L(l);u=R(d,"- "),h=R(d,o),d.forEach(m),i.forEach(m),this.h()},h(){r(l,"href",f="#"+a[10].slug),r(l,"class","svelte-1k3qqvw")},m(s,i){O(s,t,i),v(t,l),v(l,u),v(l,h)},p(s,i){i&1&&o!==(o=s[10].slug.replace(/^\w/,F).replaceAll("-"," ")+"")&&Q(h,o),i&1&&f!==(f="#"+s[10].slug)&&r(l,"href",f)},d(s){s&&m(t)}}}function Y(a){let t,l,u=a[10].metadata.title+"",o,h,f,s,i,d,q,G,A=a[10].html+"",c,E;return{c(){t=S("section"),l=S("h2"),o=N(u),h=M(),f=S("small"),s=S("a"),i=N("edit this section"),q=M(),G=new ee(!1),c=M(),this.h()},l(p){t=C(p,"SECTION",{id:!0,class:!0});var g=L(t);l=C(g,"H2",{class:!0});var I=L(l);o=R(I,u),h=B(I),f=C(I,"SMALL",{class:!0});var T=L(f);s=C(T,"A",{href:!0,target:!0,rel:!0,class:!0});var _=L(s);i=R(_,"edit this section"),_.forEach(m),T.forEach(m),I.forEach(m),q=B(g),G=te(g,!1),c=B(g),g.forEach(m),this.h()},h(){r(s,"href",d="https://github.com/mhkeller/layercake/edit/master/src/content/guide/"+a[10].file),r(s,"target","_blank"),r(s,"rel","noreferrer"),r(s,"class","svelte-1k3qqvw"),r(f,"class","svelte-1k3qqvw"),r(l,"class","svelte-1k3qqvw"),G.a=c,r(t,"id",E=a[10].slug),r(t,"class","svelte-1k3qqvw")},m(p,g){O(p,t,g),v(t,l),v(l,o),v(l,h),v(l,f),v(f,s),v(s,i),v(t,q),G.m(A,t),v(t,c)},p(p,g){g&1&&u!==(u=p[10].metadata.title+"")&&Q(o,u),g&1&&d!==(d="https://github.com/mhkeller/layercake/edit/master/src/content/guide/"+p[10].file)&&r(s,"href",d),g&1&&A!==(A=p[10].html+"")&&G.p(A),g&1&&E!==(E=p[10].slug)&&r(t,"id",E)},d(p){p&&m(t)}}}function fe(a){let t,l,u,o,h,f,s,i,d,q,G="Table of contents",A,c,E,p;function g(e){a[3](e)}let I={sections:a[0].sections};a[2]!==void 0&&(I.activeGuideSection=a[2]),h=new de({props:I}),J.push(()=>ne(h,"activeGuideSection",g));let T=z(a[0].sections),_=[];for(let e=0;e<T.length;e+=1)_[e]=V(K(a,T,e));let H=z(a[0].sections),w=[];for(let e=0;e<H.length;e+=1)w[e]=Y(P(a,H,e));return{c(){t=S("meta"),l=S("meta"),u=M(),o=S("sidebar"),ae(h.$$.fragment),s=M(),i=S("div"),d=S("section"),q=S("h3"),q.textContent=G,A=M(),c=S("ul");for(let e=0;e<_.length;e+=1)_[e].c();E=M();for(let e=0;e<w.length;e+=1)w[e].c();this.h()},l(e){const b=X("svelte-133w6f",document.head);t=C(b,"META",{name:!0,content:!0}),l=C(b,"META",{name:!0,content:!0}),b.forEach(m),u=B(e),o=C(e,"SIDEBAR",{class:!0});var k=L(o);ie(h.$$.fragment,k),k.forEach(m),s=B(e),i=C(e,"DIV",{id:!0,class:!0});var n=L(i);d=C(n,"SECTION",{id:!0,class:!0});var y=L(d);q=C(y,"H3",{class:!0,"data-svelte-h":!0}),Z(q)!=="svelte-1rm6umh"&&(q.textContent=G),A=B(y),c=C(y,"UL",{class:!0});var U=L(c);for(let j=0;j<_.length;j+=1)_[j].l(U);U.forEach(m),y.forEach(m),E=B(n);for(let j=0;j<w.length;j+=1)w[j].l(n);n.forEach(m),this.h()},h(){document.title="LayerCake - Guide",r(t,"name","og:title"),r(t,"content","Layer Cake — Guide"),r(l,"name","twitter:title"),r(l,"content","Layer Cake — Guide"),r(o,"class","svelte-1k3qqvw"),r(q,"class","svelte-1k3qqvw"),r(c,"class","svelte-1k3qqvw"),r(d,"id","toc"),r(d,"class","svelte-1k3qqvw"),r(i,"id","container"),r(i,"class","content svelte-1k3qqvw")},m(e,b){v(document.head,t),v(document.head,l),O(e,u,b),O(e,o,b),oe(h,o,null),O(e,s,b),O(e,i,b),v(i,d),v(d,q),v(d,A),v(d,c);for(let k=0;k<_.length;k+=1)_[k]&&_[k].m(c,null);v(i,E);for(let k=0;k<w.length;k+=1)w[k]&&w[k].m(i,null);a[4](i),p=!0},p(e,[b]){const k={};if(b&1&&(k.sections=e[0].sections),!f&&b&4&&(f=!0,k.activeGuideSection=e[2],$(()=>f=!1)),h.$set(k),b&1){T=z(e[0].sections);let n;for(n=0;n<T.length;n+=1){const y=K(e,T,n);_[n]?_[n].p(y,b):(_[n]=V(y),_[n].c(),_[n].m(c,null))}for(;n<_.length;n+=1)_[n].d(1);_.length=T.length}if(b&1){H=z(e[0].sections);let n;for(n=0;n<H.length;n+=1){const y=P(e,H,n);w[n]?w[n].p(y,b):(w[n]=Y(y),w[n].c(),w[n].m(i,null))}for(;n<w.length;n+=1)w[n].d(1);w.length=H.length}},i(e){p||(ce(h.$$.fragment,e),p=!0)},o(e){re(h.$$.fragment,e),p=!1},d(e){e&&(m(u),m(o),m(s),m(i)),m(t),m(l),ue(h),D(_,e),D(w,e),a[4](null)}}}const F=a=>a.toUpperCase();function _e(a,t,l){let{data:u}=t,o,h=[],f="introduction",s,i=[];x(()=>{typeof window<"u"&&(i=o.querySelectorAll("[id]"),f=window.location.hash.slice(1),l(2,s=f),d(),q(),window.addEventListener("scroll",q,!0),window.addEventListener("resize",d,!0),setTimeout(d,1e3),setTimeout(d,5e3))});function d(){if(o){const{top:c}=o.getBoundingClientRect();h=[].map.call(i,E=>E.getBoundingClientRect().top-c)}}function q(){const c=-window.scrollY;let E=i.length;for(;E--;)if(h[E]+c<100){const p=i[E],{id:g}=p;g!==f&&(l(2,s=g),f=g);return}}function G(c){s=c,l(2,s)}function A(c){J[c?"unshift":"push"](()=>{o=c,l(1,o)})}return a.$$set=c=>{"data"in c&&l(0,u=c.data)},[u,o,s,G,A]}class be extends le{constructor(t){super(),se(this,t,_e,fe,W,{data:0})}}export{be as component,ke as universal};