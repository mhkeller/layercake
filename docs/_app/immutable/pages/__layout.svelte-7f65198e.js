import{J as ps,S as ts,i as ls,s as ns,K as as,L as vs,l as v,a as K,r as S,e as He,x as is,m as h,n as d,h as i,c as Q,u as P,y as os,p as o,M as hs,N as ie,b as I,O as r,P as Je,z as rs,Q as oe,v as ds,R as ms,f as Pe,t as Te,T as Ke,C as cs,H as gs,U as bs,F as us,V as ks,W as Es,X as ys,Y as Os,Z as Ns}from"../chunks/index-ce1a03b6.js";import{c as X}from"../chunks/singletons-eca981c1.js";import{G as Cs}from"../chunks/GuideContents-58cef88b.js";import{e as Qe}from"../chunks/_examples-c7478354.js";import{e as Re}from"../chunks/_examples_ssr-9d9bb68f.js";import"../chunks/Brush.html-7c1bd33d.js";import"../chunks/index-eae88fad.js";import"../chunks/dots-c2530e0c.js";import"../chunks/pointsFour-0a0dc1f2.js";import"../chunks/ClevelandDotPlot.percent-range.html-b12fbca6.js";X.disable_scroll_handling;const Is=X.goto;X.invalidate;X.prefetch;X.prefetch_routes;X.before_navigate;X.after_navigate;const Ss=()=>{const s=ps("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session,updated:s.updated}},Ps={subscribe(s){return Ss().page.subscribe(s)}};function Xe(s,e,l){const a=s.slice();return a[18]=e[l],a}function Ye(s,e,l){const a=s.slice();return a[18]=e[l],a}function Ze(s){let e,l;return{c(){e=v("option"),l=S("Select..."),this.h()},l(a){e=h(a,"OPTION",{});var n=d(e);l=P(n,"Select..."),n.forEach(i),this.h()},h(){e.__value=s[1],e.value=e.__value,e.disabled=!0},m(a,n){I(a,e,n),r(e,l)},p(a,n){n&2&&(e.__value=a[1],e.value=e.__value)},d(a){a&&i(e)}}}function Be(s){let e,l;return{c(){e=v("option"),l=S("Select..."),this.h()},l(a){e=h(a,"OPTION",{});var n=d(e);l=P(n,"Select..."),n.forEach(i),this.h()},h(){e.__value=s[1],e.value=e.__value,e.disabled=!0},m(a,n){I(a,e,n),r(e,l)},p(a,n){n&2&&(e.__value=a[1],e.value=e.__value)},d(a){a&&i(e)}}}function $e(s){let e,l=s[4](s[18].title)+"",a;return{c(){e=v("option"),a=S(l),this.h()},l(n){e=h(n,"OPTION",{});var f=d(e);a=P(f,l),f.forEach(i),this.h()},h(){e.__value="/example/"+s[18].slug,e.value=e.__value},m(n,f){I(n,e,f),r(e,a)},p:us,d(n){n&&i(e)}}}function xe(s){let e,l=s[4](s[18].title)+"",a;return{c(){e=v("option"),a=S(l),this.h()},l(n){e=h(n,"OPTION",{});var f=d(e);a=P(f,l),f.forEach(i),this.h()},h(){e.__value="/example-ssr/"+s[18].slug,e.value=e.__value},m(n,f){I(n,e,f),r(e,a)},p:us,d(n){n&&i(e)}}}function Ts(s){let e,l,a,n,f,u=s[2]?"Close":"Menu",c,m,N,A,re,Y,U,H,g,ce=s[1].startsWith("/components"),Z,ue=s[1].startsWith("/guide"),b,de,q,L,me,W,V,ge,_e,T,j,B,w,$,be,x,ke,fe,Ee,ee,G,ye,pe,Oe,se,z,Ne,te,F,Ce,ve,M,Ie,we,k=ce&&Ze(s),E=ue&&Be(s),le=Qe.slice().sort(es),y=[];for(let t=0;t<le.length;t+=1)y[t]=$e(Ye(s,le,t));let ne=Re.slice().sort(ss),O=[];for(let t=0;t<ne.length;t+=1)O[t]=xe(Xe(s,ne,t));function _s(t){s[14](t)}let Ae={sections:s[0]};return s[2]!==void 0&&(Ae.open=s[2]),F=new Cs({props:Ae}),as.push(()=>vs(F,"open",_s,s[2])),{c(){e=v("div"),a=K(),n=v("div"),f=v("span"),c=S(u),N=K(),A=v("a"),re=S("Layer Cake"),Y=K(),U=v("ul"),H=v("li"),g=v("select"),k&&k.c(),Z=He(),E&&E.c(),b=v("option"),de=S("All"),q=v("option"),L=v("option"),me=S("Client-side");for(let t=0;t<y.length;t+=1)y[t].c();W=v("option"),V=v("option"),ge=S("Server-side");for(let t=0;t<O.length;t+=1)O[t].c();_e=K(),T=v("nav"),j=v("ul"),B=v("li"),w=v("a"),$=v("span"),be=S("Component gallery"),x=v("span"),ke=S("Components"),Ee=K(),ee=v("li"),G=v("a"),ye=S("Guide"),Oe=K(),se=v("li"),z=v("a"),Ne=K(),te=v("div"),is(F.$$.fragment),this.h()},l(t){e=h(t,"DIV",{class:!0}),d(e).forEach(i),a=Q(t),n=h(t,"DIV",{class:!0});var _=d(n);f=h(_,"SPAN",{class:!0});var C=d(f);c=P(C,u),C.forEach(i),N=Q(_),A=h(_,"A",{href:!0,"sveltekit:prefetch":!0,class:!0});var p=d(A);re=P(p,"Layer Cake"),p.forEach(i),_.forEach(i),Y=Q(t),U=h(t,"UL",{class:!0});var J=d(U);H=h(J,"LI",{class:!0});var Le=d(H);g=h(Le,"SELECT",{class:!0});var D=d(g);k&&k.l(D),Z=He(),E&&E.l(D),b=h(D,"OPTION",{});var We=d(b);de=P(We,"All"),We.forEach(i),q=h(D,"OPTION",{class:!0}),d(q).forEach(i),L=h(D,"OPTION",{class:!0});var Ve=d(L);me=P(Ve,"Client-side"),Ve.forEach(i);for(let R=0;R<y.length;R+=1)y[R].l(D);W=h(D,"OPTION",{class:!0}),d(W).forEach(i),V=h(D,"OPTION",{class:!0});var je=d(V);ge=P(je,"Server-side"),je.forEach(i);for(let R=0;R<O.length;R+=1)O[R].l(D);D.forEach(i),Le.forEach(i),J.forEach(i),_e=Q(t),T=h(t,"NAV",{class:!0});var he=d(T);j=h(he,"UL",{class:!0});var ae=d(j);B=h(ae,"LI",{class:!0});var Ge=d(B);w=h(Ge,"A",{"sveltekit:prefetch":!0,class:!0,href:!0});var Se=d(w);$=h(Se,"SPAN",{class:!0});var Me=d($);be=P(Me,"Component gallery"),Me.forEach(i),x=h(Se,"SPAN",{class:!0});var De=d(x);ke=P(De,"Components"),De.forEach(i),Se.forEach(i),Ge.forEach(i),Ee=Q(ae),ee=h(ae,"LI",{class:!0});var Ue=d(ee);G=h(Ue,"A",{"sveltekit:prefetch":!0,class:!0,href:!0});var qe=d(G);ye=P(qe,"Guide"),qe.forEach(i),Ue.forEach(i),Oe=Q(ae),se=h(ae,"LI",{class:!0});var ze=d(se);z=h(ze,"A",{id:!0,target:!0,rel:!0,href:!0,class:!0});var fs=d(z);fs.forEach(i),ze.forEach(i),ae.forEach(i),Ne=Q(he),te=h(he,"DIV",{class:!0});var Fe=d(te);os(F.$$.fragment,Fe),Fe.forEach(i),he.forEach(i),this.h()},h(){o(e,"class",l=(s[2]?"open":"closed")+" mousecatcher svelte-6iinyn"),o(f,"class",m="menu-link "+(s[2]?"menu-open":"menu-closed")+" svelte-6iinyn"),o(A,"href","/"),o(A,"sveltekit:prefetch",""),o(A,"class","logo svelte-6iinyn"),o(n,"class","container svelte-6iinyn"),b.__value="/",b.value=b.__value,o(q,"class","header svelte-6iinyn"),q.disabled=!0,q.__value="",q.value=q.__value,o(L,"class","header svelte-6iinyn"),L.disabled=!0,L.__value="Client-side",L.value=L.__value,o(W,"class","header svelte-6iinyn"),W.disabled=!0,W.__value="",W.value=W.__value,o(V,"class","header svelte-6iinyn"),V.disabled=!0,V.__value="Server-side",V.value=V.__value,o(g,"class","svelte-6iinyn"),s[1]===void 0&&hs(()=>s[11].call(g)),o(H,"class","svelte-6iinyn"),o(U,"class","dropdown svelte-6iinyn"),o($,"class","wide-name svelte-6iinyn"),o(x,"class","short-name svelte-6iinyn"),o(w,"sveltekit:prefetch",""),o(w,"class",fe=ie(s[1]==="/components"?"active":"")+" svelte-6iinyn"),o(w,"href","/components"),o(B,"class","svelte-6iinyn"),o(G,"sveltekit:prefetch",""),o(G,"class",pe=ie(s[1]==="/guide"?"active":"")+" svelte-6iinyn"),o(G,"href","/guide"),o(ee,"class","svelte-6iinyn"),o(z,"id","github-link"),o(z,"target","_blank"),o(z,"rel","nofollow"),o(z,"href","https://github.com/mhkeller/layercake"),o(z,"class","svelte-6iinyn"),o(se,"class","svelte-6iinyn"),o(j,"class","primary svelte-6iinyn"),o(te,"class","secondary svelte-6iinyn"),o(T,"class",ve=ie(s[2]?"open":"closed")+" svelte-6iinyn")},m(t,_){I(t,e,_),I(t,a,_),I(t,n,_),r(n,f),r(f,c),r(n,N),r(n,A),r(A,re),I(t,Y,_),I(t,U,_),r(U,H),r(H,g),k&&k.m(g,null),r(g,Z),E&&E.m(g,null),r(g,b),r(b,de),r(g,q),r(g,L),r(L,me);for(let C=0;C<y.length;C+=1)y[C].m(g,null);r(g,W),r(g,V),r(V,ge);for(let C=0;C<O.length;C+=1)O[C].m(g,null);Je(g,s[1]),I(t,_e,_),I(t,T,_),r(T,j),r(j,B),r(B,w),r(w,$),r($,be),r(w,x),r(x,ke),r(j,Ee),r(j,ee),r(ee,G),r(G,ye),r(j,Oe),r(j,se),r(se,z),r(T,Ne),r(T,te),rs(F,te,null),s[15](T),M=!0,Ie||(we=[oe(e,"click",s[10]),oe(f,"click",s[6]),oe(g,"change",s[5]),oe(g,"change",s[11]),oe(w,"click",s[12]),oe(G,"click",s[13])],Ie=!0)},p(t,[_]){if((!M||_&4&&l!==(l=(t[2]?"open":"closed")+" mousecatcher svelte-6iinyn"))&&o(e,"class",l),(!M||_&4)&&u!==(u=t[2]?"Close":"Menu")&&ds(c,u),(!M||_&4&&m!==(m="menu-link "+(t[2]?"menu-open":"menu-closed")+" svelte-6iinyn"))&&o(f,"class",m),_&2&&(ce=t[1].startsWith("/components")),ce?k?k.p(t,_):(k=Ze(t),k.c(),k.m(g,Z)):k&&(k.d(1),k=null),_&2&&(ue=t[1].startsWith("/guide")),ue?E?E.p(t,_):(E=Be(t),E.c(),E.m(g,b)):E&&(E.d(1),E=null),_&16){le=Qe.slice().sort(es);let p;for(p=0;p<le.length;p+=1){const J=Ye(t,le,p);y[p]?y[p].p(J,_):(y[p]=$e(J),y[p].c(),y[p].m(g,W))}for(;p<y.length;p+=1)y[p].d(1);y.length=le.length}if(_&16){ne=Re.slice().sort(ss);let p;for(p=0;p<ne.length;p+=1){const J=Xe(t,ne,p);O[p]?O[p].p(J,_):(O[p]=xe(J),O[p].c(),O[p].m(g,null))}for(;p<O.length;p+=1)O[p].d(1);O.length=ne.length}_&2&&Je(g,t[1]),(!M||_&2&&fe!==(fe=ie(t[1]==="/components"?"active":"")+" svelte-6iinyn"))&&o(w,"class",fe),(!M||_&2&&pe!==(pe=ie(t[1]==="/guide"?"active":"")+" svelte-6iinyn"))&&o(G,"class",pe);const C={};_&1&&(C.sections=t[0]),!Ce&&_&4&&(Ce=!0,C.open=t[2],ms(()=>Ce=!1)),F.$set(C),(!M||_&4&&ve!==(ve=ie(t[2]?"open":"closed")+" svelte-6iinyn"))&&o(T,"class",ve)},i(t){M||(Pe(F.$$.fragment,t),M=!0)},o(t){Te(F.$$.fragment,t),M=!1},d(t){t&&i(e),t&&i(a),t&&i(n),t&&i(Y),t&&i(U),k&&k.d(),E&&E.d(),Ke(y,t),Ke(O,t),t&&i(_e),t&&i(T),cs(F),s[15](null),Ie=!1,gs(we)}}}const es=(s,e)=>s.title<e.title?-1:1,ss=(s,e)=>s.title<e.title?-1:1;function ws(s,e,l){let a,n;bs(s,Ps,b=>l(9,n=b));let{sections:f}=e,u,c="",m=!1,N;const A=b=>b.split(" (")[0];function re(){l(2,m=!1),Is(this.value||"/")}function Y(){m?setTimeout(()=>{m||l(3,N.scrollTop=0,N)},350):l(3,N.scrollTop=0,N),l(2,m=!m)}const U=()=>l(2,m=!1);function H(){c=ks(this),l(1,c),l(8,a),l(9,n),l(7,u)}const g=()=>l(2,m=!1),ce=()=>l(2,m=!1);function Z(b){m=b,l(2,m)}function ue(b){as[b?"unshift":"push"](()=>{N=b,l(3,N)})}return s.$$set=b=>{"sections"in b&&l(0,f=b.sections)},s.$$.update=()=>{s.$$.dirty&512&&l(8,a=n.url.pathname==="/service-worker.js"),s.$$.dirty&896&&(a||(l(7,u=n.url.pathname),u.split("/")[1],l(1,c=`/${u.replace("/","")}`),u.replace(/\/$/,"").split("/").pop()))},[f,c,m,N,A,re,Y,u,a,n,U,H,g,ce,Z,ue]}class As extends ts{constructor(e){super(),ls(this,e,ws,Ts,ns,{sections:0})}}function Ls(s){let e,l,a,n;e=new As({props:{sections:s[0]}});const f=s[2].default,u=Es(f,s,s[1],null);return{c(){is(e.$$.fragment),l=K(),a=v("main"),u&&u.c()},l(c){os(e.$$.fragment,c),l=Q(c),a=h(c,"MAIN",{});var m=d(a);u&&u.l(m),m.forEach(i)},m(c,m){rs(e,c,m),I(c,l,m),I(c,a,m),u&&u.m(a,null),n=!0},p(c,[m]){const N={};m&1&&(N.sections=c[0]),e.$set(N),u&&u.p&&(!n||m&2)&&ys(u,f,c,c[1],n?Ns(f,c[1],m,null):Os(c[1]),null)},i(c){n||(Pe(e.$$.fragment,c),Pe(u,c),n=!0)},o(c){Te(e.$$.fragment,c),Te(u,c),n=!1},d(c){cs(e,c),c&&i(l),c&&i(a),u&&u.d(c)}}}async function Js({fetch:s}){const e=await s("/api/guide-sections.json"),l=await e.json();return e.status===200?{props:{sections:l}}:{status:e.status,error:new Error(`Could not load guide sections: ${l.message}`)}}function Ws(s,e,l){let{$$slots:a={},$$scope:n}=e,{sections:f=[]}=e;return s.$$set=u=>{"sections"in u&&l(0,f=u.sections),"$$scope"in u&&l(1,n=u.$$scope)},[f,n,a]}class Ks extends ts{constructor(e){super(),ls(this,e,Ws,Ls,ns,{sections:0})}}export{Ks as default,Js as load};
