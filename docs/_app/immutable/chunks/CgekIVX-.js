import{b as f,t as $,s as Ee,d as Te}from"./BBz-090T.js";import{z as A,A as j,L as S,D as L,C as y,F as M,w as n,I as R,aO as Ae,G as ve,N as Q,O as le,P as q,M as J,x as V,B as me,aD as ne}from"./Cxro91qv.js";import{i as B}from"./BZkFnTQF.js";import{N as w,O as E,P as T,Q as Z,R as te,S as ke,T as Se,U as De,V as ue,W as ee,X as ze,Y as je,Z as Be,_ as we,$ as Ie,a0 as U,a1 as Ke,a2 as F,a3 as fe,B as Re,a4 as Oe,f as re,a5 as se,a6 as oe,a7 as G,a8 as Ye,a9 as Ne,aa as We,ab as he,ac as Xe,ad as qe,ae as Je,af as Ge,ag as He,ah as Ue,ai as Ve,aj as Fe,ak as Qe,al as Ze,am as et,s as tt,an as pe,a as _e,ao as ye,ap as at,aq as rt,w as st,ar as Ce}from"./Cwne2hEM.js";import{A as O,a as Y,S as I,b as Me,c as ot,C as nt}from"./CzMaUgn1.js";import{s as ae,r as ce,e as $e,i as ge}from"./LAHbaaU8.js";import{u as be,g as lt,e as it,d as xe,c as dt,b as ct,t as vt,a as Pe,f as ut,p as de,h as ft,i as pt,j as $t,k as gt,l as mt,m as ht}from"./B2dRuRJ9.js";import{p as X}from"./IEQ67wLA.js";var _t=$("<!> <!>",1),yt=$("<!> <!>",1),bt=$("<!> <!>",1),xt=$('<div class="chart-container svelte-v4mhvr"><!></div>');function Pt(k,g){A(g,!1);const t="myX",l="myY";w.forEach(i=>{i[l]=+i[l]}),B();var m=xt(),r=L(m);E(r,{ssr:!0,percentRange:!0,padding:{top:8,right:10,bottom:20,left:25},x:t,y:i=>i[l],yDomain:[0,null],data:w,children:(i,p)=>{var c=bt(),v=S(c);T(v,{children:(d,_)=>{var o=_t(),u=S(o);O(u,{});var e=y(u,2);Y(e,{ticks:4}),f(d,o)},$$slots:{default:!0}});var a=y(v,2);I(a,{children:(d,_)=>{var o=yt(),u=S(o);Z(u,{});var e=y(u,2);te(e,{}),f(d,o)},$$slots:{default:!0}}),f(i,c)},$$slots:{default:!0}}),M(m),f(k,m),j()}var kt=$("<!> <!> <!>",1),St=$('<div class="chart-container svelte-v4mhvr"><!></div>');function Dt(k,g){A(g,!1);const t="myX",l="myY";w.forEach(d=>{d[l]=+d[l]});const m=4.5,r=2.5,i="#fff",p="#0cf",c=1.5;B();var v=St(),a=L(v);E(a,{ssr:!0,percentRange:!0,padding:{top:10,right:5,bottom:20,left:25},x:t,y:l,xPadding:[r,r],yPadding:[r,r],data:w,children:(d,_)=>{T(d,{children:(o,u)=>{var e=kt(),s=S(e);O(s,{});var x=y(s,2);Y(x,{});var b=y(x,2);Me(b,{r:m,fill:i,stroke:p,strokeWidth:c}),f(o,e)},$$slots:{default:!0}})},$$slots:{default:!0}}),M(v),f(k,v),j()}var zt=$('<div class="map-container svelte-lie9rj"><!></div>');function Kt(k,g){A(g,!1);const t="myValue",l="name",m="name",r=new Map;ke.forEach(u=>{r.set(u[l],u[t])});const i=Se(be,be.objects.states),p=2.63,c=lt,v=i.features.map(u=>u.properties),a=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"];B();var d=zt();ae(d,"style",`padding-bottom:${100/p}%`);var _=L(d),o=R(ue);E(_,{ssr:!0,position:"absolute",data:i,z:u=>r.get(u[m]),get zScale(){return n(o)},zRange:a,flatData:v,children:(u,e)=>{I(u,{fixedAspectRatio:p,children:(s,x)=>{De(s,{fixedAspectRatio:p,projection:c})},$$slots:{default:!0}})},$$slots:{default:!0}}),M(d),f(k,d),j()}var Rt=$("<!> <!> <!>",1),Ct=$("<!> <!>",1),Mt=$('<div class="chart-container svelte-93joy6"><!> <!></div>');function Lt(k,g){A(g,!1);const t="year",l="value",m=[{text:"Example text...",[t]:"1980",[l]:14,dx:15,dy:-5,arrows:[{clockwise:!1,source:{anchor:"left-bottom",dx:-2,dy:-7},target:{[t]:"1980",[l]:4.5,dx:2,dy:5}},{source:{anchor:"right-bottom",dy:-7,dx:5},target:{x:"68%",y:"48%"}}]}];ee.forEach(a=>{a[l]=+a[l]}),B();var r=Mt(),i=L(r),p=R(()=>U().paddingInner(.028).round(!0));E(i,{ssr:!0,percentRange:!0,position:"absolute",padding:{top:0,right:0,bottom:20,left:20},x:t,y:l,get xScale(){return n(p)},xDomain:["1979","1980","1981","1982","1983"],yDomain:[0,null],data:ee,children:(a,d)=>{var _=Ct(),o=S(_);I(o,{children:(e,s)=>{ze(e,{})},$$slots:{default:!0}});var u=y(o,2);T(u,{children:(e,s)=>{var x=Rt(),b=S(x);O(b,{gridlines:!1});var h=y(b,2);Y(h,{gridlines:!1,snapBaselineLabel:!0});var K=y(h,2);je(K,{annotations:m}),f(e,x)},$$slots:{default:!0}}),f(a,_)},$$slots:{default:!0}});var c=y(i,2),v=R(()=>U().paddingInner(.028).round(!0));E(c,{position:"absolute",padding:{top:0,right:0,bottom:20,left:20},x:t,y:l,get xScale(){return n(v)},xDomain:["1979","1980","1981","1982","1983"],yDomain:[0,null],data:ee,children:(a,d)=>{Be(a,{children:(_,o)=>{we(_,{annotations:m})},$$slots:{default:!0,defs:(_,o)=>{Ie(_,{})}}})},$$slots:{default:!0}}),M(r),f(k,r),j()}var Et=$("<!> <!>",1),Tt=$("<!> <!>",1),At=$('<div class="chart-container svelte-v4mhvr"><!></div>');function jt(k,g){A(g,!1);const t="month",l=[0,1],m="key",r=Ke("%Y-%m-%d"),i=Object.keys(F[0]).filter(s=>s!==t),p=["#ff00cc","#ff7ac7","#ffb3c0","#ffe4b8"];F.forEach(s=>{s[t]=typeof s[t]=="string"?r(s[t]):s[t],i.forEach(x=>{s[x]=+s[x]})});const v=fe().keys(i)(F),a=Re("%b. %-d"),d=s=>re("~s")(s);B();var _=At(),o=L(_),u=R(se),e=R(()=>oe(v));E(o,{ssr:!0,percentRange:!0,padding:{top:0,right:0,bottom:20,left:17},x:s=>s.data[t],y:l,z:m,get zScale(){return n(u)},zDomain:i,zRange:p,get flatData(){return n(e)},data:v,children:(s,x)=>{var b=Tt(),h=S(b);T(h,{children:(P,D)=>{var C=Et(),z=S(C);O(z,{format:a,tickMarks:!0});var N=y(z,2);Y(N,{format:d}),f(P,C)},$$slots:{default:!0}});var K=y(h,2);I(K,{children:(P,D)=>{Oe(P,{})},$$slots:{default:!0}}),f(s,b)},$$slots:{default:!0}}),M(_),f(k,_),j()}var Bt=$("<!> <!>",1),wt=$("<!> <!>",1),It=$('<div class="chart-container svelte-v4mhvr"><!></div>');function Ot(k,g){A(g,!1);const t="year",l=[0,1],m="key",r=Object.keys(G[0]).filter(e=>e!==t),i=["#00e047","#7ceb68","#b7f486","#ecfda5"];G.forEach(e=>{r.forEach(s=>{e[s]=+e[s]})});const c=fe().keys(r)(G),v=e=>re("~s")(e);B();var a=It(),d=L(a),_=R(()=>U().paddingInner(.028).round(!0)),o=R(se),u=R(()=>oe(c));E(d,{ssr:!0,percentRange:!0,padding:{top:0,right:0,bottom:20,left:20},x:e=>e.data[t],y:l,z:m,get xScale(){return n(_)},xDomainSort:!1,get zScale(){return n(o)},zDomain:r,zRange:i,get flatData(){return n(u)},data:c,children:(e,s)=>{var x=wt(),b=S(x);T(b,{children:(K,P)=>{var D=Bt(),C=S(D);O(C,{gridlines:!1});var z=y(C,2);Y(z,{ticks:4,gridlines:!1,format:v}),f(K,D)},$$slots:{default:!0}});var h=y(b,2);I(h,{children:(K,P)=>{Ye(K,{})},$$slots:{default:!0}}),f(e,x)},$$slots:{default:!0}}),M(a),f(k,a),j()}var Yt=$("<!> <!>",1),Nt=$("<!> <!>",1),Wt=$("<!> <!> <!>",1),Xt=$('<div class="chart-container svelte-v4mhvr"><!></div>');function qt(k,g){A(g,!1);const t="month",l="value",m="fruit",r=Object.keys(F[0]).filter(e=>e!==t),i=["#ffe4b8","#ffb3c0","#ff7ac7","#ff00cc"],p=Ke("%Y-%m-%d"),c=r.map(e=>({[m]:e,values:F.map(s=>(s[t]=typeof s[t]=="string"?p(s[t]):s[t],{[l]:+s[e],[t]:s[t],[m]:e}))})),v=Re("%b. %e"),a=e=>re("~s")(e);B();var d=Xt(),_=L(d),o=R(se),u=R(()=>oe(c,"values"));E(_,{ssr:!0,percentRange:!0,padding:{top:7,right:10,bottom:20,left:25},x:t,y:l,z:m,get zScale(){return n(o)},zRange:i,get flatData(){return n(u)},yDomain:[0,null],data:c,children:(e,s)=>{var x=Wt(),b=S(x);T(b,{children:(P,D)=>{var C=Yt(),z=S(C),N=R(()=>F.map(H=>H[t]).sort((H,ie)=>H-ie));O(z,{gridlines:!1,get ticks(){return n(N)},format:v,snapLabels:!0,tickMarks:!0});var W=y(z,2);Y(W,{format:a}),f(P,C)},$$slots:{default:!0}});var h=y(b,2);I(h,{children:(P,D)=>{Ne(P,{})},$$slots:{default:!0}});var K=y(h,2);T(K,{children:(P,D)=>{var C=Nt(),z=S(C);We(z,{});var N=y(z,2);ot(N,{formatTitle:v,dataset:F}),f(P,C)},$$slots:{default:!0}}),f(e,x)},$$slots:{default:!0}}),M(d),f(k,d),j()}var Jt=$("<!> <!>",1),Gt=$('<div class="map-container svelte-1enkenv"><!> <!></div>');function Ht(k,g){A(g,!1);const t="myValue",l=Se(he,he.objects.collection),m=2.63,r=He,i="name",p="name",c=new Map,v="center",a="abbr";ke.forEach(h=>{c.set(h[i],h[t])});const d=["VT","MD","NJ","RI","DC","DE","WV","MA","CT","NH"],_=Xe.filter(h=>!d.includes(h[a])),o=l.features.map(h=>h.properties),u=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"];B();var e=Gt();ae(e,"style",`aspect-ratio:${m};`);var s=L(e);E(s,{position:"absolute",data:l,flatData:o,children:(h,K)=>{qe(h,{children:(P,D)=>{Je(P,{projection:r,fill:"#fff"})},$$slots:{default:!0}})},$$slots:{default:!0}});var x=y(s,2),b=R(ue);E(x,{position:"absolute",ssr:!0,data:l,z:h=>c.get(h[p]),get zScale(){return n(b)},zRange:u,flatData:o,children:(h,K)=>{var P=Jt(),D=S(P);I(D,{fixedAspectRatio:m,children:(z,N)=>{var W=R(()=>l.features.slice(40,50));De(z,{fixedAspectRatio:m,projection:r,get features(){return n(W)}})},$$slots:{default:!0}});var C=y(D,2);T(C,{children:(z,N)=>{Ge(z,{fixedAspectRatio:m,projection:r,features:_,getCoordinates:W=>W[v],getLabel:W=>W[a]})},$$slots:{default:!0}}),f(h,P)},$$slots:{default:!0}}),M(e),f(k,e),j()}var Ut=$("<!> <!>",1),Vt=$("<!> <!>",1),Ft=$('<div class="chart-container svelte-v4mhvr"><!></div>');function Qt(k,g){A(g,!1),ee.forEach(r=>{r.value=+r.value}),B();var t=Ft(),l=L(t),m=R(()=>U().paddingInner(.05).round(!0));E(l,{ssr:!0,percentRange:!0,padding:{top:0,right:20,bottom:20,left:35},x:"value",y:"year",get yScale(){return n(m)},yDomain:["1979","1980","1981","1982","1983"],xDomain:[0,null],data:ee,children:(r,i)=>{var p=Vt(),c=S(p);T(c,{children:(a,d)=>{var _=Ut(),o=S(_);O(o,{gridlines:!0,baseline:!0,snapLabels:!0});var u=y(o,2);Y(u,{gridlines:!1,tickMarks:!0}),f(a,_)},$$slots:{default:!0}});var v=y(c,2);I(v,{children:(a,d)=>{Ue(a,{})},$$slots:{default:!0}}),f(r,p)},$$slots:{default:!0}}),M(t),f(k,t),j()}var Zt=$("<!> <!>",1),ea=$("<!> <!>",1),ta=$('<div class="chart-container svelte-v4mhvr"><!></div>');function aa(k,g){A(g,!1);const t="year",l=[0,1],m="key",r=Object.keys(G[0]).filter(e=>e!==t),i=["#00bbff","#8bcef6","#c4e2ed","#f7f6e3"];G.forEach(e=>{r.forEach(s=>{e[s]=+e[s]})});const c=fe().keys(r)(G),v=e=>re("~s")(e);B();var a=ta(),d=L(a),_=R(()=>U().paddingInner(.05).round(!0)),o=R(se),u=R(()=>oe(c));E(d,{ssr:!0,percentRange:!0,padding:{top:0,right:0,bottom:20,left:35},y:e=>e.data[t],x:l,z:m,get yScale(){return n(_)},yDomain:["2016","2017","2018","2019"],get zScale(){return n(o)},zDomain:r,zRange:i,get flatData(){return n(u)},data:c,children:(e,s)=>{var x=ea(),b=S(x);T(b,{children:(K,P)=>{var D=Zt(),C=S(D);O(C,{baseline:!0,snapLabels:!0,format:v});var z=y(C,2);Y(z,{gridlines:!1}),f(K,D)},$$slots:{default:!0}});var h=y(b,2);I(h,{children:(K,P)=>{Ve(K,{})},$$slots:{default:!0}}),f(e,x)},$$slots:{default:!0}}),M(a),f(k,a),j()}var ra=$("<!> <!>",1),sa=$('<div class="circle svelte-1cdi6va"></div>'),oa=$("<!> <!>",1),na=$('<div class="chart-container svelte-1cdi6va"><!> <!></div>');function la(k,g){A(g,!1);const t="myX",l="myY",m=3,r=6,i={top:5,right:5,bottom:20,left:25};w.forEach(a=>{a[l]=+a[l]}),B();var p=na(),c=L(p);E(c,{position:"absolute",ssr:!0,percentRange:!0,padding:i,x:t,y:l,xPadding:[r,r],yPadding:[r,r],data:w,children:(a,d)=>{T(a,{children:(_,o)=>{var u=ra(),e=S(u);O(e,{});var s=y(e,2);Y(s,{tickMarks:!1}),f(_,u)},$$slots:{default:!0}})},$$slots:{default:!0}});var v=y(c,2);E(v,{position:"absolute",padding:i,x:t,y:l,xPadding:[r,r],yPadding:[r,r],data:w,children:(a,d)=>{var _=oa(),o=S(_);Fe(o,{children:(e,s)=>{Qe(e,{r:m})},$$slots:{default:!0}});var u=y(o,2);T(u,{children:(e,s)=>{Ze(e,{children:Ae,$$slots:{default:(x,b)=>{const h=R(()=>b.x),K=R(()=>b.y),P=R(()=>b.visible);var D=sa();ve(()=>ae(D,"style",`top:${n(K)??""}px;left:${n(h)??""}px;display: ${(n(P)?"block":"none")??""};`)),f(x,D)}}})},$$slots:{default:!0}}),f(a,_)},$$slots:{default:!0}}),M(p),f(k,p),j()}var ia=$("<!> <!> <!>",1),da=$('<div class="chart-container svelte-v4mhvr"><!></div>');function ca(k,g){A(g,!1);const t="year",l=Object.keys(G[0]).filter(v=>v!==t),m=["#f0c","#00bbff","#00e047","#ff7a33"];G.forEach(v=>{l.forEach(a=>{v[a]=+v[a]})}),B();var r=da(),i=L(r),p=R(()=>U().paddingInner(.05).round(!0)),c=R(se);E(i,{ssr:!0,percentRange:!0,padding:{right:10,bottom:20,left:30},x:l,y:t,get yScale(){return n(p)},xDomain:[0,null],xPadding:[2,0],get zScale(){return n(c)},zDomain:l,zRange:m,data:G,children:(v,a)=>{T(v,{children:(d,_)=>{var o=ia(),u=S(o);O(u,{});var e=y(u,2);Y(e,{gridlines:!1});var s=y(e,2);nt(s,{}),f(d,o)},$$slots:{default:!0}})},$$slots:{default:!0}}),M(r),f(k,r),j()}var va=$("<!> <!>",1),ua=$("<!> <!>",1),fa=$('<div class="input-container" style="position: absolute;right:10px;z-index: 9;"><input style="margin:0;" type="range" min="4" max="100" step="4" class="svelte-1jk7v2q"> <span class="counter-container" style="display:inline-block;vertical-align:top;width: 70px;text-align:right;"> </span></div> <div class="chart-container svelte-1jk7v2q"><!></div>',1);function pa(k,g){A(g,!1);const t=J(),l=J(),m=J(),r=re(".2f");let i=J(40);const p=["x0","x1"],c="length",v=it(xe);Q(()=>n(i),()=>{q(t,dt(v,n(i)))}),Q(()=>n(t),()=>{q(l,ct().domain(v).thresholds(n(t)))}),Q(()=>n(t),()=>{q(m,vt(n(t),7))}),le(),B();var a=fa(),d=S(a),_=L(d);ce(_);var o=y(_,2),u=L(o);M(o),M(d);var e=y(d,2),s=L(e),x=R(()=>U().paddingInner(0)),b=R(()=>n(l)(xe));E(s,{ssr:!0,percentRange:!0,padding:{top:20,right:5,bottom:20,left:31},x:p,y:c,get xDomain(){return n(t)},get xScale(){return n(x)},yDomain:[0,null],get data(){return n(b)},children:(h,K)=>{var P=ua(),D=S(P);T(D,{children:(z,N)=>{var W=va(),H=S(W);O(H,{gridlines:!1,baseline:!0,get ticks(){return n(m)},format:Le=>+r(Le)});var ie=y(H,2);Y(ie,{gridlines:!1,ticks:3}),f(z,W)},$$slots:{default:!0}});var C=y(D,2);I(C,{children:(z,N)=>{ze(z,{fill:"#fff",stroke:"#000",strokeWidth:1})},$$slots:{default:!0}}),f(h,P)},$$slots:{default:!0}}),M(e),ve(()=>Ee(u,`${n(i)??""} bins`)),et(_,()=>n(i),h=>q(i,h)),f(k,a),j()}function $a(k,g){A(g,!1);const t=tt(),l=()=>_e(a,"$xDomain",t),m=()=>_e(d,"$yDomain",t);let r=X(g,"data",8),i=X(g,"fullExtents",8),p=X(g,"scale",8),c=X(g,"extentGetters",8);const v={duration:300,easing:ut},a=Pe(void 0,v),d=Pe(void 0,v),_=pe(r(),c());Q(()=>(V(p()),V(i())),()=>{a.set(p()==="shared"?i().x:_.x)}),Q(()=>(V(p()),V(i())),()=>{d.set(p()==="shared"?i().y:_.y)}),le(),B(),E(k,{ssr:!0,percentRange:!0,padding:{top:2,right:6,bottom:2,left:6},get x(){return c().x},get y(){return c().y},get data(){return r()},get xDomain(){return l()},get yDomain(){return m()},children:(o,u)=>{I(o,{children:(e,s)=>{Z(e,{stroke:"#000"})},$$slots:{default:!0}})},$$slots:{default:!0}}),j()}var ga=$('<div class="small-multiple-container svelte-1xmktbf"><!></div>'),ma=$('<div class="input-container svelte-1xmktbf"><label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Individual scale</label> <label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Shared scale</label></div> <div class="group-container svelte-1xmktbf"></div>',1);function ha(k,g){A(g,!1);const t=[],l={x:o=>o.x,y:o=>o.y},m=pe(oe(de),l);de.sort((o,u)=>u[u.length-1].y-o[o.length-1].y);let r=J("individual");B();var i=ma(),p=S(i),c=L(p),v=L(c);ce(v),v.value=(v.__value="individual")==null?"":"individual",me(),M(c);var a=y(c,2),d=L(a);ce(d),d.value=(d.__value="shared")==null?"":"shared",me(),M(a),M(p);var _=y(p,2);$e(_,5,()=>de,ge,(o,u)=>{var e=ga(),s=L(e);$a(s,{get data(){return n(u)},fullExtents:m,get scale(){return n(r)},extentGetters:l}),M(e),f(o,e)}),M(_),ye(t,[],v,()=>n(r),o=>q(r,o)),ye(t,[],d,()=>n(r),o=>q(r,o)),f(k,i),j()}var _a=$('<div class="chart-container svelte-xb94lj"><!></div>');function ya(k,g){A(g,!1);const t=["January","February","March","April","May","June","July","August","September","October","November","December"],l=ft.map(a=>(a.date=new Date(a.timestring),a)),m=10,r=["#fff5cc","#ffeba9","#ffe182","#ffd754","#ffcc00"],p=at().key(a=>a.date.getUTCMonth()).key(a=>a.timestring.split("T")[0]).entries(l).sort((a,d)=>a.key-d.key);B();var c=Te(),v=S(c);$e(v,1,()=>p,ge,(a,d,_)=>{var o=_a(),u=L(o),e=R(ue);E(u,{ssr:!0,percentRange:!0,padding:{top:1,right:1,bottom:1,left:1},x:"key",z:s=>s.values.length,get zScale(){return n(e)},zRange:r,get data(){return n(d).values},children:(s,x)=>{I(s,{children:(b,h)=>{rt(b,{calcCellSize:()=>100/7})},$$slots:{default:!0}})},$$slots:{default:!0}}),M(o),ve(()=>{ae(o,"style",`width:calc(${100/p.length}% - ${m}px);${(_===0?`margin-right:${m*2}px`:"")??""}`),ae(o,"data-month",t[+n(d).key+1])}),f(a,o)}),f(k,c),j()}var ba=$("<!> <!> <!>",1),xa=$('<div class="chart-container svelte-v4mhvr"><!></div>');function Pa(k,g){A(g,!1);const t="seconds",l="day",m=4,r=2,i=pt.map(e=>{const s=e.timestring.split("T"),x=s[1].replace("Z","").split(":").map(b=>+b);return e[t]=x[0]*60*60+x[1]*60+x[2],e[l]=s[0],e}),p=pe(i,{x:e=>e.timestring}),c=p.x[0].toString().split("T")[0].split("-").map(e=>+e),v=p.x[1].toString().split("T")[0].split("-").map(e=>+e),a=st.range(new Date(Date.UTC(c[0],c[1]-1,c[2])),new Date(Date.UTC(v[0],v[1]-1,v[2]+1))).map(e=>e.toISOString().split("T")[0]).sort();B();var d=xa(),_=L(d),o=R($t),u=R(()=>U().paddingInner(.05).round(!0));E(_,{ssr:!0,percentRange:!0,padding:{top:0,right:15,bottom:20,left:75},x:t,y:l,xDomain:[0,24*60*60],yDomain:a,get xScale(){return n(o)},get yScale(){return n(u)},xPadding:[r,r],data:i,children:(e,s)=>{T(e,{children:(x,b)=>{var h=ba(),K=S(h),P=R(()=>[0,4,8,12,16,20,24].map(z=>z*60*60));O(K,{get ticks(){return n(P)},format:z=>`${Math.floor(z/60/60)}:00`});var D=y(K,2);Y(D,{});var C=y(D,2);Me(C,{r:m,fill:"rgba(255, 204, 0, 0.75)",strokeWidth:0}),f(x,h)},$$slots:{default:!0}})},$$slots:{default:!0}}),M(d),f(k,d),j()}var ka=$("<!> <!>",1),Sa=$("<!> <!>",1),Da=$("<!> <!>",1),za=$("<!> <!>",1),Ka=$("<!> <!>",1),Ra=$('<div class="brushed-chart-container svelte-12vpq9d"><!></div> <div class="brush-container svelte-12vpq9d"><!></div>',1);function Ca(k,g){A(g,!1);let t=J([null,null]);const l="myX",m="myY";w.forEach(d=>{d[m]=+d[m]});let r=J();Q(()=>(n(r),n(t)),()=>{q(r,w.slice((n(t)[0]||0)*w.length,(n(t)[1]||1)*w.length)),n(r).length<2&&q(r,w.slice(n(t)[0]*w.length,n(t)[0]*w.length+2))}),le(),B();var i=Ra(),p=S(i),c=L(p);E(c,{ssr:!0,percentRange:!0,padding:{bottom:20,left:25},x:l,y:m,yDomain:[0,null],get data(){return n(r)},children:(d,_)=>{var o=Da(),u=S(o);T(u,{children:(s,x)=>{var b=ka(),h=S(b);O(h,{ticks:P=>{const D=P.filter(C=>C%1===0);return D.length>7?D.filter((C,z)=>z%2===0):D}});var K=y(h,2);Y(K,{ticks:4}),f(s,b)},$$slots:{default:!0}});var e=y(u,2);I(e,{children:(s,x)=>{var b=Sa(),h=S(b);Z(h,{stroke:"#00e047"});var K=y(h,2);te(K,{fill:"#00e04710"}),f(s,b)},$$slots:{default:!0}}),f(d,o)},$$slots:{default:!0}}),M(p);var v=y(p,2),a=L(v);E(a,{ssr:!0,percentRange:!0,padding:{top:5},x:l,y:m,yDomain:[0,null],data:w,children:(d,_)=>{var o=Ka(),u=S(o);I(u,{children:(s,x)=>{var b=za(),h=S(b);Z(h,{stroke:"#00e047"});var K=y(h,2);te(K,{fill:"#00e04710"}),f(s,b)},$$slots:{default:!0}});var e=y(u,2);T(e,{children:(s,x)=>{Ce(s,{get min(){return n(t)[0]},set min(b){ne(t,n(t)[0]=b)},get max(){return n(t)[1]},set max(b){ne(t,n(t)[1]=b)},$$legacy:!0})},$$slots:{default:!0}}),f(d,o)},$$slots:{default:!0}}),M(v),f(k,i),j()}var Ma=$("<!> <!>",1),La=$("<!> <!>",1),Ea=$("<!> <!>",1),Ta=$("<!> <!>",1),Aa=$("<!> <!>",1),ja=$('<div class="chart-wrapper svelte-ypfvhs"><div class="chart-container svelte-ypfvhs"><!></div> <div class="brush-container svelte-ypfvhs"><!></div></div>');function Ba(k,g){A(g,!1);let t=X(g,"min",12,null),l=X(g,"max",12,null),m=X(g,"xKey",8,"x"),r=X(g,"yKey",8,"y"),i=X(g,"data",24,()=>[]),p=X(g,"stroke",8,"#00e047"),c=J();Q(()=>(n(c),V(i()),V(t()),V(l())),()=>{q(c,i().slice((t()||0)*i().length,(l()||1)*i().length)),n(c).length<2&&q(c,i().slice(t()*i().length,t()*i().length+2))}),le(),B();var v=ja(),a=L(v),d=L(a);E(d,{ssr:!0,percentRange:!0,padding:{bottom:20,left:25},get x(){return m()},get y(){return r()},yDomain:[0,null],get data(){return n(c)},children:(u,e)=>{var s=Ea(),x=S(s);T(x,{children:(h,K)=>{var P=Ma(),D=S(P);O(D,{ticks:z=>{const N=z.filter(W=>W%1===0);return N.length>7?N.filter((W,H)=>H%2===0):N}});var C=y(D,2);Y(C,{ticks:2}),f(h,P)},$$slots:{default:!0}});var b=y(x,2);I(b,{children:(h,K)=>{var P=La(),D=S(P);Z(D,{get stroke(){return p()}});var C=y(D,2),z=R(()=>`${p()}10`);te(C,{get fill(){return n(z)}}),f(h,P)},$$slots:{default:!0}}),f(u,s)},$$slots:{default:!0}}),M(a);var _=y(a,2),o=L(_);E(o,{ssr:!0,percentRange:!0,padding:{top:5},get x(){return m()},get y(){return r()},yDomain:[0,null],get data(){return i()},children:(u,e)=>{var s=Aa(),x=S(s);I(x,{children:(h,K)=>{var P=Ta(),D=S(P);Z(D,{get stroke(){return p()}});var C=y(D,2),z=R(()=>`${p()}10`);te(C,{get fill(){return n(z)}}),f(h,P)},$$slots:{default:!0}});var b=y(x,2);T(b,{children:(h,K)=>{Ce(h,{get min(){return t()},set min(P){t(P)},get max(){return l()},set max(P){l(P)},$$legacy:!0})},$$slots:{default:!0}}),f(u,s)},$$slots:{default:!0}}),M(_),M(v),f(k,v),j()}var wa=$('<div class="small-multiple-container svelte-gmttnm"></div>');function Ia(k){let g=J([null,null]);const t="myX",l="myY",m=[w,gt,mt,ht];m.forEach(p=>{p.forEach(c=>{c[l]=+c[l]})});const r=["#00e047","#00bbff","#ff00cc","#ffcc00"];var i=wa();$e(i,5,()=>m,ge,(p,c,v)=>{Ba(p,{get data(){return n(c)},xKey:t,yKey:l,get min(){return n(g)[0]},set min(a){ne(g,n(g)[0]=a)},get max(){return n(g)[1]},set max(a){ne(g,n(g)[1]=a)},get stroke(){return r[v]},$$legacy:!0})}),M(i),f(k,i)}const Ha=[{replPath:"ac23120460b1409a9e1e6fd328b63b64?version=3.46.2",title:"Line + area",slug:"Line",component:Pt},{replPath:"1969b7c74b124445ad9d55ad28542cd6?version=3.46.2",title:"WebGL Scatter (svg axes, quadtree hover)",slug:"ScatterWebgl",component:la},{replPath:"af25643f1e3c4a6f93aed138ac8b1550?version=3.46.2",title:"Map (svg, pre-projected)",slug:"MapSvg",component:Kt},{replPath:"14c49b034a1e49bbbcd32e0ba749378c?version=3.46.2",title:"Multilayer map (canvas + svg)",slug:"MapLayered",component:Ht},{replPath:"3dcdfc8c7aab4ca5a82f912f377a25e2?version=3.46.2",title:"Column annotated",slug:"Column",component:Lt},{replPath:"9d7b933184db447c83cc315ad278dabd?version=3.46.2",title:"Stacked column",slug:"ColumnStacked",component:Ot},{replPath:"3e18cab5e88a4b29a14a08fdccd418c2?version=3.46.2",title:"Bar",slug:"Bar",component:Qt},{replPath:"af5ce39a12d74ed7a484010a49f09eaa?version=3.46.2",title:"Stacked bar",slug:"BarStacked",component:aa},{replPath:"ea09c9f533594b3ab9ebb509c9bfc03a?version=3.46.2",title:"Multiline (html labels + quadtree tooltip)",slug:"MultiLine",component:qt},{replPath:"1eb71294f7c147ce906aa2dfc6e2f64e?version=3.46.2",title:"Stacked area",slug:"AreaStacked",component:jt},{replPath:"9862620a31cd4f9dac8191df953e4532?version=3.46.2",title:"Scatter (html)",slug:"Scatter",component:Dt},{replPath:"f3f78a8b122b40dda9ac1e32dee0737f?version=3.46.2",title:"Cleveland dot plot",slug:"ClevelandDotPlot",component:ca},{replPath:"c1e6634def024499ad026ecab3c39499?version=3.46.2",title:"Calendar (one cake per month)",slug:"Calendar",component:ya},{replPath:"3142518ab68f493cad0e327dba5cae1a?version=3.46.2",title:"Time of day plot",slug:"Timeplot",component:Pa},{replPath:"74c8fd12be824840bb78bcaa2eea33bb?version=3.46.2",title:"Histogram (variable bins)",slug:"Histogram",component:pa},{replPath:"82b6e8a37e9f4eaa8140498c1b1f490d?version=3.46.2",title:"Small multiples (animated domain transition)",slug:"SmallMultiples",component:ha},{replPath:"7b692f97938f4bc2a79d62d5ccdbb02d?version=3.46.2",title:"Brush",slug:"Brush",component:Ca},{replPath:"1868bf7315654558894580f43ddeace8?version=3.46.2",title:"Synced brush",slug:"SyncedBrush",component:Ia}];export{Ha as e};
