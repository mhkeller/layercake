import{b as v,t as m,s as g,e as h}from"./BBz-090T.js";import{z as j,A as q,F as o,D as n,C as y,w as e,G as _}from"./Cxro91qv.js";import{e as b,i as x,a as G,s as S}from"./LAHbaaU8.js";import{i as B}from"./BZkFnTQF.js";import{p as d}from"./IEQ67wLA.js";var E=m("<a> </a>"),H=m('<li class="svelte-1dvhul3"><a> </a> <!></li>'),I=m('<ul class="guide-toc svelte-1dvhul3"></ul>');function P(k,i){j(i,!1);let C=d(i,"open",12,!1),f=d(i,"activeGuideSection",8,void 0);const w=d(i,"sections",24,()=>[])().map(s=>({metadata:s.metadata,subsections:s.subsections,slug:s.slug}));function p(){C(!1)}B();var r=I();b(r,5,()=>w,x,(s,l)=>{var u=H(),t=n(u),z=n(t);o(t);var A=y(t,2);b(A,1,()=>e(l).subsections,x,(D,c)=>{var a=E(),F=n(a);o(a),_(()=>{G(a,`subsection ${(e(c).slug===f()?"active":"")??""} svelte-1dvhul3`),S(a,"href",`/guide#${e(c).slug??""}`),g(F,e(c).title)}),h("click",a,p),v(D,a)}),o(u),_(()=>{G(t,`section ${(e(l).slug===f()?"active":"")??""} svelte-1dvhul3`),S(t,"href",`/guide#${e(l).slug??""}`),g(z,e(l).metadata.title)}),h("click",t,p),v(s,u)}),o(r),v(k,r),q()}export{P as G};
