const __vite__fileDeps=["../nodes/0.wNXh9AEM.js","../chunks/index.CzR0xuCU.js","../chunks/control.CYgJF_JY.js","../chunks/scheduler.BuUXzzgF.js","../chunks/index.BbJvc9HH.js","../chunks/each.UhD556z0.js","../chunks/entry.CY9Abpl6.js","../chunks/index.DZaKZIS6.js","../chunks/stores.CDJb6DOX.js","../chunks/GuideContents.CxkQx-kD.js","../assets/GuideContents.B54jDh52.css","../chunks/_examples.BRAZc1Lz.js","../chunks/Brush.html.DhsUzaVt.js","../assets/Brush.BY5vnlQh.css","../chunks/dots.CDvvrV5r.js","../assets/dots.BDEFKuMM.css","../chunks/pointsFour.8Bb7SlNX.js","../assets/_examples.jrSZF9Ih.css","../chunks/_examples_ssr.Bi1G71zb.js","../chunks/ClevelandDotPlot.percent-range.html.x0oams2S.js","../assets/ClevelandDotPlot.percent-range.Cpuaqf3B.css","../assets/_examples_ssr.D_-O28Mp.css","../assets/0.F1Qo1jVP.css","../nodes/1.BB6HB8Au.js","../nodes/2.DqHreNl7.js","../chunks/hljsDefineSvelte.C5s_nVhN.js","../assets/2.Bw2SqYt1.css","../nodes/3.Bc5rMO3m.js","../chunks/_components.Z-NzieCK.js","../assets/_components.C4zKD4yS.css","../assets/3.DwpW-8lJ.css","../nodes/4.BiYxBdx-.js","../chunks/downloadBlob.BMcR_dZe.js","../assets/4.Cd9UlIMr.css","../nodes/5.DAreeBAF.js","../chunks/cleanTitle.DANG3GYN.js","../assets/cleanTitle.CD2o0Lo8.css","../assets/5.vWIPkpY5.css","../nodes/6.CCKnZu2p.js","../assets/6.C2_8DdGy.css","../nodes/7.DytvUcIs.js","../assets/7.RoHUAlT0.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as N,a as q,E as h,g as U,i as k,f as g,D as j,F,e as G,c as W,b as z,u as I,A as p,t as H,d as J,j as K,B as O,w as R,G as Q}from"../chunks/scheduler.BuUXzzgF.js";import{S as X,i as Y,a as w,e as A,t as b,g as D,c as y,b as T,m as P,d as L}from"../chunks/index.BbJvc9HH.js";const Z="modulepreload",M=function(a,e){return new URL(a,e).href},V={},d=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){const _=document.getElementsByTagName("link"),t=document.querySelector("meta[property=csp-nonce]"),r=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));s=Promise.all(n.map(o=>{if(o=M(o,i),o in V)return;V[o]=!0;const f=o.endsWith(".css"),l=f?'[rel="stylesheet"]':"";if(!!i)for(let E=_.length-1;E>=0;E--){const v=_[E];if(v.href===o&&(!f||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const u=document.createElement("link");if(u.rel=f?"stylesheet":Z,f||(u.as="script",u.crossOrigin=""),u.href=o,r&&u.setAttribute("nonce",r),document.head.appendChild(u),f)return new Promise((E,v)=>{u.addEventListener("load",E),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${o}`)))})}))}return s.then(()=>e()).catch(_=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=_,window.dispatchEvent(t),!t.defaultPrevented)throw _})},re={};function $(a){let e,n,i;var s=a[1][0];function _(t,r){return{props:{data:t[3],form:t[2]}}}return s&&(e=R(s,_(a)),a[12](e)),{c(){e&&y(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,r){e&&P(e,t,r),k(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][0])){if(e){D();const o=e;w(o.$$.fragment,1,0,()=>{L(o,1)}),A()}s?(e=R(s,_(t)),t[12](e),y(e.$$.fragment),b(e.$$.fragment,1),P(e,n.parentNode,n)):e=null}else if(s){const o={};r&8&&(o.data=t[3]),r&4&&(o.form=t[2]),e.$set(o)}},i(t){i||(e&&b(e.$$.fragment,t),i=!0)},o(t){e&&w(e.$$.fragment,t),i=!1},d(t){t&&g(n),a[12](null),e&&L(e,t)}}}function x(a){let e,n,i;var s=a[1][0];function _(t,r){return{props:{data:t[3],$$slots:{default:[ee]},$$scope:{ctx:t}}}}return s&&(e=R(s,_(a)),a[11](e)),{c(){e&&y(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,r){e&&P(e,t,r),k(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][0])){if(e){D();const o=e;w(o.$$.fragment,1,0,()=>{L(o,1)}),A()}s?(e=R(s,_(t)),t[11](e),y(e.$$.fragment),b(e.$$.fragment,1),P(e,n.parentNode,n)):e=null}else if(s){const o={};r&8&&(o.data=t[3]),r&8215&&(o.$$scope={dirty:r,ctx:t}),e.$set(o)}},i(t){i||(e&&b(e.$$.fragment,t),i=!0)},o(t){e&&w(e.$$.fragment,t),i=!1},d(t){t&&g(n),a[11](null),e&&L(e,t)}}}function ee(a){let e,n,i;var s=a[1][1];function _(t,r){return{props:{data:t[4],form:t[2]}}}return s&&(e=R(s,_(a)),a[10](e)),{c(){e&&y(e.$$.fragment),n=h()},l(t){e&&T(e.$$.fragment,t),n=h()},m(t,r){e&&P(e,t,r),k(t,n,r),i=!0},p(t,r){if(r&2&&s!==(s=t[1][1])){if(e){D();const o=e;w(o.$$.fragment,1,0,()=>{L(o,1)}),A()}s?(e=R(s,_(t)),t[10](e),y(e.$$.fragment),b(e.$$.fragment,1),P(e,n.parentNode,n)):e=null}else if(s){const o={};r&16&&(o.data=t[4]),r&4&&(o.form=t[2]),e.$set(o)}},i(t){i||(e&&b(e.$$.fragment,t),i=!0)},o(t){e&&w(e.$$.fragment,t),i=!1},d(t){t&&g(n),a[10](null),e&&L(e,t)}}}function S(a){let e,n=a[6]&&B(a);return{c(){e=G("div"),n&&n.c(),this.h()},l(i){e=W(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var s=z(e);n&&n.l(s),s.forEach(g),this.h()},h(){I(e,"id","svelte-announcer"),I(e,"aria-live","assertive"),I(e,"aria-atomic","true"),p(e,"position","absolute"),p(e,"left","0"),p(e,"top","0"),p(e,"clip","rect(0 0 0 0)"),p(e,"clip-path","inset(50%)"),p(e,"overflow","hidden"),p(e,"white-space","nowrap"),p(e,"width","1px"),p(e,"height","1px")},m(i,s){k(i,e,s),n&&n.m(e,null)},p(i,s){i[6]?n?n.p(i,s):(n=B(i),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(i){i&&g(e),n&&n.d()}}}function B(a){let e;return{c(){e=H(a[7])},l(n){e=J(n,a[7])},m(n,i){k(n,e,i)},p(n,i){i&128&&K(e,n[7])},d(n){n&&g(e)}}}function te(a){let e,n,i,s,_;const t=[x,$],r=[];function o(l,m){return l[1][1]?0:1}e=o(a),n=r[e]=t[e](a);let f=a[5]&&S(a);return{c(){n.c(),i=q(),f&&f.c(),s=h()},l(l){n.l(l),i=U(l),f&&f.l(l),s=h()},m(l,m){r[e].m(l,m),k(l,i,m),f&&f.m(l,m),k(l,s,m),_=!0},p(l,[m]){let u=e;e=o(l),e===u?r[e].p(l,m):(D(),w(r[u],1,1,()=>{r[u]=null}),A(),n=r[e],n?n.p(l,m):(n=r[e]=t[e](l),n.c()),b(n,1),n.m(i.parentNode,i)),l[5]?f?f.p(l,m):(f=S(l),f.c(),f.m(s.parentNode,s)):f&&(f.d(1),f=null)},i(l){_||(b(n),_=!0)},o(l){w(n),_=!1},d(l){l&&(g(i),g(s)),r[e].d(l),f&&f.d(l)}}}function ne(a,e,n){let{stores:i}=e,{page:s}=e,{constructors:_}=e,{components:t=[]}=e,{form:r}=e,{data_0:o=null}=e,{data_1:f=null}=e;j(i.page.notify);let l=!1,m=!1,u=null;F(()=>{const c=i.page.subscribe(()=>{l&&(n(6,m=!0),Q().then(()=>{n(7,u=document.title||"untitled page")}))});return n(5,l=!0),c});function E(c){O[c?"unshift":"push"](()=>{t[1]=c,n(0,t)})}function v(c){O[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}function C(c){O[c?"unshift":"push"](()=>{t[0]=c,n(0,t)})}return a.$$set=c=>{"stores"in c&&n(8,i=c.stores),"page"in c&&n(9,s=c.page),"constructors"in c&&n(1,_=c.constructors),"components"in c&&n(0,t=c.components),"form"in c&&n(2,r=c.form),"data_0"in c&&n(3,o=c.data_0),"data_1"in c&&n(4,f=c.data_1)},a.$$.update=()=>{a.$$.dirty&768&&i.page.set(s)},[t,_,r,o,f,l,m,u,i,s,E,v,C]}class oe extends X{constructor(e){super(),Y(this,e,ne,te,N,{stores:8,page:9,constructors:1,components:0,form:2,data_0:3,data_1:4})}}const ae=[()=>d(()=>import("../nodes/0.wNXh9AEM.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]),import.meta.url),()=>d(()=>import("../nodes/1.BB6HB8Au.js"),__vite__mapDeps([23,3,4,8,6,7,2]),import.meta.url),()=>d(()=>import("../nodes/2.DqHreNl7.js"),__vite__mapDeps([24,3,4,5,25,12,7,13,11,14,15,16,17,18,19,20,21,26]),import.meta.url),()=>d(()=>import("../nodes/3.Bc5rMO3m.js"),__vite__mapDeps([27,3,4,5,28,12,7,13,14,15,19,20,29,30]),import.meta.url),()=>d(()=>import("../nodes/4.BiYxBdx-.js"),__vite__mapDeps([31,1,2,3,4,32,12,7,5,13,25,28,14,15,19,20,29,33]),import.meta.url),()=>d(()=>import("../nodes/5.DAreeBAF.js"),__vite__mapDeps([34,1,2,3,4,32,12,7,5,13,25,35,36,11,14,15,16,17,37]),import.meta.url),()=>d(()=>import("../nodes/6.CCKnZu2p.js"),__vite__mapDeps([38,1,2,3,4,32,12,7,5,13,25,35,36,18,19,20,16,21,39]),import.meta.url),()=>d(()=>import("../nodes/7.DytvUcIs.js"),__vite__mapDeps([40,1,2,3,4,5,9,10,41]),import.meta.url)],le=[],fe={"/":[2],"/components":[3],"/components/[slug]":[4],"/example-ssr/[slug]":[6],"/example/[slug]":[5],"/guide":[7]},ce={handleError:({error:a})=>{console.error(a)},reroute:()=>{}};export{fe as dictionary,ce as hooks,re as matchers,ae as nodes,oe as root,le as server_loads};
