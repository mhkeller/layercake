import{D as fs,S as ss,i as ts,s as ls,e as v,t as S,c as h,a as d,g as P,d as i,f as C,E as c,F as ns,G as as,H as ps,k as Q,l as He,j as os,n as R,m as is,b as r,I as vs,J as ae,K as Je,o as rs,L as oe,h as hs,M as ds,x as Se,u as Pe,N as Ke,v as cs,O as ms,P as gs,Q as bs,R as ks,T as Es,U as ys,V as Os}from"../chunks/vendor-e56b8d6e.js";import{r as Is}from"../chunks/singletons-12a22614.js";import{G as Ns}from"../chunks/GuideContents-9f0e5eb2.js";import{e as Qe}from"../chunks/_examples-1ee80df0.js";import{e as Re}from"../chunks/_examples_ssr-6ff6d41f.js";import"../chunks/Brush.html-631d388b.js";import"../chunks/dots-47ba7b3b.js";import"../chunks/pointsFour-f1065c0a.js";import"../chunks/ClevelandDotPlot.percent-range.html-f25e2475.js";const Cs=Is,Ss=Ps;async function Ps(s,e){return Cs.goto(s,e,[])}const Ts=()=>{const s=fs("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session}},ws={subscribe(s){return Ts().page.subscribe(s)}};function ze(s,e,l){const n=s.slice();return n[18]=e[l],n}function Be(s,e,l){const n=s.slice();return n[18]=e[l],n}function Xe(s){let e,l;return{c(){e=v("option"),l=S("Select..."),this.h()},l(n){e=h(n,"OPTION",{});var a=d(e);l=P(a,"Select..."),a.forEach(i),this.h()},h(){e.__value=s[1],e.value=e.__value,e.disabled=!0},m(n,a){C(n,e,a),c(e,l)},p(n,a){a&2&&(e.__value=n[1],e.value=e.__value)},d(n){n&&i(e)}}}function Ye(s){let e,l;return{c(){e=v("option"),l=S("Select..."),this.h()},l(n){e=h(n,"OPTION",{});var a=d(e);l=P(a,"Select..."),a.forEach(i),this.h()},h(){e.__value=s[1],e.value=e.__value,e.disabled=!0},m(n,a){C(n,e,a),c(e,l)},p(n,a){a&2&&(e.__value=n[1],e.value=e.__value)},d(n){n&&i(e)}}}function Ze(s){let e,l=s[4](s[18].title)+"",n,a;return{c(){e=v("option"),n=S(l),this.h()},l(_){e=h(_,"OPTION",{});var o=d(e);n=P(o,l),o.forEach(i),this.h()},h(){e.__value=a="/example/"+s[18].slug,e.value=e.__value},m(_,o){C(_,e,o),c(e,n)},p:ns,d(_){_&&i(e)}}}function $e(s){let e,l=s[4](s[18].title)+"",n,a;return{c(){e=v("option"),n=S(l),this.h()},l(_){e=h(_,"OPTION",{});var o=d(e);n=P(o,l),o.forEach(i),this.h()},h(){e.__value=a="/example-ssr/"+s[18].slug,e.value=e.__value},m(_,o){C(_,e,o),c(e,n)},p:ns,d(_){_&&i(e)}}}function As(s){let e,l,n,a,_,o=s[2]?"Close":"Menu",u,m,I,A,ie,B,U,J,g,re=s[1].startsWith("/components"),X,ce=s[1].startsWith("/guide"),b,he,q,L,de,j,G,me,ue,T,V,Y,w,Z,ge,$,be,_e,ke,x,W,Ee,fe,ye,ee,F,Oe,se,H,Ie,pe,D,Ne,Te,k=re&&Xe(s),E=ce&&Ye(s),te=Qe.slice().sort(xe),y=[];for(let t=0;t<te.length;t+=1)y[t]=Ze(Be(s,te,t));let le=Re.slice().sort(es),O=[];for(let t=0;t<le.length;t+=1)O[t]=$e(ze(s,le,t));function us(t){s[14](t)}let we={sections:s[0]};return s[2]!==void 0&&(we.open=s[2]),H=new Ns({props:we}),as.push(()=>ps(H,"open",us)),{c(){e=v("div"),n=Q(),a=v("div"),_=v("span"),u=S(o),I=Q(),A=v("a"),ie=S("Layer Cake"),B=Q(),U=v("ul"),J=v("li"),g=v("select"),k&&k.c(),X=He(),E&&E.c(),b=v("option"),he=S("All"),q=v("option"),L=v("option"),de=S("Client-side");for(let t=0;t<y.length;t+=1)y[t].c();j=v("option"),G=v("option"),me=S("Server-side");for(let t=0;t<O.length;t+=1)O[t].c();ue=Q(),T=v("nav"),V=v("ul"),Y=v("li"),w=v("a"),Z=v("span"),ge=S("Component gallery"),$=v("span"),be=S("Components"),ke=Q(),x=v("li"),W=v("a"),Ee=S("Guide"),ye=Q(),ee=v("li"),F=v("a"),Oe=Q(),se=v("div"),os(H.$$.fragment),this.h()},l(t){e=h(t,"DIV",{class:!0}),d(e).forEach(i),n=R(t),a=h(t,"DIV",{class:!0});var f=d(a);_=h(f,"SPAN",{class:!0});var N=d(_);u=P(N,o),N.forEach(i),I=R(f),A=h(f,"A",{href:!0,"sveltekit:prefetch":!0,class:!0});var p=d(A);ie=P(p,"Layer Cake"),p.forEach(i),f.forEach(i),B=R(t),U=h(t,"UL",{class:!0});var K=d(U);J=h(K,"LI",{class:!0});var Ae=d(J);g=h(Ae,"SELECT",{class:!0});var M=d(g);k&&k.l(M),X=He(),E&&E.l(M),b=h(M,"OPTION",{});var Le=d(b);he=P(Le,"All"),Le.forEach(i),q=h(M,"OPTION",{class:!0}),d(q).forEach(i),L=h(M,"OPTION",{class:!0});var je=d(L);de=P(je,"Client-side"),je.forEach(i);for(let z=0;z<y.length;z+=1)y[z].l(M);j=h(M,"OPTION",{class:!0}),d(j).forEach(i),G=h(M,"OPTION",{class:!0});var Ge=d(G);me=P(Ge,"Server-side"),Ge.forEach(i);for(let z=0;z<O.length;z+=1)O[z].l(M);M.forEach(i),Ae.forEach(i),K.forEach(i),ue=R(t),T=h(t,"NAV",{class:!0});var ve=d(T);V=h(ve,"UL",{class:!0});var ne=d(V);Y=h(ne,"LI",{class:!0});var Ve=d(Y);w=h(Ve,"A",{"sveltekit:prefetch":!0,class:!0,href:!0});var Ce=d(w);Z=h(Ce,"SPAN",{class:!0});var We=d(Z);ge=P(We,"Component gallery"),We.forEach(i),$=h(Ce,"SPAN",{class:!0});var De=d($);be=P(De,"Components"),De.forEach(i),Ce.forEach(i),Ve.forEach(i),ke=R(ne),x=h(ne,"LI",{class:!0});var Me=d(x);W=h(Me,"A",{"sveltekit:prefetch":!0,class:!0,href:!0});var Ue=d(W);Ee=P(Ue,"Guide"),Ue.forEach(i),Me.forEach(i),ye=R(ne),ee=h(ne,"LI",{class:!0});var qe=d(ee);F=h(qe,"A",{id:!0,target:!0,rel:!0,href:!0,class:!0});var _s=d(F);_s.forEach(i),qe.forEach(i),ne.forEach(i),Oe=R(ve),se=h(ve,"DIV",{class:!0});var Fe=d(se);is(H.$$.fragment,Fe),Fe.forEach(i),ve.forEach(i),this.h()},h(){r(e,"class",l=(s[2]?"open":"closed")+" mousecatcher svelte-6iinyn"),r(_,"class",m="menu-link "+(s[2]?"menu-open":"menu-closed")+" svelte-6iinyn"),r(A,"href","/"),r(A,"sveltekit:prefetch",""),r(A,"class","logo svelte-6iinyn"),r(a,"class","container svelte-6iinyn"),b.__value="/",b.value=b.__value,r(q,"class","header svelte-6iinyn"),q.disabled=!0,q.__value="",q.value=q.__value,r(L,"class","header svelte-6iinyn"),L.disabled=!0,L.__value="Client-side",L.value=L.__value,r(j,"class","header svelte-6iinyn"),j.disabled=!0,j.__value="",j.value=j.__value,r(G,"class","header svelte-6iinyn"),G.disabled=!0,G.__value="Server-side",G.value=G.__value,r(g,"class","svelte-6iinyn"),s[1]===void 0&&vs(()=>s[11].call(g)),r(J,"class","svelte-6iinyn"),r(U,"class","dropdown svelte-6iinyn"),r(Z,"class","wide-name svelte-6iinyn"),r($,"class","short-name svelte-6iinyn"),r(w,"sveltekit:prefetch",""),r(w,"class",_e=ae(s[1]==="/components"?"active":"")+" svelte-6iinyn"),r(w,"href","/components"),r(Y,"class","svelte-6iinyn"),r(W,"sveltekit:prefetch",""),r(W,"class",fe=ae(s[1]==="/guide"?"active":"")+" svelte-6iinyn"),r(W,"href","/guide"),r(x,"class","svelte-6iinyn"),r(F,"id","github-link"),r(F,"target","_blank"),r(F,"rel","nofollow"),r(F,"href","https://github.com/mhkeller/layercake"),r(F,"class","svelte-6iinyn"),r(ee,"class","svelte-6iinyn"),r(V,"class","primary svelte-6iinyn"),r(se,"class","secondary svelte-6iinyn"),r(T,"class",pe=ae(s[2]?"open":"closed")+" svelte-6iinyn")},m(t,f){C(t,e,f),C(t,n,f),C(t,a,f),c(a,_),c(_,u),c(a,I),c(a,A),c(A,ie),C(t,B,f),C(t,U,f),c(U,J),c(J,g),k&&k.m(g,null),c(g,X),E&&E.m(g,null),c(g,b),c(b,he),c(g,q),c(g,L),c(L,de);for(let N=0;N<y.length;N+=1)y[N].m(g,null);c(g,j),c(g,G),c(G,me);for(let N=0;N<O.length;N+=1)O[N].m(g,null);Je(g,s[1]),C(t,ue,f),C(t,T,f),c(T,V),c(V,Y),c(Y,w),c(w,Z),c(Z,ge),c(w,$),c($,be),c(V,ke),c(V,x),c(x,W),c(W,Ee),c(V,ye),c(V,ee),c(ee,F),c(T,Oe),c(T,se),rs(H,se,null),s[15](T),D=!0,Ne||(Te=[oe(e,"click",s[10]),oe(_,"click",s[6]),oe(g,"change",s[5]),oe(g,"change",s[11]),oe(w,"click",s[12]),oe(W,"click",s[13])],Ne=!0)},p(t,[f]){if((!D||f&4&&l!==(l=(t[2]?"open":"closed")+" mousecatcher svelte-6iinyn"))&&r(e,"class",l),(!D||f&4)&&o!==(o=t[2]?"Close":"Menu")&&hs(u,o),(!D||f&4&&m!==(m="menu-link "+(t[2]?"menu-open":"menu-closed")+" svelte-6iinyn"))&&r(_,"class",m),f&2&&(re=t[1].startsWith("/components")),re?k?k.p(t,f):(k=Xe(t),k.c(),k.m(g,X)):k&&(k.d(1),k=null),f&2&&(ce=t[1].startsWith("/guide")),ce?E?E.p(t,f):(E=Ye(t),E.c(),E.m(g,b)):E&&(E.d(1),E=null),f&16){te=Qe.slice().sort(xe);let p;for(p=0;p<te.length;p+=1){const K=Be(t,te,p);y[p]?y[p].p(K,f):(y[p]=Ze(K),y[p].c(),y[p].m(g,j))}for(;p<y.length;p+=1)y[p].d(1);y.length=te.length}if(f&16){le=Re.slice().sort(es);let p;for(p=0;p<le.length;p+=1){const K=ze(t,le,p);O[p]?O[p].p(K,f):(O[p]=$e(K),O[p].c(),O[p].m(g,null))}for(;p<O.length;p+=1)O[p].d(1);O.length=le.length}f&2&&Je(g,t[1]),(!D||f&2&&_e!==(_e=ae(t[1]==="/components"?"active":"")+" svelte-6iinyn"))&&r(w,"class",_e),(!D||f&2&&fe!==(fe=ae(t[1]==="/guide"?"active":"")+" svelte-6iinyn"))&&r(W,"class",fe);const N={};f&1&&(N.sections=t[0]),!Ie&&f&4&&(Ie=!0,N.open=t[2],ds(()=>Ie=!1)),H.$set(N),(!D||f&4&&pe!==(pe=ae(t[2]?"open":"closed")+" svelte-6iinyn"))&&r(T,"class",pe)},i(t){D||(Se(H.$$.fragment,t),D=!0)},o(t){Pe(H.$$.fragment,t),D=!1},d(t){t&&i(e),t&&i(n),t&&i(a),t&&i(B),t&&i(U),k&&k.d(),E&&E.d(),Ke(y,t),Ke(O,t),t&&i(ue),t&&i(T),cs(H),s[15](null),Ne=!1,ms(Te)}}}const xe=(s,e)=>s.title<e.title?-1:1,es=(s,e)=>s.title<e.title?-1:1;function Ls(s,e,l){let n,a;gs(s,ws,b=>l(9,a=b));let{sections:_}=e,o,u="",m=!1,I;const A=b=>b.split(" (")[0];function ie(){l(2,m=!1),Ss(this.value||"/")}function B(){m?setTimeout(()=>{m||l(3,I.scrollTop=0,I)},350):l(3,I.scrollTop=0,I),l(2,m=!m)}const U=()=>l(2,m=!1);function J(){u=bs(this),l(1,u),l(8,n),l(9,a),l(7,o)}const g=()=>l(2,m=!1),re=()=>l(2,m=!1);function X(b){m=b,l(2,m)}function ce(b){as[b?"unshift":"push"](()=>{I=b,l(3,I)})}return s.$$set=b=>{"sections"in b&&l(0,_=b.sections)},s.$$.update=()=>{s.$$.dirty&512&&l(8,n=a.path==="/service-worker.js"),s.$$.dirty&896&&(n||(l(7,o=a.path),o.split("/")[1],l(1,u=`/${o.replace("/","")}`),o.replace(/\/$/,"").split("/").pop()))},[_,u,m,I,A,ie,B,o,n,a,U,J,g,re,X,ce]}class js extends ss{constructor(e){super();ts(this,e,Ls,As,ls,{sections:0})}}function Gs(s){let e,l,n,a;e=new js({props:{sections:s[0]}});const _=s[2].default,o=ks(_,s,s[1],null);return{c(){os(e.$$.fragment),l=Q(),n=v("main"),o&&o.c()},l(u){is(e.$$.fragment,u),l=R(u),n=h(u,"MAIN",{});var m=d(n);o&&o.l(m),m.forEach(i)},m(u,m){rs(e,u,m),C(u,l,m),C(u,n,m),o&&o.m(n,null),a=!0},p(u,[m]){const I={};m&1&&(I.sections=u[0]),e.$set(I),o&&o.p&&(!a||m&2)&&Es(o,_,u,u[1],a?Os(_,u[1],m,null):ys(u[1]),null)},i(u){a||(Se(e.$$.fragment,u),Se(o,u),a=!0)},o(u){Pe(e.$$.fragment,u),Pe(o,u),a=!1},d(u){cs(e,u),u&&i(l),u&&i(n),o&&o.d(u)}}}async function Qs({fetch:s}){const e=await s("/api/guide-sections.json"),l=await e.json();return e.status===200?{props:{sections:l}}:{status:e.status,error:new Error(`Could not load guide sections: ${l.message}`)}}function Vs(s,e,l){let{$$slots:n={},$$scope:a}=e,{sections:_=[]}=e;return s.$$set=o=>{"sections"in o&&l(0,_=o.sections),"$$scope"in o&&l(1,a=o.$$scope)},[_,a,n]}class Rs extends ss{constructor(e){super();ts(this,e,Vs,Gs,ls,{sections:0})}}export{Rs as default,Qs as load};
