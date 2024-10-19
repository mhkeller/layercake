import{a as g,t as h,d as _e,s as be}from"./disclose-version.CmtI0EPl.js";import{p as L,a as B,f as K,c as C,s as y,r as D,w as l,v as I,P as Y,N as z,aO as ve,t as ae,Q as Z,R as fe,K as Q,M as le,aE as ie}from"./runtime.B3Do0ZXm.js";import{i as j}from"./lifecycle.B5gl02A_.js";import{a1 as Ze,L as O,M as T,X as M,O as te,P as re,ab as Le,R as Be,Q as je,f as ee,S as Ae,N as X,T as ke,U as ce,V as Re,W as et,Y as tt,Z as at,_ as V,$ as Ne,a0 as U,z as Oe,a2 as rt,a3 as G,a4 as se,a5 as F,a6 as ot,a7 as st,a8 as nt,a9 as Ke,aa as lt,ac as it,ad as ct,ae as dt,af as vt,ag as ft,ah as ut,ai as pt,aj as mt,ak as $t,al as Pe,am as de,an as gt,ao as ht,r as yt,ap as Ie}from"./Brush.html.DSgXU-YJ.js";import{A as N,a as W,S as _t,b as We,V as bt,T as xt,c as kt,C as Pt,d as he,e as St,R as Dt,f as Ce,g as Ye,h as zt,i as Kt,j as Ct,B as Et,K as Xe,k as wt,l as Tt,m as Mt,n as Lt}from"./dots.BSRmhrTK.js";import{i as Bt}from"./if.DMXaGV_-.js";import{e as ue,i as pe,s as xe,r as oe}from"./class.B1rLQBbq.js";import{b as jt,u as Ee,g as At,e as Rt,d as we,c as Nt,t as Ot,a as Te,f as It,p as ye,h as Wt,i as Yt,j as Xt,k as qt,l as Ft,m as Jt}from"./pointsFour.B2oqJjZo.js";import{p as q}from"./index-client.CfugqxwE.js";import{s as Ut,a as Me}from"./store.C8KVTQwS.js";function Vt($,c,{domain:e,thresholds:r}={}){if(typeof $!="object")throw new TypeError("The first argument of bin() must be an array or data object");let o=jt();if(c){const t=typeof c=="function"?c:s=>s[c];o=o.value(t)}return e&&(o=o.domain(e)),r&&(o=o.thresholds(r)),o($)}function Se($,c,{value:e,order:r,offset:o}={}){if(typeof $!="object")throw new TypeError("The first argument of stack() must be an array or data object");if(!Array.isArray(c))throw new TypeError("The second argument of stack() must be an array of key names");let t=Ze().keys(c);return e&&(t=t.value(e)),r&&(t=t.order(r)),o&&(t=t.offset(o)),t($)}function Gt($,c,{groupTo:e="group",valueTo:r="value",keepKeys:o=void 0}={}){if(!Array.isArray($))throw new TypeError("The first argument of groupLonger() must be an array of data");if(!Array.isArray(c))throw new TypeError("The second argument of groupLonger() must be an array of key names");const t=new Set(c),s=o||Object.keys($[0]).filter(d=>!t.has(d));return c.map(d=>({[e]:d,values:$.map(n=>({...Object.fromEntries(s.map(m=>[m,n[m]])),[r]:n[d],[e]:d}))}))}var Ht=h("<!> <!> <!> <!>",1),Qt=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Zt($,c){L(c,!1);const e="myX",r="myY";O.forEach(s=>{s[r]=+s[r]}),j();var o=Qt(),t=C(o);T(t,{padding:{top:8,right:10,bottom:20,left:25},x:e,y:r,yDomain:[0,null],data:O,children:(s,d)=>{M(s,{children:(n,m)=>{var v=Ht(),u=K(v);N(u,{});var b=y(u,2);W(b,{ticks:4});var f=y(b,2);te(f,{});var a=y(f,2);re(a,{}),g(n,v)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(o),g($,o),B()}var ea=h("<!> <!>",1),ta=h("<!> <!>",1),aa=h("<!> <!> <!>",1),ra=h('<div class="chart-container svelte-v4mhvr"><!></div>');function oa($,c){L(c,!1);const e="myX",r="myY";O.forEach(v=>{v[r]=+v[r]});const o=3,t=10,s="#fff";function d(v){console.log("dispatched event",v,v.detail)}j();var n=ra(),m=C(n);T(m,{padding:{top:10,right:5,bottom:20,left:25},x:e,y:r,xPadding:[t,t],yPadding:[t,t],data:O,children:(v,u)=>{var b=aa(),f=K(b);M(f,{children:(p,x)=>{var _=ea(),k=K(_);N(k,{gridlines:!1});var P=y(k,2);W(P,{gridlines:!1,ticks:4}),g(p,_)},$$slots:{default:!0}});var a=y(f,2);Le(a,{children:(p,x)=>{_t(p,{r:o*1.5,fill:"#0cf"})},$$slots:{default:!0}});var i=y(a,2);M(i,{children:(p,x)=>{var _=ta(),k=K(_);We(k,{r:o,fill:s});var P=y(k,2);bt(P,{stroke:"#333",$$events:{"voronoi-mouseover":d}}),g(p,_)},$$slots:{default:!0}}),g(v,b)},$$slots:{default:!0}}),D(n),g($,n),B()}var sa=h('<div class="row"><span> </span> </div>'),na=h("<!> <!>",1),la=h('<div class="chart-container svelte-v4mhvr"><!></div>');function ia($,c){L(c,!1);const e="myValue",r="name",o="name",t=new Map,s=Be(Ee,Ee.objects.states),d=At;je.forEach(p=>{t.set(p[r],p)});let n=Y(),m=Y(!0);const v=s.features.map(p=>p.properties),u=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"],b=ee(",");j();var f=la(),a=C(f),i=z(ke);T(a,{data:s,z:p=>t.get(p[o])[e],get zScale(){return l(i)},zRange:u,flatData:v,children:(p,x)=>{var _=na(),k=K(_);M(k,{children:(S,w)=>{Ae(S,{projection:d,$$events:{mousemove:E=>I(n,I(m,E)),mouseout:()=>I(m,!0)}})},$$slots:{default:!0}});var P=y(k,2);X(P,{pointerEvents:!1,children:(S,w)=>{var E=_e(),A=K(E);Bt(A,()=>l(m)!==!0,R=>{xt(R,{get evt(){return l(n)},children:ve,$$slots:{default:(J,H)=>{const ne=z(()=>H.detail);var De=_e();const qe=z(()=>({...l(ne).props,...t.get(l(ne).props[o])}));var Fe=K(De);ue(Fe,1,()=>Object.entries(l(qe)),pe,(Je,ze)=>{let Ue=()=>l(ze)[0],me=()=>l(ze)[1];var $e=sa();const Ve=z(()=>Ue().replace(/^\w/,Qe=>Qe.toUpperCase()));var ge=C($e),Ge=C(ge);D(ge);var He=y(ge);ae(()=>be(He,` ${(typeof me()=="number"?b(me()):me())??""}`)),D($e),ae(()=>be(Ge,`${l(Ve)??""}:`)),g(Je,$e)}),g(J,De)}}})}),g(S,E)},$$slots:{default:!0}}),g(p,_)},$$slots:{default:!0}}),D(f),g($,f),B()}var ca=h("<!> <!> <!>",1),da=h("<!> <!> <!>",1),va=h('<div class="chart-container svelte-v4mhvr"><!></div>');function fa($,c){L(c,!1);const e="year",r="value",o=[{text:"Example text...",[e]:"1980",[r]:14,dx:15,dy:-5,arrows:[{clockwise:!1,source:{anchor:"left-bottom",dx:-2,dy:-7},target:{[e]:"1980",[r]:4.5,dx:2,dy:5}},{source:{anchor:"right-bottom",dy:-7,dx:5},target:{x:"68%",y:"48%"}}]}];ce.forEach(n=>{n[r]=+n[r]}),j();var t=va(),s=C(t),d=z(()=>V().paddingInner(.02).round(!0));T(s,{padding:{top:0,right:0,bottom:20,left:20},x:e,y:r,get xScale(){return l(d)},xDomain:["1979","1980","1981","1982","1983"],yDomain:[0,null],data:ce,children:(n,m)=>{var v=da(),u=K(v);M(u,{children:(a,i)=>{var p=ca(),x=K(p);N(x,{gridlines:!1});var _=y(x,2);W(_,{snapBaselineLabel:!0});var k=y(_,2);Re(k,{}),g(a,p)},$$slots:{default:!0}});var b=y(u,2);X(b,{children:(a,i)=>{et(a,{annotations:o})},$$slots:{default:!0}});var f=y(b,2);M(f,{children:(a,i)=>{tt(a,{annotations:o})},$$slots:{default:!0,defs:(a,i)=>{at(a,{})}}}),g(n,v)},$$slots:{default:!0}}),D(t),g($,t),B()}var ua=h("<!> <!> <!>",1),pa=h('<div class="chart-container svelte-v4mhvr"><!></div>');function ma($,c){L(c,!1);const e="month",r=[0,1],o="key",t=Ne("%Y-%m-%d"),s=Object.keys(U[0]).filter(i=>i!==e),d=["#ff00cc","#ff7ac7","#ffb3c0","#ffe4b8"],n=Oe("%b. %-d"),m=i=>ee("~s")(i);U.forEach(i=>{i[e]=typeof i[e]=="string"?t(i[e]):i[e],s.forEach(p=>{i[p]=+i[p]})});const v=Se(U,s);j();var u=pa(),b=C(u),f=z(G),a=z(()=>se(v));T(b,{padding:{top:0,right:0,bottom:20,left:17},x:i=>i.data[e],y:r,z:o,get zScale(){return l(f)},zDomain:s,zRange:d,get flatData(){return l(a)},data:v,children:(i,p)=>{M(i,{children:(x,_)=>{var k=ua(),P=K(k);N(P,{format:n,tickMarks:!0});var S=y(P,2);W(S,{format:m});var w=y(S,2);rt(w,{}),g(x,k)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(u),g($,u),B()}var $a=h("<!> <!> <!>",1),ga=h('<div class="chart-container svelte-v4mhvr"><!></div>');function ha($,c){L(c,!1);const e="year",r=[0,1],o="key",t=Object.keys(F[0]).filter(a=>a!==e),s=["#00e047","#7ceb68","#b7f486","#ecfda5"];F.forEach(a=>{t.forEach(i=>{a[i]=+a[i]})});const d=a=>ee("~s")(a),n=Se(F,t);j();var m=ga(),v=C(m),u=z(()=>V().paddingInner(.02).round(!0)),b=z(G),f=z(()=>se(n));T(v,{padding:{top:0,right:0,bottom:20,left:20},x:a=>a.data[e],y:r,z:o,get xScale(){return l(u)},xDomainSort:!1,get zScale(){return l(b)},zDomain:t,zRange:s,get flatData(){return l(f)},data:n,children:(a,i)=>{M(a,{children:(p,x)=>{var _=$a(),k=K(_);N(k,{gridlines:!1});var P=y(k,2);W(P,{ticks:4,gridlines:!1,format:d});var S=y(P,2);ot(S,{}),g(p,_)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(m),g($,m),B()}var ya=h("<!> <!> <!>",1),_a=h("<!> <!>",1),ba=h("<!> <!>",1),xa=h('<div class="chart-container svelte-v4mhvr"><!></div>');function ka($,c){L(c,!1);const e="month",r="value",o="fruit",t=Ne("%Y-%m-%d"),s=Object.keys(U[0]).filter(i=>i!==e),d=["#ffe4b8","#ffb3c0","#ff7ac7","#ff00cc"];U.forEach(i=>{i[e]=typeof i[e]=="string"?t(i[e]):i[e],s.forEach(p=>{i[p]=+i[p]})});const n=Oe("%b. %e"),m=i=>ee("~s")(i),v=Gt(U,s,{groupTo:o,valueTo:r});j();var u=xa(),b=C(u),f=z(G),a=z(()=>se(v,"values"));T(b,{padding:{top:7,right:10,bottom:20,left:25},x:e,y:r,z:o,yDomain:[0,null],get zScale(){return l(f)},zRange:d,get flatData(){return l(a)},data:v,children:(i,p)=>{var x=ba(),_=K(x);M(_,{children:(P,S)=>{var w=ya(),E=K(w),A=z(()=>U.map(H=>H[e]).sort((H,ne)=>H-ne));N(E,{gridlines:!1,get ticks(){return l(A)},format:n,snapLabels:!0,tickMarks:!0});var R=y(E,2);W(R,{ticks:4,format:m});var J=y(R,2);st(J,{}),g(P,w)},$$slots:{default:!0}});var k=y(_,2);X(k,{children:(P,S)=>{var w=_a(),E=K(w);nt(E,{});var A=y(E,2);kt(A,{formatTitle:n,dataset:U}),g(P,w)},$$slots:{default:!0}}),g(i,x)},$$slots:{default:!0}}),D(u),g($,u),B()}var Pa=h("<!> <!> <!>",1),Sa=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Da($,c){L(c,!1);const e="myValue",r="center",o="abbr",t=Be(Ke,Ke.objects.collection),s=dt,d="name",n="name",m=new Map;je.forEach(x=>{m.set(x[d],x[e])});const v=["VT","MD","NJ","RI","DC","DE","WV","MA","CT","NH"],u=lt.filter(x=>!v.includes(x[o])),b=t.features.map(x=>x.properties),f=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"];j();var a=Sa(),i=C(a),p=z(ke);T(i,{data:t,z:x=>m.get(x[n]),get zScale(){return l(p)},zRange:f,flatData:b,children:(x,_)=>{var k=Pa(),P=K(k);Le(P,{children:(E,A)=>{it(E,{projection:s,fill:"#fff"})},$$slots:{default:!0}});var S=y(P,2);M(S,{children:(E,A)=>{var R=z(()=>t.features.slice(40,50));Ae(E,{projection:s,get features(){return l(R)}})},$$slots:{default:!0}});var w=y(S,2);X(w,{pointerEvents:!1,children:(E,A)=>{ct(E,{projection:s,features:u,getCoordinates:R=>R[r],getLabel:R=>R[o]})},$$slots:{default:!0}}),g(x,k)},$$slots:{default:!0}}),D(a),g($,a),B()}var za=h("<!> <!> <!>",1),Ka=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Ca($,c){L(c,!1);const e="value",r="year";ce.forEach(d=>{d[e]=+d[e]}),j();var o=Ka(),t=C(o),s=z(()=>V().paddingInner(.05));T(t,{padding:{bottom:20,left:35},x:e,y:r,get yScale(){return l(s)},xDomain:[0,null],data:ce,children:(d,n)=>{M(d,{children:(m,v)=>{var u=za(),b=K(u);N(b,{tickMarks:!0,baseline:!0,snapLabels:!0});var f=y(b,2);W(f,{tickMarks:!0,gridlines:!1});var a=y(f,2);vt(a,{}),g(m,u)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(o),g($,o),B()}var Ea=h("<!> <!> <!>",1),wa=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Ta($,c){L(c,!1);const e=[0,1],r="year",o="key",t=Object.keys(F[0]).filter(a=>a!==r),s=["#00bbff","#8bcef6","#c4e2ed","#f7f6e3"];F.forEach(a=>{t.forEach(i=>{a[i]=+a[i]})});const d=a=>ee("~s")(a),n=Se(F,t);j();var m=wa(),v=C(m),u=z(()=>V().paddingInner(.05)),b=z(G),f=z(()=>se(n));T(v,{padding:{top:0,bottom:20,left:35},x:e,y:a=>a.data[r],z:o,get yScale(){return l(u)},get zScale(){return l(b)},zDomain:t,zRange:s,get flatData(){return l(f)},data:n,children:(a,i)=>{M(a,{children:(p,x)=>{var _=Ea(),k=K(_);N(k,{baseline:!0,snapLabels:!0,format:d});var P=y(k,2);W(P,{gridlines:!1});var S=y(P,2);ft(S,{}),g(p,_)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(m),g($,m),B()}var Ma=h("<!> <!>",1),La=h('<div class="circle svelte-1uuqn3j"></div>'),Ba=h("<!> <!> <!>",1),ja=h('<div class="chart-container svelte-1uuqn3j"><!></div>');function Aa($,c){L(c,!1);const e="myX",r="myY",o=3,t=6;O.forEach(n=>{n[r]=+n[r]}),j();var s=ja(),d=C(s);T(d,{padding:{top:5,right:5,bottom:20,left:25},x:e,y:r,xPadding:[t,t],yPadding:[t,t],data:O,children:(n,m)=>{var v=Ba(),u=K(v);M(u,{children:(a,i)=>{var p=Ma(),x=K(p);N(x,{});var _=y(x,2);W(_,{tickMarks:!1,ticks:5}),g(a,p)},$$slots:{default:!0}});var b=y(u,2);ut(b,{children:(a,i)=>{pt(a,{r:o})},$$slots:{default:!0}});var f=y(b,2);X(f,{children:(a,i)=>{mt(a,{children:ve,$$slots:{default:(p,x)=>{const _=z(()=>x.x),k=z(()=>x.y),P=z(()=>x.visible);var S=La();ae(()=>xe(S,"style",`top:${l(k)??""}px;left:${l(_)??""}px;display: ${(l(P)?"block":"none")??""};`)),g(p,S)}}})},$$slots:{default:!0}}),g(n,v)},$$slots:{default:!0}}),D(s),g($,s),B()}var Ra=h("<!> <!> <!>",1),Na=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Oa($,c){L(c,!1);const e="year",r=Object.keys(F[0]).filter(m=>m!==e),o=["#f0c","#00bbff","#00e047","#ff7a33"];F.forEach(m=>{r.forEach(v=>{m[v]=+m[v]})}),j();var t=Na(),s=C(t),d=z(()=>V().paddingInner(.05).round(!0)),n=z(G);T(s,{padding:{right:10,bottom:20,left:30},x:r,y:e,get yScale(){return l(d)},xDomain:[0,null],xPadding:[10,0],get zScale(){return l(n)},zDomain:r,zRange:o,data:F,children:(m,v)=>{M(m,{children:(u,b)=>{var f=Ra(),a=K(f);N(a,{});var i=y(a,2);W(i,{gridlines:!1});var p=y(i,2);Pt(p,{}),g(u,f)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(t),g($,t),B()}var Ia=h("<!> <!> <!>",1),Wa=h('<div class="input-container" style="position: absolute;right:10px;z-index: 9;"><input style="margin:0;" type="range" min="4" max="100" step="4" class="svelte-v09z8s"> <span class="counter-container" style="display:inline-block;vertical-align:top;width: 70px;text-align:right;"> </span></div> <div class="chart-container svelte-v09z8s"><!></div>',1);function Ya($,c){L(c,!1);const e=Y(),r=Y(),o=Y(),t=ee(".2f"),s=["x0","x1"],d="length";let n=Y(40);const m=Rt(we);Z(()=>l(n),()=>{I(e,Nt(m,l(n)))}),Z(()=>l(e),()=>{I(r,Ot(l(e),5))}),Z(()=>l(e),()=>{I(o,Vt(we,_=>_,{domain:m,thresholds:l(e)}))}),fe(),j();var v=Wa(),u=K(v),b=C(u);oe(b);var f=y(b,2),a=C(f);D(f),D(u);var i=y(u,2),p=C(i),x=z(()=>V().paddingInner(0));T(p,{padding:{top:20,right:5,bottom:20,left:30},x:s,y:d,get xDomain(){return l(e)},get xScale(){return l(x)},yDomain:[0,null],get data(){return l(o)},children:(_,k)=>{M(_,{children:(P,S)=>{var w=Ia(),E=K(w);N(E,{gridlines:!1,baseline:!0,get ticks(){return l(r)},format:J=>+t(J)});var A=y(E,2);W(A,{gridlines:!1,ticks:3});var R=y(A,2);Re(R,{fill:"#fff",stroke:"#000",strokeWidth:1}),g(P,w)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(i),ae(()=>be(a,`${l(n)??""} bins`)),$t(b,()=>l(n),_=>I(n,_)),g($,v),B()}function Xa($,c){L(c,!1);const e=Ut(),r=()=>Me(v,"$xDomain",e),o=()=>Me(u,"$yDomain",e);let t=q(c,"data",8),s=q(c,"fullExtents",8),d=q(c,"scale",8),n=q(c,"extentGetters",8);const m={duration:300,easing:It},v=Te(void 0,m),u=Te(void 0,m),b=Pe(t(),n());Z(()=>(Q(d()),Q(s())),()=>{v.set(d()==="shared"?s().x:b.x)}),Z(()=>(Q(d()),Q(s())),()=>{u.set(d()==="shared"?s().y:b.y)}),fe(),j(),T($,{padding:{top:2,right:6,bottom:2,left:6},get x(){return n().x},get y(){return n().y},get data(){return t()},get xDomain(){return r()},get yDomain(){return o()},children:(f,a)=>{M(f,{children:(i,p)=>{te(i,{stroke:"#000"})},$$slots:{default:!0}})},$$slots:{default:!0}}),B()}var qa=h('<div class="small-multiple-container svelte-1xmktbf"><!></div>'),Fa=h('<div class="input-container svelte-1xmktbf"><label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Individual scale</label> <label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Shared scale</label></div> <div class="group-container svelte-1xmktbf"></div>',1);function Ja($,c){L(c,!1);const e=[],r={x:f=>f.x,y:f=>f.y},o=Pe(se(ye),r);ye.sort((f,a)=>a[a.length-1].y-f[f.length-1].y);let t=Y("individual");j();var s=Fa(),d=K(s),n=C(d),m=C(n);oe(m),m.value=(m.__value="individual")==null?"":"individual",le(),D(n);var v=y(n,2),u=C(v);oe(u),u.value=(u.__value="shared")==null?"":"shared",le(),D(v),D(d);var b=y(d,2);ue(b,5,()=>ye,pe,(f,a)=>{var i=qa(),p=C(i);Xa(p,{get data(){return l(a)},fullExtents:o,get scale(){return l(t)},extentGetters:r}),D(i),g(f,i)}),D(b),de(e,[],m,()=>l(t),f=>I(t,f)),de(e,[],u,()=>l(t),f=>I(t,f)),g($,s),B()}var Ua=h('<div class="chart-container svelte-1lqvxpk"><!></div>');function Va($,c){L(c,!1);const e=["January","February","March","April","May","June","July","August","September","October","November","December"],r=Wt.map(v=>(v.date=new Date(v.timestring),v)),o=10,t=["#fff5cc","#ffeba9","#ffe182","#ffd754","#ffcc00"],d=gt().key(v=>v.date.getUTCMonth()).key(v=>v.timestring.split("T")[0]).entries(r).sort((v,u)=>v.key-u.key);j();var n=_e(),m=K(n);ue(m,1,()=>d,pe,(v,u,b)=>{var f=Ua(),a=C(f),i=z(ke);T(a,{padding:{top:1,right:1,bottom:1,left:1},x:"key",z:p=>p.values.length,get zScale(){return l(i)},zRange:t,get data(){return l(u).values},children:(p,x)=>{M(p,{children:(_,k)=>{ht(_,{})},$$slots:{default:!0}})},$$slots:{default:!0}}),D(f),ae(()=>{xe(f,"style",`width:calc(${100/d.length}% - ${o}px);${(b===0?`margin-right:${o*2}px`:"")??""}`),xe(f,"data-month",e[+l(u).key+1])}),g(v,f)}),g($,n),B()}var Ga=h("<!> <!> <!>",1),Ha=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Qa($,c){L(c,!1);const e="seconds",r="day",o=4,t=Yt.map(a=>{const i=a.timestring.split("T"),p=i[1].replace("Z","").split(":").map(x=>+x);return a[e]=p[0]*60*60+p[1]*60+p[2],a[r]=i[0],a}),s=Pe(t,{x:a=>a.timestring}),d=s.x[0].toString().split("T")[0].split("-").map(a=>+a),n=s.x[1].toString().split("T")[0].split("-").map(a=>+a),m=yt.range(new Date(Date.UTC(d[0],d[1]-1,d[2])),new Date(Date.UTC(n[0],n[1]-1,n[2]+1))).map(a=>a.toISOString().split("T")[0]).sort();j();var v=Ha(),u=C(v),b=z(Xt),f=z(()=>V().paddingInner(.05).round(!0));T(u,{padding:{top:0,right:15,bottom:20,left:75},x:e,y:r,xDomain:[0,24*60*60],yDomain:m,get xScale(){return l(b)},get yScale(){return l(f)},data:t,children:(a,i)=>{M(a,{children:(p,x)=>{var _=Ga(),k=K(_),P=z(()=>[0,4,8,12,16,20,24].map(E=>E*60*60));N(k,{get ticks(){return l(P)},format:E=>`${Math.floor(E/60/60)}:00`});var S=y(k,2);W(S,{});var w=y(S,2);We(w,{r:o,fill:"rgba(255, 204, 0, 0.75)"}),g(p,_)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(v),g($,v),B()}var Za=h("<!> <!>",1),er=h('<div class="chart-container svelte-v4mhvr"><!></div>');function tr($,c){L(c,!1);const e="name",r=["fastball","change","slider","cutter","curve"],o=Object.keys(he[0]).filter(d=>d!==e);he.forEach(d=>{o.forEach(n=>{d[n]=+d[n]})}),j();var t=er(),s=C(t);T(s,{padding:{top:30,right:0,bottom:7,left:0},x:r,xDomain:[0,10],xRange:({height:d})=>[0,d/2],data:he,children:(d,n)=>{M(d,{children:(m,v)=>{var u=Za(),b=K(u);St(b,{});var f=y(b,2);Dt(f,{}),g(m,u)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(t),g($,t),B()}var ar=h('<div class="chart-container svelte-v4mhvr"><!></div>');function rr($,c){L(c,!1);const e="fruit",r="value";Ce.forEach(s=>{s[r]=+s[r]}),j();var o=ar(),t=C(o);T(t,{padding:{top:0,bottom:20,left:30},data:Ce,children:(s,d)=>{X(s,{children:(n,m)=>{Ye(n,{idKey:e,valueKey:r,fill:"#ff00cc",stroke:"#9f0080",textColor:"#61004e",textStroke:"#ffdbf8",textStrokeWidth:1})},$$slots:{default:!0}})},$$slots:{default:!0}}),D(o),g($,o),B()}const or=[{name:"Eve",parent:""},{name:"Cain",parent:"Eve"},{name:"Seth",parent:"Eve"},{name:"Enos",parent:"Seth"},{name:"Noam",parent:"Seth"},{name:"Abel",parent:"Eve"},{name:"Awan",parent:"Eve"},{name:"Enoch",parent:"Awan"},{name:"Azura",parent:"Eve"}];var sr=h('<div class="chart-container svelte-v4mhvr"><!></div>');function nr($){const c="name",e="parent";var r=sr(),o=C(r);T(o,{padding:{top:0,bottom:20,left:30},data:or,children:(t,s)=>{X(t,{children:(d,n)=>{Ye(d,{idKey:c,parentKey:e,spacing:5,sortBy:(m,v)=>v.depth-m.depth,labelVisibilityThreshold:m=>!1,stroke:"#00bbff"})},$$slots:{default:!0}})},$$slots:{default:!0}}),D(r),g($,r)}var lr=h('<div class="chart-container svelte-v4mhvr"><!></div>');function ir($){var c=lr(),e=C(c);T(e,{data:zt,children:(r,o)=>{M(r,{children:(t,s)=>{Kt(t,{colorNodes:d=>"#00bbff",colorLinks:d=>"#00bbff35"})},$$slots:{default:!0}})},$$slots:{default:!0}}),D(c),g($,c)}var cr=h("<!> <!> <!> <!>",1),dr=h("<!> <!>",1),vr=h("<!> <!>",1),fr=h('<div class="brushed-chart-container svelte-12vpq9d"><!></div> <div class="brush-container svelte-12vpq9d"><!></div>',1);function ur($,c){L(c,!1);let e=Y([null,null]);const r="myX",o="myY";O.forEach(u=>{u[o]=+u[o]});let t=Y();Z(()=>(l(t),l(e)),()=>{I(t,O.slice((l(e)[0]||0)*O.length,(l(e)[1]||1)*O.length)),l(t).length<2&&I(t,O.slice(l(e)[0]*O.length,l(e)[0]*O.length+2))}),fe(),j();var s=fr(),d=K(s),n=C(d);T(n,{padding:{bottom:20,left:25},x:r,y:o,yDomain:[0,null],get data(){return l(t)},children:(u,b)=>{M(u,{children:(f,a)=>{var i=cr(),p=K(i);N(p,{ticks:P=>{const S=P.filter(w=>w%1===0);return S.length>7?S.filter((w,E)=>E%2===0):S}});var x=y(p,2);W(x,{ticks:4});var _=y(x,2);te(_,{stroke:"#00e047"});var k=y(_,2);re(k,{fill:"#00e04710"}),g(f,i)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(d);var m=y(d,2),v=C(m);T(v,{padding:{top:5},x:r,y:o,yDomain:[0,null],data:O,children:(u,b)=>{var f=vr(),a=K(f);M(a,{children:(p,x)=>{var _=dr(),k=K(_);te(k,{stroke:"#00e047"});var P=y(k,2);re(P,{fill:"#00e04710"}),g(p,_)},$$slots:{default:!0}});var i=y(a,2);X(i,{children:(p,x)=>{Ie(p,{get min(){return l(e)[0]},set min(_){ie(e,l(e)[0]=_)},get max(){return l(e)[1]},set max(_){ie(e,l(e)[1]=_)},$$legacy:!0})},$$slots:{default:!0}}),g(u,f)},$$slots:{default:!0}}),D(m),g($,s),B()}var pr=h("<!> <!> <!> <!>",1),mr=h("<!> <!>",1),$r=h("<!> <!>",1),gr=h('<div class="chart-wrapper svelte-ypfvhs"><div class="chart-container svelte-ypfvhs"><!></div> <div class="brush-container svelte-ypfvhs"><!></div></div>');function hr($,c){L(c,!1);let e=q(c,"min",12,null),r=q(c,"max",12,null),o=q(c,"xKey",8,"x"),t=q(c,"yKey",8,"y"),s=q(c,"data",24,()=>[]),d=q(c,"stroke",8,"#00e047"),n=Y();Z(()=>(l(n),Q(s()),Q(e()),Q(r())),()=>{I(n,s().slice((e()||0)*s().length,(r()||1)*s().length)),l(n).length<2&&I(n,s().slice(e()*s().length,e()*s().length+2))}),fe(),j();var m=gr(),v=C(m),u=C(v);T(u,{padding:{bottom:20,left:25},get x(){return o()},get y(){return t()},yDomain:[0,null],get data(){return l(n)},children:(a,i)=>{M(a,{children:(p,x)=>{var _=pr(),k=K(_);N(k,{ticks:A=>{const R=A.filter(J=>J%1===0);return R.length>7?R.filter((J,H)=>H%2===0):R}});var P=y(k,2);W(P,{ticks:2});var S=y(P,2);te(S,{get stroke(){return d()}});var w=y(S,2),E=z(()=>`${d()}10`);re(w,{get fill(){return l(E)}}),g(p,_)},$$slots:{default:!0}})},$$slots:{default:!0}}),D(v);var b=y(v,2),f=C(b);T(f,{padding:{top:5},get x(){return o()},get y(){return t()},yDomain:[0,null],get data(){return s()},children:(a,i)=>{var p=$r(),x=K(p);M(x,{children:(k,P)=>{var S=mr(),w=K(S);te(w,{get stroke(){return d()}});var E=y(w,2),A=z(()=>`${d()}10`);re(E,{get fill(){return l(A)}}),g(k,S)},$$slots:{default:!0}});var _=y(x,2);X(_,{children:(k,P)=>{Ie(k,{get min(){return e()},set min(S){e(S)},get max(){return r()},set max(S){r(S)},$$legacy:!0})},$$slots:{default:!0}}),g(a,p)},$$slots:{default:!0}}),D(b),D(m),g($,m),B()}var yr=h('<div class="chart-container svelte-lbwmtv"></div>');function _r($){let c=Y([null,null]);const e="myX",r="myY",o=[O,qt,Ft,Jt];o.forEach(d=>{d.forEach(n=>{n[r]=+n[r]})});const t=["#00e047","#00bbff","#ff00cc","#ffcc00"];var s=yr();ue(s,5,()=>o,pe,(d,n,m)=>{hr(d,{get data(){return l(n)},xKey:e,yKey:r,get min(){return l(c)[0]},set min(v){ie(c,l(c)[0]=v)},get max(){return l(c)[1]},set max(v){ie(c,l(c)[1]=v)},get stroke(){return t[m]},$$legacy:!0})}),D(s),g($,s)}var br=h("<!> <!>",1),xr=h("<!> <!>",1),kr=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Pr($,c){L(c,!1);const e="Weight_in_lbs",r="Origin",o="Name",t=4,s=new Set,d=["#ccc","#fc0","#000"],n=Ct.map(f=>(s.add(f[r]),{[o]:f[o],[e]:+f[e],[r]:f[r]})),m=ee(",");j();var v=kr(),u=C(v),b=z(G);T(u,{padding:{bottom:15},x:e,z:r,get zScale(){return l(b)},zRange:d,data:n,children:ve,$$slots:{default:(f,a)=>{const i=z(()=>a.width);var p=xr(),x=K(p);M(x,{children:(k,P)=>{var S=br(),w=K(S);N(w,{baseline:!0,format:m,tickMarks:!0});var E=y(w,2),A=z(()=>l(i)<400?t/1.6:t);Et(E,{get r(){return l(A)},spacing:1,getTitle:R=>R.data[o]}),g(k,S)},$$slots:{default:!0}});var _=y(x,2);X(_,{pointerEvents:!1,children:(k,P)=>{Xe(k,{align:"end",shape:"circle",lookup:{USA:"U.S."}})},$$slots:{default:!0}}),g(f,p)}}}),D(v),g($,v),B()}var Sr=h("<!> <!>",1),Dr=h("<!> <!>",1),zr=h('<div class="chart-container svelte-v4mhvr"><!></div>');function Kr($,c){L(c,!1);const e="date_of_birth",r="gender",o="name",t=6,s=["#fc0","#000"],d=wt.map(u=>({[o]:u[o],[r]:u[r],[e]:+u[e].split("-")[0]}));j();var n=zr(),m=C(n),v=z(G);T(m,{padding:{bottom:15},x:e,z:r,get zScale(){return l(v)},zRange:s,data:d,children:ve,$$slots:{default:(u,b)=>{const f=z(()=>b.width);var a=Dr(),i=K(a);M(i,{children:(x,_)=>{var k=Sr(),P=K(k);N(P,{});var S=y(P,2),w=z(()=>l(f)<400?t/1.25:t);Tt(S,{get r(){return l(w)},strokeWidth:1,xStrength:.95,yStrength:.075,getTitle:E=>E[o]}),g(x,k)},$$slots:{default:!0}});var p=y(i,2);X(p,{pointerEvents:!1,children:(x,_)=>{Xe(x,{shape:"circle"})},$$slots:{default:!0}}),g(u,a)}}}),D(n),g($,n),B()}var Cr=h('<div class="input-container"><label class="svelte-11z1nx4"><input type="radio" class="svelte-11z1nx4">Group by category</label> <label class="svelte-11z1nx4"><input type="radio" class="svelte-11z1nx4">Clump together</label></div> <div class="chart-container svelte-11z1nx4"><!></div>',1);function Er($,c){L(c,!1);const e=[],r="category",o="value",t="category";let s=Y("true");const d=["#f0c","#0cf","#fc0"];let n=3,m=.1;j();var v=Cr(),u=K(v),b=C(u),f=C(b);oe(f),f.value=(f.__value="true")==null?"":"true",le(),D(b);var a=y(b,2),i=C(a);oe(i),i.value=(i.__value="false")==null?"":"false",le(),D(a),D(u);var p=y(u,2),x=C(p),_=z(V),k=z(G);T(x,{data:Mt,x:r,r:o,z:t,get xScale(){return l(_)},rRange:[3,12],get zScale(){return l(k)},zRange:d,children:(P,S)=>{M(P,{children:(w,E)=>{var A=z(()=>JSON.parse(l(s)));Lt(w,{manyBodyStrength:n,xStrength:m,get groupBy(){return l(A)},nodeStroke:"#000"})},$$slots:{default:!0}})},$$slots:{default:!0}}),D(p),de(e,[],f,()=>l(s),P=>I(s,P)),de(e,[],i,()=>l(s),P=>I(s,P)),g($,v),B()}const Ir=[{replPath:"ad32f9f301484d0cace82272126e9d09?version=3.46.2",title:"Line + area",slug:"Line",component:Zt},{replPath:"71cde05fa1e94583be57046207f72c02?version=3.46.2",title:"WebGL Scatter (svg axes, quadtree hover)",slug:"ScatterWebgl",component:Aa},{replPath:"14b8f866cc414a9ebdfbb5eaabf66ae2?version=3.46.2",title:"Map (svg, tooltip, pre-projected)",slug:"MapSvg",component:ia},{replPath:"a8135fcccf3d42e68b1f29be00fc72c6?version=3.46.2",title:"Multilayer map (canvas + svg)",slug:"MapLayered",component:Da},{replPath:"666164c95fb9441188aab2622a4e8547?version=3.46.2",title:"Column annotated",slug:"Column",component:fa},{replPath:"f38656e90d0644cfb460206005c492e5?version=3.46.2",title:"Stacked column",slug:"ColumnStacked",component:ha},{replPath:"91fe94cac36c4829903238382563bc81?version=3.46.2",title:"Bar",slug:"Bar",component:Ca},{replPath:"8d2e9a75cb0e4bf7abb86cb65915a93c?version=3.46.2",title:"Stacked bar",slug:"BarStacked",component:Ta},{replPath:"cc8d7b6ace40433da8d694f2877258a8?version=3.46.2",title:"Multiline (html labels + quadtree tooltip)",slug:"MultiLine",component:ka},{replPath:"e6ae831e723646c8a01a039b3eeb33cb?version=3.46.2",title:"Stacked area",slug:"AreaStacked",component:ma},{replPath:"d9a9c151058d4e3eb74a4eed60eabb54?version=3.46.2",title:"Scatter (svg + canvas + voronoi)",slug:"Scatter",component:oa},{replPath:"f9f33add37d440f78b24092c7ba8154d?version=3.46.2",title:"Cleveland dot plot",slug:"ClevelandDotPlot",component:Oa},{replPath:"fd96397862ff43e09fc8c83bfd818642?version=3.46.2",title:"Calendar (one cake per month)",slug:"Calendar",component:Va},{replPath:"2c5131bd0b694d54a6211b40afbd3c09?version=3.46.2",title:"Time of day plot",slug:"Timeplot",component:Qa},{replPath:"58a15bea15bd46ee8364409c15045a8b?version=3.46.2",title:"Histogram (variable bins)",slug:"Histogram",component:Ya},{replPath:"1c3297c4347248fc885b215f4907f8b2?version=3.46.2",title:"Small multiples (animated domain transition)",slug:"SmallMultiples",component:Ja},{replPath:"cb6bb95b7d1549f7be8d8fc7258ea1da?version=3.46.2",title:"Radar chart",slug:"Radar",component:tr},{replPath:"5d3d22482b3d400d96c88d7de7ff45b1?version=3.46.2",title:"Circle pack",slug:"CirclePack",component:rr},{replPath:"8ecba3df31e24658bf039a1a4d5daedc?version=3.46.2",title:"Nested circle pack",slug:"CirclePackNested",component:nr},{replPath:"0f7f35ffe2f14a25860772897f7a0b5c?version=3.46.2",title:"Sankey",slug:"Sankey",component:ir},{replPath:"4e7a8affd4724d03b33493c85e50471c?version=3.46.2",title:"Brush",slug:"Brush",component:ur},{replPath:"0eaf387a0a564971865fb6176f959940?version=3.46.2",title:"Synced brush",slug:"SyncedBrush",component:_r},{replPath:"132d2c81c3f841a0be0162443b008a92?version=3.46.2",title:"Beeswarm",slug:"Beeswarm",component:Pr},{replPath:"9d0e23f494f645b4a9623c46474462f6?version=3.46.2",title:"Beeswarm, force layout",slug:"BeeswarmForce",component:Kr},{replPath:"1879eb5e27f74784a69b65a11844f373?version=3.46.2",title:"Circle pack, force layout",slug:"CirclePackForce",component:Er}];export{Ir as e};
