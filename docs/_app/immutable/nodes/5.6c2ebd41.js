import{e as Ce}from"../chunks/index.93323930.js";import{s as Ie,q as he,a as q,f as D,l as oe,K as Me,d as p,c as P,g as C,h as I,m as re,j as d,w as _e,i as U,x as m,z as W,n as Ee,B as me,C as De,k as pe}from"../chunks/scheduler.101db06a.js";import{S as Te,i as He,b as x,d as ge,m as ee,t as te,c as Le,a as le,e as se,g as Se}from"../chunks/index.5bc76508.js";import{M as Ve,g as $e}from"../chunks/downloadBlob.0be372d9.js";import{e as Q}from"../chunks/each.af0871f9.js";import{H as ne,h as ve}from"../chunks/hljsDefineSvelte.348e44ec.js";import{D as qe,c as O}from"../chunks/cleanTitle.a5291177.js";import{e as Pe}from"../chunks/_examples.d2017060.js";async function ze({fetch:e,params:s}){const n=`${s.slug}.json`,l=await e(n),o=await l.json();if(l.status===200)return{slug:s.slug,content:o,active:"+page"};throw Ce(500,`Could not load ${n}: ${o.message}`)}const Qe=Object.freeze(Object.defineProperty({__proto__:null,load:ze},Symbol.toStringTag,{value:"Module"}));const{document:ae}=$e;function ke(e,s,n){const l=e.slice();return l[13]=s[n],l}function be(e,s,n){const l=e.slice();return l[13]=s[n],l}function we(e){let s,n=e[5](e[1].dek)+"";return{c(){s=D("div"),this.h()},l(l){s=C(l,"DIV",{class:!0});var o=I(s);o.forEach(p),this.h()},h(){d(s,"class","dek svelte-gjdfxl")},m(l,o){U(l,s,o),s.innerHTML=n},p(l,o){o&2&&n!==(n=l[5](l[1].dek)+"")&&(s.innerHTML=n)},d(l){l&&p(s)}}}function ye(e){let s,n=e[13].title+"",l,o,i,c;function h(){return e[9](e[13])}function k(){return e[10](e[13])}return{c(){s=D("li"),l=oe(n),this.h()},l(_){s=C(_,"LI",{class:!0});var E=I(s);l=re(E,n),E.forEach(p),this.h()},h(){d(s,"class",o="tab "+(e[2]===O(e[13].title)?"active":"")+" svelte-gjdfxl")},m(_,E){U(_,s,E),m(s,l),i||(c=[W(s,"click",h),W(s,"keypress",k)],i=!0)},p(_,E){e=_,E&8&&n!==(n=e[13].title+"")&&Ee(l,n),E&12&&o!==(o="tab "+(e[2]===O(e[13].title)?"active":"")+" svelte-gjdfxl")&&d(s,"class",o)},d(_){_&&p(s),i=!1,De(c)}}}function je(e){let s,n,l=e[6](e[13].contents,e[13].title)+"",o;return{c(){s=D("div"),n=D("pre"),o=q(),this.h()},l(i){s=C(i,"DIV",{class:!0,style:!0});var c=I(s);n=C(c,"PRE",{class:!0});var h=I(n);h.forEach(p),o=P(c),c.forEach(p),this.h()},h(){d(n,"class","svelte-gjdfxl"),d(s,"class","contents"),pe(s,"display",e[2]===O(e[13].title)?"block":"none")},m(i,c){U(i,s,c),m(s,n),n.innerHTML=l,m(s,o)},p(i,c){c&8&&l!==(l=i[6](i[13].contents,i[13].title)+"")&&(n.innerHTML=l),c&12&&pe(s,"display",i[2]===O(i[13].title)?"block":"none")},d(i){i&&p(s)}}}function Be(e){let s,n,l,o,i=e[4].title+"",c,h,k,_,E,L,f,R,S,T,u,j,y,M,X,H,z,Y,F,V,Z,ie;ae.title=s=e[4].title;var A=e[4].component;function ce(t){return{}}A&&(f=he(A,ce())),T=new qe({props:{data:e[1],slug:e[0]}});let b=e[1].dek&&we(e),J=Q(e[3]),g=[];for(let t=0;t<J.length;t+=1)g[t]=ye(be(e,J,t));let K=Q(e[3]),v=[];for(let t=0;t<K.length;t+=1)v[t]=je(ke(e,K,t));return{c(){n=q(),l=D("div"),o=D("h1"),c=oe(i),h=D("a"),k=oe("Edit"),E=q(),L=D("div"),f&&x(f.$$.fragment),R=q(),S=D("div"),x(T.$$.fragment),u=q(),b&&b.c(),j=q(),y=D("div"),M=D("ul");for(let t=0;t<g.length;t+=1)g[t].c();X=q(),H=D("div"),z=D("div"),Y=q();for(let t=0;t<v.length;t+=1)v[t].c();this.h()},l(t){Me("svelte-1ynzqk4",ae.head).forEach(p),n=P(t),l=C(t,"DIV",{class:!0});var r=I(l);o=C(r,"H1",{});var a=I(o);c=re(a,i),h=C(a,"A",{class:!0,href:!0,target:!0,rel:!0});var $=I(h);k=re($,"Edit"),$.forEach(p),a.forEach(p),E=P(r),L=C(r,"DIV",{class:!0});var fe=I(L);f&&ge(f.$$.fragment,fe),fe.forEach(p),R=P(r),S=C(r,"DIV",{class:!0});var de=I(S);ge(T.$$.fragment,de),de.forEach(p),u=P(r),b&&b.l(r),j=P(r),y=C(r,"DIV",{id:!0,class:!0});var G=I(y);M=C(G,"UL",{id:!0,class:!0});var ue=I(M);for(let B=0;B<g.length;B+=1)g[B].l(ue);ue.forEach(p),X=P(G),H=C(G,"DIV",{id:!0,class:!0});var N=I(H);z=C(N,"DIV",{class:!0}),I(z).forEach(p),Y=P(N);for(let B=0;B<v.length;B+=1)v[B].l(N);N.forEach(p),G.forEach(p),r.forEach(p),this.h()},h(){d(h,"class","edit-repl svelte-gjdfxl"),d(h,"href",_="https://svelte.dev/repl/"+e[4].replPath),d(h,"target","_blank"),d(h,"rel","noreferrer"),d(L,"class","chart-hero svelte-gjdfxl"),d(S,"class","download svelte-gjdfxl"),d(M,"id","page-nav"),d(M,"class","svelte-gjdfxl"),d(z,"class","copy svelte-gjdfxl"),d(H,"id","contents-container"),d(H,"class","svelte-gjdfxl"),d(y,"id","pages"),d(y,"class",F=_e(e[1].dek?"has-dek":"")+" svelte-gjdfxl"),d(l,"class","main svelte-gjdfxl")},m(t,w){U(t,n,w),U(t,l,w),m(l,o),m(o,c),m(o,h),m(h,k),m(l,E),m(l,L),f&&ee(f,L,null),m(l,R),m(l,S),ee(T,S,null),m(l,u),b&&b.m(l,null),m(l,j),m(l,y),m(y,M);for(let r=0;r<g.length;r+=1)g[r]&&g[r].m(M,null);m(y,X),m(y,H),m(H,z),m(H,Y);for(let r=0;r<v.length;r+=1)v[r]&&v[r].m(H,null);V=!0,Z||(ie=[W(z,"click",e[7]),W(z,"keypress",e[7])],Z=!0)},p(t,[w]){if((!V||w&16)&&s!==(s=t[4].title)&&(ae.title=s),(!V||w&16)&&i!==(i=t[4].title+"")&&Ee(c,i),(!V||w&16&&_!==(_="https://svelte.dev/repl/"+t[4].replPath))&&d(h,"href",_),w&16&&A!==(A=t[4].component)){if(f){Se();const a=f;te(a.$$.fragment,1,0,()=>{se(a,1)}),Le()}A?(f=he(A,ce()),x(f.$$.fragment),le(f.$$.fragment,1),ee(f,L,null)):f=null}const r={};if(w&2&&(r.data=t[1]),w&1&&(r.slug=t[0]),T.$set(r),t[1].dek?b?b.p(t,w):(b=we(t),b.c(),b.m(l,j)):b&&(b.d(1),b=null),w&12){J=Q(t[3]);let a;for(a=0;a<J.length;a+=1){const $=be(t,J,a);g[a]?g[a].p($,w):(g[a]=ye($),g[a].c(),g[a].m(M,null))}for(;a<g.length;a+=1)g[a].d(1);g.length=J.length}if(w&76){K=Q(t[3]);let a;for(a=0;a<K.length;a+=1){const $=ke(t,K,a);v[a]?v[a].p($,w):(v[a]=je($),v[a].c(),v[a].m(H,null))}for(;a<v.length;a+=1)v[a].d(1);v.length=K.length}(!V||w&2&&F!==(F=_e(t[1].dek?"has-dek":"")+" svelte-gjdfxl"))&&d(y,"class",F)},i(t){V||(f&&le(f.$$.fragment,t),le(T.$$.fragment,t),V=!0)},o(t){f&&te(f.$$.fragment,t),te(T.$$.fragment,t),V=!1},d(t){t&&(p(n),p(l)),f&&se(f),se(T),b&&b.d(),me(g,t),me(v,t),Z=!1,De(ie)}}}function Oe(e,s,n){let l,o;const i=new Ve({html:!0,linkfify:!0});ne.registerLanguage("svelte",ve),ve(ne);let{data:c}=s,{slug:h,content:k,active:_}=c;function E(u){return i.render(u)}function L(u,j){const y=j.split(".");let M=y[y.length-1];return M==="csv"&&(M="diff"),ne.highlight(u,{language:M}).value}const f=new Map;Pe.forEach(u=>{f.set(u.slug,u)});function R(){const u=l.filter(j=>O(j.title)===_)[0].contents;if(window.clipboardData&&window.clipboardData.setData)return window.clipboardData.setData("Text",u);if(document.queryCommandSupported&&document.queryCommandSupported("copy")){const j=document.createElement("textarea");j.textContent=u,j.style.position="fixed",document.body.appendChild(j),j.select();try{return document.execCommand("copy")}catch(y){return console.warn("Copy to clipboard failed.",y),!1}finally{document.body.removeChild(j)}}}const S=u=>n(2,_=O(u.title)),T=u=>n(2,_=O(u.title));return e.$$set=u=>{"data"in u&&n(8,c=u.data)},e.$$.update=()=>{e.$$.dirty&256&&n(0,{slug:h,content:k,active:_}=c,h,(n(1,k),n(8,c)),(n(2,_),n(8,c))),e.$$.dirty&2&&n(3,l=[k.main].concat(k.components).concat(k.componentModules).concat(k.modules).concat(k.componentComponents).concat(k.jsons).concat(k.csvs)),e.$$.dirty&1&&n(4,o=f.get(h))},[h,k,_,l,o,E,L,R,c,S,T]}class We extends Te{constructor(s){super(),He(this,s,Oe,Be,Ie,{data:8})}}export{We as component,Qe as universal};
