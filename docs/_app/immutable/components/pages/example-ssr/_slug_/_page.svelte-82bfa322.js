import{S as Ce,i as Le,s as Ie,v as ue,a as q,k as y,q as ne,w as Z,aa as He,h as p,c as P,l as D,m as C,r as oe,x as he,n as r,I as me,b as G,J as _,y as x,L as ye,u as De,t as ee,d as Me,f as te,z as le,N as _e,ad as Te,p as pe,g as Ve}from"../../../../chunks/index-bab5e66b.js";import{M as Se}from"../../../../chunks/downloadBlob-9f919364.js";import{H as se,h as ve}from"../../../../chunks/hljsDefineSvelte-185b3d8f.js";import{D as $e,c as R}from"../../../../chunks/cleanTitle-bb2b1f57.js";import{e as qe}from"../../../../chunks/_examples_ssr-0ff7908e.js";const{document:ae}=Te;function ge(l,s,a){const t=l.slice();return t[12]=s[a],t}function be(l,s,a){const t=l.slice();return t[12]=s[a],t}function ke(l){let s,a=l[5](l[1].dek)+"";return{c(){s=y("div"),this.h()},l(t){s=D(t,"DIV",{class:!0});var o=C(s);o.forEach(p),this.h()},h(){r(s,"class","dek svelte-1b77smd")},m(t,o){G(t,s,o),s.innerHTML=a},p(t,o){o&2&&a!==(a=t[5](t[1].dek)+"")&&(s.innerHTML=a)},d(t){t&&p(s)}}}function we(l){let s,a=l[12].title+"",t,o,i,c;function m(){return l[9](l[12])}return{c(){s=y("li"),t=ne(a),this.h()},l(f){s=D(f,"LI",{class:!0});var v=C(s);t=oe(v,a),v.forEach(p),this.h()},h(){r(s,"class",o="tab "+(l[2]===R(l[12].title)?"active":"")+" svelte-1b77smd")},m(f,v){G(f,s,v),_(s,t),i||(c=ye(s,"click",m),i=!0)},p(f,v){l=f,v&8&&a!==(a=l[12].title+"")&&De(t,a),v&12&&o!==(o="tab "+(l[2]===R(l[12].title)?"active":"")+" svelte-1b77smd")&&r(s,"class",o)},d(f){f&&p(s),i=!1,c()}}}function Ee(l){let s,a,t=l[6](l[12].contents,l[12].title)+"",o;return{c(){s=y("div"),a=y("pre"),o=q(),this.h()},l(i){s=D(i,"DIV",{class:!0,style:!0});var c=C(s);a=D(c,"PRE",{class:!0});var m=C(a);m.forEach(p),o=P(c),c.forEach(p),this.h()},h(){r(a,"class","svelte-1b77smd"),r(s,"class","contents"),pe(s,"display",l[2]===R(l[12].title)?"block":"none")},m(i,c){G(i,s,c),_(s,a),a.innerHTML=t,_(s,o)},p(i,c){c&8&&t!==(t=i[6](i[12].contents,i[12].title)+"")&&(a.innerHTML=t),c&12&&pe(s,"display",i[2]===R(i[12].title)?"block":"none")},d(i){i&&p(s)}}}function Pe(l){let s,a,t,o,i=l[4].title+"",c,m,f,v,U,L,d,z,F,h,g,T,V,I,S,W,H,J,X,K,M,Y,re;ae.title=s=l[4].title;var A=l[4].component;function ie(e){return{}}A&&(d=ue(A,ie())),g=new $e({props:{data:l[1],slug:l[0],ssr:!0}});let b=l[1].dek&&ke(l),B=l[3],k=[];for(let e=0;e<B.length;e+=1)k[e]=we(be(l,B,e));let N=l[3],w=[];for(let e=0;e<N.length;e+=1)w[e]=Ee(ge(l,N,e));return{c(){a=q(),t=y("div"),o=y("h1"),c=ne(i),m=y("a"),f=ne("Edit"),U=q(),L=y("div"),d&&Z(d.$$.fragment),F=q(),h=y("div"),Z(g.$$.fragment),T=q(),b&&b.c(),V=q(),I=y("div"),S=y("ul");for(let e=0;e<k.length;e+=1)k[e].c();W=q(),H=y("div"),J=y("div"),X=q();for(let e=0;e<w.length;e+=1)w[e].c();this.h()},l(e){He("svelte-1ynzqk4",ae.head).forEach(p),a=P(e),t=D(e,"DIV",{class:!0,"data-label":!0});var u=C(t);o=D(u,"H1",{});var n=C(o);c=oe(n,i),m=D(n,"A",{class:!0,href:!0,target:!0,rel:!0});var $=C(m);f=oe($,"Edit"),$.forEach(p),n.forEach(p),U=P(u),L=D(u,"DIV",{class:!0,"data-slug":!0});var ce=C(L);d&&he(d.$$.fragment,ce),ce.forEach(p),F=P(u),h=D(u,"DIV",{class:!0});var de=C(h);he(g.$$.fragment,de),de.forEach(p),T=P(u),b&&b.l(u),V=P(u),I=D(u,"DIV",{id:!0,class:!0});var O=C(I);S=D(O,"UL",{id:!0,class:!0});var fe=C(S);for(let j=0;j<k.length;j+=1)k[j].l(fe);fe.forEach(p),W=P(O),H=D(O,"DIV",{id:!0,class:!0});var Q=C(H);J=D(Q,"DIV",{class:!0}),C(J).forEach(p),X=P(Q);for(let j=0;j<w.length;j+=1)w[j].l(Q);Q.forEach(p),O.forEach(p),u.forEach(p),this.h()},h(){r(m,"class","edit-repl svelte-1b77smd"),r(m,"href",v="https://svelte.dev/repl/"+l[4].replPath),r(m,"target","_blank"),r(m,"rel","nofollow"),r(L,"class","chart-hero svelte-1b77smd"),r(L,"data-slug",z=l[0].toLowerCase()),r(h,"class","download svelte-1b77smd"),r(S,"id","page-nav"),r(S,"class","svelte-1b77smd"),r(J,"class","copy svelte-1b77smd"),r(H,"id","contents-container"),r(H,"class","svelte-1b77smd"),r(I,"id","pages"),r(I,"class",K=me(l[1].dek?"has-dek":"")+" svelte-1b77smd"),r(t,"class","main svelte-1b77smd"),r(t,"data-label","Server-side")},m(e,E){G(e,a,E),G(e,t,E),_(t,o),_(o,c),_(o,m),_(m,f),_(t,U),_(t,L),d&&x(d,L,null),_(t,F),_(t,h),x(g,h,null),_(t,T),b&&b.m(t,null),_(t,V),_(t,I),_(I,S);for(let u=0;u<k.length;u+=1)k[u].m(S,null);_(I,W),_(I,H),_(H,J),_(H,X);for(let u=0;u<w.length;u+=1)w[u].m(H,null);M=!0,Y||(re=ye(J,"click",l[7]),Y=!0)},p(e,[E]){if((!M||E&16)&&s!==(s=e[4].title)&&(ae.title=s),(!M||E&16)&&i!==(i=e[4].title+"")&&De(c,i),(!M||E&16&&v!==(v="https://svelte.dev/repl/"+e[4].replPath))&&r(m,"href",v),A!==(A=e[4].component)){if(d){Ve();const n=d;ee(n.$$.fragment,1,0,()=>{le(n,1)}),Me()}A?(d=ue(A,ie()),Z(d.$$.fragment),te(d.$$.fragment,1),x(d,L,null)):d=null}(!M||E&1&&z!==(z=e[0].toLowerCase()))&&r(L,"data-slug",z);const u={};if(E&2&&(u.data=e[1]),E&1&&(u.slug=e[0]),g.$set(u),e[1].dek?b?b.p(e,E):(b=ke(e),b.c(),b.m(t,V)):b&&(b.d(1),b=null),E&12){B=e[3];let n;for(n=0;n<B.length;n+=1){const $=be(e,B,n);k[n]?k[n].p($,E):(k[n]=we($),k[n].c(),k[n].m(S,null))}for(;n<k.length;n+=1)k[n].d(1);k.length=B.length}if(E&76){N=e[3];let n;for(n=0;n<N.length;n+=1){const $=ge(e,N,n);w[n]?w[n].p($,E):(w[n]=Ee($),w[n].c(),w[n].m(H,null))}for(;n<w.length;n+=1)w[n].d(1);w.length=N.length}(!M||E&2&&K!==(K=me(e[1].dek?"has-dek":"")+" svelte-1b77smd"))&&r(I,"class",K)},i(e){M||(d&&te(d.$$.fragment,e),te(g.$$.fragment,e),M=!0)},o(e){d&&ee(d.$$.fragment,e),ee(g.$$.fragment,e),M=!1},d(e){e&&p(a),e&&p(t),d&&le(d),le(g),b&&b.d(),_e(k,e),_e(w,e),Y=!1,re()}}}function je(l,s,a){let t,o;se.registerLanguage("svelte",ve),ve(se);const i=new Se({html:!0,linkfify:!0});let{data:c}=s,{slug:m,content:f,active:v}=c;function U(h){return i.render(h)}function L(h,g){const T=g.split(".");let V=T[T.length-1];return V==="csv"&&(V="diff"),se.highlight(h,{language:V}).value}const d=new Map;qe.forEach(h=>{d.set(h.slug.toLowerCase(),h)});function z(){const h=t.filter(g=>R(g.title)===v)[0].contents;if(window.clipboardData&&window.clipboardData.setData)return window.clipboardData.setData("Text",h);if(document.queryCommandSupported&&document.queryCommandSupported("copy")){const g=document.createElement("textarea");g.textContent=h,g.style.position="fixed",document.body.appendChild(g),g.select();try{return document.execCommand("copy")}catch(T){return console.warn("Copy to clipboard failed.",T),!1}finally{document.body.removeChild(g)}}}const F=h=>a(2,v=R(h.title));return l.$$set=h=>{"data"in h&&a(8,c=h.data)},l.$$.update=()=>{l.$$.dirty&256&&a(0,{slug:m,content:f,active:v}=c,m,(a(1,f),a(8,c)),(a(2,v),a(8,c))),l.$$.dirty&2&&a(3,t=[f.main].concat(f.components).concat(f.componentModules).concat(f.modules).concat(f.componentComponents).concat(f.jsons).concat(f.csvs)),l.$$.dirty&1&&a(4,o=d.get(m.toLowerCase()))},[m,f,v,t,o,U,L,z,c,F]}class Re extends Ce{constructor(s){super(),Le(this,s,je,Pe,Ie,{data:8})}}export{Re as default};
