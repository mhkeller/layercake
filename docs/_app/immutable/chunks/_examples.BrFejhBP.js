import{a as t,t as x,n as K,c as E,f as p,b as e,s as be,i as q}from"./disclose-version.DBj9Vt0q.js";import{p as A,a as j,h as f,s as Y,m as X,l as w,r as se,ak as Q,z as V,A as te,B as ue,x as ae,a4 as de}from"./runtime.D9nQNyi8.js";import{i as R}from"./lifecycle.fbi-k1SI.js";import{a0 as aa,K as W,L as M,W as B,N as oe,O as le,aa as Ae,Q as je,P as Re,f as re,R as Ne,M as J,S as xe,T as ve,U as Oe,V as ta,X as ra,Y as na,Z,_ as Ie,$ as H,y as We,a1 as oa,a2 as ee,a3 as ce,a4 as G,a5 as sa,a6 as la,a7 as ia,a8 as Ee,a9 as ca,ab as da,ac as va,ad as fa,ae as ua,af as ma,ag as ga,ah as pa,ai as ha,aj as _a,ak as ke,al as fe,am as ya,an as ba,p as $a,ao as Ye}from"./Brush.html.B0huZOBM.js";import{A as I,a as F,S as xa,b as Xe,V as ka,T as Sa,c as Pa,C as Da,d as _e,e as za,R as Ca,f as we,g as Fe,h as Ka,i as Ea,j as wa,B as Ta,K as Je,k as La,l as Ma,m as Ba,n as Aa}from"./dots.5PpzCDkg.js";import{i as ja}from"./if.CfD4apJF.js";import{e as me,i as ge,s as $e,r as ie}from"./class.ClfF0HVi.js";import{b as Ra,u as Te,g as Na,e as Oa,d as Le,c as Ia,t as Wa,a as Me,f as Ya,p as ye,h as Xa,i as Fa,j as Ja,k as Ua,l as Va,m as qa}from"./pointsFour.C3sqciNk.js";import{u as Ga,s as Be}from"./store.Co5usZpv.js";import{p as ne}from"./index-client.CFCBblPQ.js";function Ha(b,l,{domain:a,thresholds:s}={}){if(typeof b!="object")throw new TypeError("The first argument of bin() must be an array or data object");let v=Ra();if(l){const n=typeof l=="function"?l:d=>d[l];v=v.value(n)}return a&&(v=v.domain(a)),s&&(v=v.thresholds(s)),v(b)}function Se(b,l,{value:a,order:s,offset:v}={}){if(typeof b!="object")throw new TypeError("The first argument of stack() must be an array or data object");if(!Array.isArray(l))throw new TypeError("The second argument of stack() must be an array of key names");let n=aa().keys(l);return a&&(n=n.value(a)),s&&(n=n.order(s)),v&&(n=n.offset(v)),n(b)}function Qa(b,l,{groupTo:a="group",valueTo:s="value",keepKeys:v=void 0}={}){if(!Array.isArray(b))throw new TypeError("The first argument of groupLonger() must be an array of data");if(!Array.isArray(l))throw new TypeError("The second argument of groupLonger() must be an array of key names");const n=new Set(l),d=v||Object.keys(b[0]).filter(g=>!n.has(g));return l.map(g=>({[a]:g,values:b.map(i=>({...Object.fromEntries(d.map(_=>[_,i[_]])),[s]:i[g],[a]:g}))}))}var Za=x("<!> <!> <!> <!>",1),et=x('<div class="chart-container svelte-v4mhvr"><!></div>');function at(b,l){A(l,!1);const a="myX",s="myY";W.forEach(d=>{d[s]=+d[s]}),R();var v=et(),n=E(v);M(n,{padding:{top:8,right:10,bottom:20,left:25},x:a,y:s,yDomain:[0,null],data:W,children:(d,g)=>{var i=K(),_=p(i);B(_,{children:(m,y)=>{var k=Za(),u=p(k);I(u,{});var r=e(e(u,!0));F(r,{ticks:4});var c=e(e(r,!0));oe(c,{});var o=e(e(c,!0));le(o,{}),t(m,k)}}),t(d,i)}}),t(b,v),j()}var tt=x("<!> <!>",1),rt=x("<!> <!>",1),nt=x("<!> <!> <!>",1),ot=x('<div class="chart-container svelte-v4mhvr"><!></div>');function st(b,l){A(l,!1);const a="myX",s="myY";W.forEach(m=>{m[s]=+m[s]});const v=3,n=10,d="#fff";function g(m){console.log("dispatched event",m,m.detail)}R();var i=ot(),_=E(i);M(_,{padding:{top:10,right:5,bottom:20,left:25},x:a,y:s,xPadding:[n,n],yPadding:[n,n],data:W,children:(m,y)=>{var k=nt(),u=p(k);B(u,{children:(o,h)=>{var $=tt(),P=p($);I(P,{gridlines:!1});var S=e(e(P,!0));F(S,{gridlines:!1,ticks:4}),t(o,$)}});var r=e(e(u,!0));Ae(r,{children:(o,h)=>{var $=K(),P=p($);xa(P,{r:v*1.5,fill:"#0cf"}),t(o,$)}});var c=e(e(r,!0));B(c,{children:(o,h)=>{var $=rt(),P=p($);Xe(P,{r:v,fill:d});var S=e(e(P,!0));ka(S,{stroke:"#333",$$events:{"voronoi-mouseover":g}}),t(o,$)}}),t(m,k)}}),t(b,i),j()}var lt=x('<div class="row"><span> </span> </div>'),it=x("<!> <!>",1),ct=x('<div class="chart-container svelte-v4mhvr"><!></div>');function dt(b,l){A(l,!1);const a="myValue",s="name",v="name",n=new Map,d=je(Te,Te.objects.states),g=Na;Re.forEach(o=>{n.set(o[s],o)});let i=X(),_=X(!0);const m=d.features.map(o=>o.properties),y=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"],k=re(",");R();var u=ct(),r=E(u),c=w(xe);M(r,{data:d,z:o=>n.get(o[v])[a],get zScale(){return f(c)},zRange:y,flatData:m,children:(o,h)=>{var $=it(),P=p($);B(P,{children:(C,z)=>{var D=K(),L=p(D);Ne(L,{projection:g,$$events:{mousemove:T=>Y(i,Y(_,T)),mouseout:()=>Y(_,!0)}}),t(C,D)}});var S=e(e(P,!0));J(S,{pointerEvents:!1,children:(C,z)=>{var D=K(),L=p(D);ja(L,()=>f(_)!==!0,T=>{var O=K(),N=p(O);Sa(N,{get evt(){return f(i)},children:(U,pe)=>{const Pe=Q(()=>pe.detail);var De=K();const Ue=Q(()=>({...f(Pe).props,...n.get(f(Pe).props[v])}));var Ve=p(De);me(Ve,1,()=>Object.entries(f(Ue)),ge,(qe,ze,Lr)=>{let Ge=()=>V(V(ze))[0],he=()=>V(V(ze))[1];var Ce=lt();const He=Q(()=>Ge().replace(/^\w/,ea=>ea.toUpperCase()));var Ke=E(Ce),Qe=E(Ke),Ze=e(Ke,!0);se(()=>be(Ze,` ${q(typeof he()=="number"?k(he()):he())}`)),se(()=>be(Qe,`${q(f(He))}:`)),t(qe,Ce)}),t(U,De)}}),t(T,O)}),t(C,D)}}),t(o,$)}}),t(b,u),j()}var vt=x("<!> <!> <!>",1),ft=x("<!> <!> <!>",1),ut=x('<div class="chart-container svelte-v4mhvr"><!></div>');function mt(b,l){A(l,!1);const a="year",s="value",v=[{text:"Example text...",[a]:"1980",[s]:14,dx:15,dy:-5,arrows:[{clockwise:!1,source:{anchor:"left-bottom",dx:-2,dy:-7},target:{[a]:"1980",[s]:4.5,dx:2,dy:5}},{source:{anchor:"right-bottom",dy:-7,dx:5},target:{x:"68%",y:"48%"}}]}];ve.forEach(i=>{i[s]=+i[s]}),R();var n=ut(),d=E(n),g=w(()=>Z().paddingInner(.02).round(!0));M(d,{padding:{top:0,right:0,bottom:20,left:20},x:a,y:s,get xScale(){return f(g)},xDomain:["1979","1980","1981","1982","1983"],yDomain:[0,null],data:ve,children:(i,_)=>{var m=ft(),y=p(m);B(y,{children:(r,c)=>{var o=vt(),h=p(o);I(h,{gridlines:!1});var $=e(e(h,!0));F($,{snapBaselineLabel:!0});var P=e(e($,!0));Oe(P,{}),t(r,o)}});var k=e(e(y,!0));J(k,{children:(r,c)=>{var o=K(),h=p(o);ta(h,{annotations:v}),t(r,o)}});var u=e(e(k,!0));B(u,{children:(r,c)=>{var o=K(),h=p(o);ra(h,{annotations:v}),t(r,o)},$$slots:{defs:(r,c)=>{var o=K(),h=p(o);na(h,{}),t(r,o)}}}),t(i,m)}}),t(b,n),j()}var gt=x("<!> <!> <!>",1),pt=x('<div class="chart-container svelte-v4mhvr"><!></div>');function ht(b,l){A(l,!1);const a="month",s=[0,1],v="key",n=Ie("%Y-%m-%d"),d=Object.keys(H[0]).filter(c=>c!==a),g=["#ff00cc","#ff7ac7","#ffb3c0","#ffe4b8"],i=We("%b. %-d"),_=c=>re("~s")(c);H.forEach(c=>{c[a]=typeof c[a]=="string"?n(c[a]):c[a],d.forEach(o=>{c[o]=+c[o]})});const m=Se(H,d);R();var y=pt(),k=E(y),u=w(ee),r=w(()=>ce(m));M(k,{padding:{top:0,right:0,bottom:20,left:17},x:c=>c.data[a],y:s,z:v,get zScale(){return f(u)},zDomain:d,zRange:g,get flatData(){return f(r)},data:m,children:(c,o)=>{var h=K(),$=p(h);B($,{children:(P,S)=>{var C=gt(),z=p(C);I(z,{format:i,tickMarks:!0});var D=e(e(z,!0));F(D,{format:_});var L=e(e(D,!0));oa(L,{}),t(P,C)}}),t(c,h)}}),t(b,y),j()}var _t=x("<!> <!> <!>",1),yt=x('<div class="chart-container svelte-v4mhvr"><!></div>');function bt(b,l){A(l,!1);const a="year",s=[0,1],v="key",n=Object.keys(G[0]).filter(r=>r!==a),d=["#00e047","#7ceb68","#b7f486","#ecfda5"];G.forEach(r=>{n.forEach(c=>{r[c]=+r[c]})});const g=r=>re("~s")(r),i=Se(G,n);R();var _=yt(),m=E(_),y=w(()=>Z().paddingInner(.02).round(!0)),k=w(ee),u=w(()=>ce(i));M(m,{padding:{top:0,right:0,bottom:20,left:20},x:r=>r.data[a],y:s,z:v,get xScale(){return f(y)},xDomainSort:!1,get zScale(){return f(k)},zDomain:n,zRange:d,get flatData(){return f(u)},data:i,children:(r,c)=>{var o=K(),h=p(o);B(h,{children:($,P)=>{var S=_t(),C=p(S);I(C,{gridlines:!1});var z=e(e(C,!0));F(z,{ticks:4,gridlines:!1,format:g});var D=e(e(z,!0));sa(D,{}),t($,S)}}),t(r,o)}}),t(b,_),j()}var $t=x("<!> <!> <!>",1),xt=x("<!> <!>",1),kt=x("<!> <!>",1),St=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Pt(b,l){A(l,!1);const a="month",s="value",v="fruit",n=Ie("%Y-%m-%d"),d=Object.keys(H[0]).filter(c=>c!==a),g=["#ffe4b8","#ffb3c0","#ff7ac7","#ff00cc"];H.forEach(c=>{c[a]=typeof c[a]=="string"?n(c[a]):c[a],d.forEach(o=>{c[o]=+c[o]})});const i=We("%b. %e"),_=c=>re("~s")(c),m=Qa(H,d,{groupTo:v,valueTo:s});R();var y=St(),k=E(y),u=w(ee),r=w(()=>ce(m,"values"));M(k,{padding:{top:7,right:10,bottom:20,left:25},x:a,y:s,z:v,yDomain:[0,null],get zScale(){return f(u)},zRange:g,get flatData(){return f(r)},data:m,children:(c,o)=>{var h=kt(),$=p(h);B($,{children:(S,C)=>{var z=$t(),D=p(z),L=w(()=>H.map(N=>N[a]).sort((N,U)=>N-U));I(D,{gridlines:!1,get ticks(){return f(L)},format:i,snapLabels:!0,tickMarks:!0});var T=e(e(D,!0));F(T,{ticks:4,format:_});var O=e(e(T,!0));la(O,{}),t(S,z)}});var P=e(e($,!0));J(P,{children:(S,C)=>{var z=xt(),D=p(z);ia(D,{});var L=e(e(D,!0));Pa(L,{formatTitle:i,dataset:H}),t(S,z)}}),t(c,h)}}),t(b,y),j()}var Dt=x("<!> <!> <!>",1),zt=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Ct(b,l){A(l,!1);const a="myValue",s="center",v="abbr",n=je(Ee,Ee.objects.collection),d=fa,g="name",i="name",_=new Map;Re.forEach(h=>{_.set(h[g],h[a])});const m=["VT","MD","NJ","RI","DC","DE","WV","MA","CT","NH"],y=ca.filter(h=>!m.includes(h[v])),k=n.features.map(h=>h.properties),u=["#ffdecc","#ffc09c","#ffa06b","#ff7a33"];R();var r=zt(),c=E(r),o=w(xe);M(c,{data:n,z:h=>_.get(h[i]),get zScale(){return f(o)},zRange:u,flatData:k,children:(h,$)=>{var P=Dt(),S=p(P);Ae(S,{children:(D,L)=>{var T=K(),O=p(T);da(O,{projection:d,fill:"#fff"}),t(D,T)}});var C=e(e(S,!0));B(C,{children:(D,L)=>{var T=K(),O=p(T),N=w(()=>n.features.slice(40,50));Ne(O,{projection:d,get features(){return f(N)}}),t(D,T)}});var z=e(e(C,!0));J(z,{pointerEvents:!1,children:(D,L)=>{var T=K(),O=p(T);va(O,{projection:d,features:y,getCoordinates:N=>N[s],getLabel:N=>N[v]}),t(D,T)}}),t(h,P)}}),t(b,r),j()}var Kt=x("<!> <!> <!>",1),Et=x('<div class="chart-container svelte-v4mhvr"><!></div>');function wt(b,l){A(l,!1);const a="value",s="year";ve.forEach(g=>{g[a]=+g[a]}),R();var v=Et(),n=E(v),d=w(()=>Z().paddingInner(.05));M(n,{padding:{bottom:20,left:35},x:a,y:s,get yScale(){return f(d)},xDomain:[0,null],data:ve,children:(g,i)=>{var _=K(),m=p(_);B(m,{children:(y,k)=>{var u=Kt(),r=p(u);I(r,{tickMarks:!0,baseline:!0,snapLabels:!0});var c=e(e(r,!0));F(c,{tickMarks:!0,gridlines:!1});var o=e(e(c,!0));ua(o,{}),t(y,u)}}),t(g,_)}}),t(b,v),j()}var Tt=x("<!> <!> <!>",1),Lt=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Mt(b,l){A(l,!1);const a=[0,1],s="year",v="key",n=Object.keys(G[0]).filter(r=>r!==s),d=["#00bbff","#8bcef6","#c4e2ed","#f7f6e3"];G.forEach(r=>{n.forEach(c=>{r[c]=+r[c]})});const g=r=>re("~s")(r),i=Se(G,n);R();var _=Lt(),m=E(_),y=w(()=>Z().paddingInner(.05)),k=w(ee),u=w(()=>ce(i));M(m,{padding:{top:0,bottom:20,left:35},x:a,y:r=>r.data[s],z:v,get yScale(){return f(y)},get zScale(){return f(k)},zDomain:n,zRange:d,get flatData(){return f(u)},data:i,children:(r,c)=>{var o=K(),h=p(o);B(h,{children:($,P)=>{var S=Tt(),C=p(S);I(C,{baseline:!0,snapLabels:!0,format:g});var z=e(e(C,!0));F(z,{gridlines:!1});var D=e(e(z,!0));ma(D,{}),t($,S)}}),t(r,o)}}),t(b,_),j()}var Bt=x("<!> <!>",1),At=x('<div class="circle svelte-d2cww5"></div>'),jt=x("<!> <!> <!>",1),Rt=x('<div class="chart-container svelte-d2cww5"><!></div>');function Nt(b,l){A(l,!1);const a="myX",s="myY",v=3,n=6;W.forEach(i=>{i[s]=+i[s]}),R();var d=Rt(),g=E(d);M(g,{padding:{top:5,right:5,bottom:20,left:25},x:a,y:s,xPadding:[n,n],yPadding:[n,n],data:W,children:(i,_)=>{var m=jt(),y=p(m);B(y,{children:(r,c)=>{var o=Bt(),h=p(o);I(h,{});var $=e(e(h,!0));F($,{tickMarks:!1,ticks:5}),t(r,o)}});var k=e(e(y,!0));ga(k,{children:(r,c)=>{var o=K(),h=p(o);pa(h,{r:v}),t(r,o)}});var u=e(e(k,!0));J(u,{children:(r,c)=>{var o=K(),h=p(o);ha(h,{children:($,P)=>{const S=Q(()=>P.x),C=Q(()=>P.y),z=Q(()=>P.visible);var D=At();se(()=>$e(D,"style",`top:${q(f(C))}px;left:${q(f(S))}px;display: ${q(f(z)?"block":"none")};`)),t($,D)}}),t(r,o)}}),t(i,m)}}),t(b,d),j()}var Ot=x("<!> <!> <!>",1),It=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Wt(b,l){A(l,!1);const a="year",s=Object.keys(G[0]).filter(_=>_!==a),v=["#f0c","#00bbff","#00e047","#ff7a33"];G.forEach(_=>{s.forEach(m=>{_[m]=+_[m]})}),R();var n=It(),d=E(n),g=w(()=>Z().paddingInner(.05).round(!0)),i=w(ee);M(d,{padding:{right:10,bottom:20,left:30},x:s,y:a,get yScale(){return f(g)},xDomain:[0,null],xPadding:[10,0],get zScale(){return f(i)},zDomain:s,zRange:v,data:G,children:(_,m)=>{var y=K(),k=p(y);B(k,{children:(u,r)=>{var c=Ot(),o=p(c);I(o,{});var h=e(e(o,!0));F(h,{gridlines:!1});var $=e(e(h,!0));Da($,{}),t(u,c)}}),t(_,y)}}),t(b,n),j()}var Yt=x("<!> <!> <!>",1),Xt=x('<div class="input-container" style="position: absolute;right:10px;z-index: 9;"><input style="margin:0;" type="range" min="4" max="100" step="4" class="svelte-v09z8s"> <span class="counter-container" style="display:inline-block;vertical-align:top;width: 70px;text-align:right;"> </span></div> <div class="chart-container svelte-v09z8s"><!></div>',1);function Ft(b,l){A(l,!1);const a=X(),s=X(),v=X(),n=re(".2f"),d=["x0","x1"],g="length";let i=X(40);const _=Oa(Le);te(()=>f(i),()=>{Y(a,Ia(_,f(i)))}),te(()=>f(a),()=>{Y(s,Wa(f(a),5))}),te(()=>f(a),()=>{Y(v,Ha(Le,$=>$,{domain:_,thresholds:f(a)}))}),ue(),R();var m=Xt(),y=p(m),k=E(y);ie(k);var u=e(e(k,!0)),r=E(u),c=e(e(y,!0)),o=E(c),h=w(()=>Z().paddingInner(0));M(o,{padding:{top:20,right:5,bottom:20,left:30},x:d,y:g,get xDomain(){return f(a)},get xScale(){return f(h)},yDomain:[0,null],get data(){return f(v)},children:($,P)=>{var S=K(),C=p(S);B(C,{children:(z,D)=>{var L=Yt(),T=p(L);I(T,{gridlines:!1,baseline:!0,get ticks(){return f(s)},format:U=>+n(U)});var O=e(e(T,!0));F(O,{gridlines:!1,ticks:3});var N=e(e(O,!0));Oe(N,{fill:"#fff",stroke:"#000",strokeWidth:1}),t(z,L)}}),t($,S)}}),se(()=>be(r,`${q(f(i))} bins`)),_a(k,()=>f(i),$=>Y(i,$)),t(b,m),j()}function Jt(b,l){A(l,!1);const a={};Ga(a);const s=()=>Be(d,"$xDomain",a),v=()=>Be(g,"$yDomain",a),n={duration:300,easing:Ya},d=Me(void 0,n),g=Me(void 0,n),i=ke(l.data,l.extentGetters);te(()=>(ae(l.scale),ae(l.fullExtents)),()=>{d.set(l.scale==="shared"?l.fullExtents.x:i.x)}),te(()=>(ae(l.scale),ae(l.fullExtents)),()=>{g.set(l.scale==="shared"?l.fullExtents.y:i.y)}),ue(),R();var _=K(),m=p(_);M(m,{padding:{top:2,right:6,bottom:2,left:6},get x(){return l.extentGetters.x},get y(){return l.extentGetters.y},get data(){return l.data},get xDomain(){return s()},get yDomain(){return v()},children:(y,k)=>{var u=K(),r=p(u);B(r,{children:(c,o)=>{var h=K(),$=p(h);oe($,{stroke:"#000"}),t(c,h)}}),t(y,u)}}),t(b,_),j()}var Ut=x('<div class="small-multiple-container svelte-1xmktbf"><!></div>'),Vt=x('<div class="input-container svelte-1xmktbf"><label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Individual scale</label> <label class="svelte-1xmktbf"><input type="radio" class="svelte-1xmktbf">Shared scale</label></div> <div class="group-container svelte-1xmktbf"></div>',1);function qt(b,l){A(l,!1);const a=[],s={x:u=>u.x,y:u=>u.y},v=ke(ce(ye),s);ye.sort((u,r)=>r[r.length-1].y-u[u.length-1].y);let n=X("individual");R();var d=Vt(),g=p(d),i=E(g),_=E(i);ie(_),_.value=(_.__value="individual")==null?"":"individual";var m=e(e(i,!0)),y=E(m);ie(y),y.value=(y.__value="shared")==null?"":"shared";var k=e(e(g,!0));me(k,9,()=>ye,ge,(u,r,c)=>{var o=Ut(),h=E(o);Jt(h,{get data(){return V(r)},fullExtents:v,get scale(){return f(n)},extentGetters:s}),t(u,o)}),fe(a,[],_,()=>f(n),u=>Y(n,u)),fe(a,[],y,()=>f(n),u=>Y(n,u)),t(b,d),j()}var Gt=x('<div class="chart-container svelte-1lqvxpk"><!></div>');function Ht(b,l){A(l,!1);const a=["January","February","March","April","May","June","July","August","September","October","November","December"],s=Xa.map(m=>(m.date=new Date(m.timestring),m)),v=10,n=["#fff5cc","#ffeba9","#ffe182","#ffd754","#ffcc00"],d=ya().key(m=>m.date.getUTCMonth()).key(m=>m.timestring.split("T")[0]).entries(s),g=X(d.sort((m,y)=>m.key-y.key));R();var i=K(),_=p(i);me(_,1,()=>f(g),ge,(m,y,k)=>{var u=Gt(),r=E(u),c=w(xe);M(r,{padding:{top:1,right:1,bottom:1,left:1},x:"key",z:o=>o.values.length,get zScale(){return f(c)},zRange:n,get data(){return V(y).values},children:(o,h)=>{var $=K(),P=p($);B(P,{children:(S,C)=>{var z=K(),D=p(z);ba(D,{}),t(S,z)}}),t(o,$)}}),se(()=>{$e(u,"style",`width:calc(${q(100/f(g).length)}% - ${q(v)}px);${q(V(k)===0?`margin-right:${v*2}px`:"")}`),$e(u,"data-month",a[+V(y).key+1])}),t(m,u)}),t(b,i),j()}var Qt=x("<!> <!> <!>",1),Zt=x('<div class="chart-container svelte-v4mhvr"><!></div>');function er(b,l){A(l,!1);const a="seconds",s="day",v=4,n=Fa.map(r=>{const c=r.timestring.split("T"),o=c[1].replace("Z","").split(":").map(h=>+h);return r[a]=o[0]*60*60+o[1]*60+o[2],r[s]=c[0],r}),d=ke(n,{x:r=>r.timestring}),g=d.x[0].toString().split("T")[0].split("-").map(r=>+r),i=d.x[1].toString().split("T")[0].split("-").map(r=>+r),_=$a.range(new Date(Date.UTC(g[0],g[1]-1,g[2])),new Date(Date.UTC(i[0],i[1]-1,i[2]+1))).map(r=>r.toISOString().split("T")[0]).sort();R();var m=Zt(),y=E(m),k=w(Ja),u=w(()=>Z().paddingInner(.05).round(!0));M(y,{padding:{top:0,right:15,bottom:20,left:75},x:a,y:s,xDomain:[0,24*60*60],yDomain:_,get xScale(){return f(k)},get yScale(){return f(u)},data:n,children:(r,c)=>{var o=K(),h=p(o);B(h,{children:($,P)=>{var S=Qt(),C=p(S),z=w(()=>[0,4,8,12,16,20,24].map(T=>T*60*60));I(C,{get ticks(){return f(z)},format:T=>`${Math.floor(T/60/60)}:00`});var D=e(e(C,!0));F(D,{});var L=e(e(D,!0));Xe(L,{r:v,fill:"rgba(255, 204, 0, 0.75)"}),t($,S)}}),t(r,o)}}),t(b,m),j()}var ar=x("<!> <!>",1),tr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function rr(b,l){A(l,!1);const a="name",s=["fastball","change","slider","cutter","curve"],v=Object.keys(_e[0]).filter(g=>g!==a);_e.forEach(g=>{v.forEach(i=>{g[i]=+g[i]})}),R();var n=tr(),d=E(n);M(d,{padding:{top:30,right:0,bottom:7,left:0},x:s,xDomain:[0,10],xRange:({height:g})=>[0,g/2],data:_e,children:(g,i)=>{var _=K(),m=p(_);B(m,{children:(y,k)=>{var u=ar(),r=p(u);za(r,{});var c=e(e(r,!0));Ca(c,{}),t(y,u)}}),t(g,_)}}),t(b,n),j()}var nr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function or(b,l){A(l,!1);const a="fruit",s="value";we.forEach(d=>{d[s]=+d[s]}),R();var v=nr(),n=E(v);M(n,{padding:{top:0,bottom:20,left:30},data:we,children:(d,g)=>{var i=K(),_=p(i);J(_,{children:(m,y)=>{var k=K(),u=p(k);Fe(u,{idKey:a,valueKey:s,fill:"#ff00cc",stroke:"#9f0080",textColor:"#61004e",textStroke:"#ffdbf8",textStrokeWidth:1}),t(m,k)}}),t(d,i)}}),t(b,v),j()}const sr=[{name:"Eve",parent:""},{name:"Cain",parent:"Eve"},{name:"Seth",parent:"Eve"},{name:"Enos",parent:"Seth"},{name:"Noam",parent:"Seth"},{name:"Abel",parent:"Eve"},{name:"Awan",parent:"Eve"},{name:"Enoch",parent:"Awan"},{name:"Azura",parent:"Eve"}];var lr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function ir(b){const l="name",a="parent";var s=lr(),v=E(s);M(v,{padding:{top:0,bottom:20,left:30},data:sr,children:(n,d)=>{var g=K(),i=p(g);J(i,{children:(_,m)=>{var y=K(),k=p(y);Fe(k,{idKey:l,parentKey:a,spacing:5,sortBy:(u,r)=>r.depth-u.depth,labelVisibilityThreshold:u=>!1,stroke:"#00bbff"}),t(_,y)}}),t(n,g)}}),t(b,s)}var cr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function dr(b){var l=cr(),a=E(l);M(a,{data:Ka,children:(s,v)=>{var n=K(),d=p(n);B(d,{children:(g,i)=>{var _=K(),m=p(_);Ea(m,{colorNodes:y=>"#00bbff",colorLinks:y=>"#00bbff35"}),t(g,_)}}),t(s,n)}}),t(b,l)}var vr=x("<!> <!> <!> <!>",1),fr=x("<!> <!>",1),ur=x("<!> <!>",1),mr=x('<div class="brushed-chart-container svelte-12vpq9d"><!></div> <div class="brush-container svelte-12vpq9d"><!></div>',1);function gr(b,l){A(l,!1);let a=X([null,null]);const s="myX",v="myY";W.forEach(y=>{y[v]=+y[v]});let n=X();te(()=>(f(n),f(a)),()=>{Y(n,W.slice((f(a)[0]||0)*W.length,(f(a)[1]||1)*W.length)),f(n).length<2&&Y(n,W.slice(f(a)[0]*W.length,f(a)[0]*W.length+2))}),ue(),R();var d=mr(),g=p(d),i=E(g);M(i,{padding:{bottom:20,left:25},x:s,y:v,yDomain:[0,null],get data(){return f(n)},children:(y,k)=>{var u=K(),r=p(u);B(r,{children:(c,o)=>{var h=vr(),$=p(h);I($,{ticks:z=>{const D=z.filter(L=>L%1===0);return D.length>7?D.filter((L,T)=>T%2===0):D}});var P=e(e($,!0));F(P,{ticks:4});var S=e(e(P,!0));oe(S,{stroke:"#00e047"});var C=e(e(S,!0));le(C,{fill:"#00e04710"}),t(c,h)}}),t(y,u)}});var _=e(e(g,!0)),m=E(_);M(m,{padding:{top:5},x:s,y:v,yDomain:[0,null],data:W,children:(y,k)=>{var u=ur(),r=p(u);B(r,{children:(o,h)=>{var $=fr(),P=p($);oe(P,{stroke:"#00e047"});var S=e(e(P,!0));le(S,{fill:"#00e04710"}),t(o,$)}});var c=e(e(r,!0));J(c,{children:(o,h)=>{var $=K(),P=p($);Ye(P,{get min(){return f(a)[0]},set min(S){de(a,f(a)[0]=S)},get max(){return f(a)[1]},set max(S){de(a,f(a)[1]=S)}}),t(o,$)}}),t(y,u)}}),t(b,d),j()}var pr=x("<!> <!> <!> <!>",1),hr=x("<!> <!>",1),_r=x("<!> <!>",1),yr=x('<div class="chart-wrapper svelte-ypfvhs"><div class="chart-container svelte-ypfvhs"><!></div> <div class="brush-container svelte-ypfvhs"><!></div></div>');function br(b,l){A(l,!1);let a=ne(l,"min",4,null),s=ne(l,"max",4,null),v=ne(l,"xKey",0,"x"),n=ne(l,"yKey",0,"y"),d=ne(l,"data",8,()=>[]),g=ne(l,"stroke",0,"#00e047"),i=X();te(()=>(f(i),ae(d()),ae(a()),ae(s())),()=>{Y(i,d().slice((a()||0)*d().length,(s()||1)*d().length)),f(i).length<2&&Y(i,d().slice(a()*d().length,a()*d().length+2))}),ue(),R();var _=yr(),m=E(_),y=E(m);M(y,{padding:{bottom:20,left:25},get x(){return v()},get y(){return n()},yDomain:[0,null],get data(){return f(i)},children:(r,c)=>{var o=K(),h=p(o);B(h,{children:($,P)=>{var S=pr(),C=p(S);I(C,{ticks:O=>{const N=O.filter(U=>U%1===0);return N.length>7?N.filter((U,pe)=>pe%2===0):N}});var z=e(e(C,!0));F(z,{ticks:2});var D=e(e(z,!0));oe(D,{get stroke(){return g()}});var L=e(e(D,!0)),T=w(()=>`${g()}10`);le(L,{get fill(){return f(T)}}),t($,S)}}),t(r,o)}});var k=e(e(m,!0)),u=E(k);M(u,{padding:{top:5},get x(){return v()},get y(){return n()},yDomain:[0,null],get data(){return d()},children:(r,c)=>{var o=_r(),h=p(o);B(h,{children:(P,S)=>{var C=hr(),z=p(C);oe(z,{get stroke(){return g()}});var D=e(e(z,!0)),L=w(()=>`${g()}10`);le(D,{get fill(){return f(L)}}),t(P,C)}});var $=e(e(h,!0));J($,{children:(P,S)=>{var C=K(),z=p(C);Ye(z,{get min(){return a()},set min(D){a(D)},get max(){return s()},set max(D){s(D)}}),t(P,C)}}),t(r,o)}}),t(b,_),j()}var $r=x('<div class="chart-container svelte-lbwmtv"></div>');function xr(b){let l=X([null,null]);const a="myX",s="myY",v=X([W,Ua,Va,qa]);f(v).forEach(g=>{g.forEach(i=>{i[s]=+i[s]})});const n=["#00e047","#00bbff","#ff00cc","#ffcc00"];var d=$r();me(d,9,()=>f(v),ge,(g,i,_)=>{var m=K(),y=p(m);br(y,{get data(){return V(i)},xKey:a,yKey:s,get min(){return f(l)[0]},set min(k){de(l,f(l)[0]=k)},get max(){return f(l)[1]},set max(k){de(l,f(l)[1]=k)},get stroke(){return n[V(_)]}}),t(g,m)}),t(b,d)}var kr=x("<!> <!>",1),Sr=x("<!> <!>",1),Pr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Dr(b,l){A(l,!1);const a="Weight_in_lbs",s="Origin",v="Name",n=4,d=new Set,g=["#ccc","#fc0","#000"],i=wa.map(u=>(d.add(u[s]),{[v]:u[v],[a]:+u[a],[s]:u[s]})),_=re(",");R();var m=Pr(),y=E(m),k=w(ee);M(y,{padding:{bottom:15},x:a,z:s,get zScale(){return f(k)},zRange:g,data:i,children:(u,r)=>{const c=Q(()=>r.width);var o=Sr(),h=p(o);B(h,{children:(P,S)=>{var C=kr(),z=p(C);I(z,{baseline:!0,format:_,tickMarks:!0});var D=e(e(z,!0)),L=w(()=>f(c)<400?n/1.6:n);Ta(D,{get r(){return f(L)},spacing:1,getTitle:T=>T.data[v]}),t(P,C)}});var $=e(e(h,!0));J($,{pointerEvents:!1,children:(P,S)=>{var C=K(),z=p(C);Je(z,{align:"end",shape:"circle",lookup:{USA:"U.S."}}),t(P,C)}}),t(u,o)}}),t(b,m),j()}var zr=x("<!> <!>",1),Cr=x("<!> <!>",1),Kr=x('<div class="chart-container svelte-v4mhvr"><!></div>');function Er(b,l){A(l,!1);const a="date_of_birth",s="gender",v="name",n=6,d=["#fc0","#000"],g=La.map(y=>({[v]:y[v],[s]:y[s],[a]:+y[a].split("-")[0]}));R();var i=Kr(),_=E(i),m=w(ee);M(_,{padding:{bottom:15},x:a,z:s,get zScale(){return f(m)},zRange:d,data:g,children:(y,k)=>{const u=Q(()=>k.width);var r=Cr(),c=p(r);B(c,{children:(h,$)=>{var P=zr(),S=p(P);I(S,{});var C=e(e(S,!0)),z=w(()=>f(u)<400?n/1.25:n);Ma(C,{get r(){return f(z)},strokeWidth:1,xStrength:.95,yStrength:.075,getTitle:D=>D[v]}),t(h,P)}});var o=e(e(c,!0));J(o,{pointerEvents:!1,children:(h,$)=>{var P=K(),S=p(P);Je(S,{shape:"circle"}),t(h,P)}}),t(y,r)}}),t(b,i),j()}var wr=x('<div class="input-container"><label class="svelte-11z1nx4"><input type="radio" class="svelte-11z1nx4">Group by category</label> <label class="svelte-11z1nx4"><input type="radio" class="svelte-11z1nx4">Clump together</label></div> <div class="chart-container svelte-11z1nx4"><!></div>',1);function Tr(b,l){A(l,!1);const a=[],s="category",v="value",n="category";let d=X("true");const g=["#f0c","#0cf","#fc0"];let i=3,_=.1;R();var m=wr(),y=p(m),k=E(y),u=E(k);ie(u),u.value=(u.__value="true")==null?"":"true";var r=e(e(k,!0)),c=E(r);ie(c),c.value=(c.__value="false")==null?"":"false";var o=e(e(y,!0)),h=E(o),$=w(Z),P=w(ee);M(h,{data:Ba,x:s,r:v,z:n,get xScale(){return f($)},rRange:[3,12],get zScale(){return f(P)},zRange:g,children:(S,C)=>{var z=K(),D=p(z);B(D,{children:(L,T)=>{var O=K(),N=p(O),U=w(()=>JSON.parse(f(d)));Aa(N,{manyBodyStrength:i,xStrength:_,get groupBy(){return f(U)},nodeStroke:"#000"}),t(L,O)}}),t(S,z)}}),fe(a,[],u,()=>f(d),S=>Y(d,S)),fe(a,[],c,()=>f(d),S=>Y(d,S)),t(b,m),j()}const Xr=[{replPath:"ad32f9f301484d0cace82272126e9d09?version=3.46.2",title:"Line + area",slug:"Line",component:at},{replPath:"71cde05fa1e94583be57046207f72c02?version=3.46.2",title:"WebGL Scatter (svg axes, quadtree hover)",slug:"ScatterWebgl",component:Nt},{replPath:"14b8f866cc414a9ebdfbb5eaabf66ae2?version=3.46.2",title:"Map (svg, tooltip, pre-projected)",slug:"MapSvg",component:dt},{replPath:"a8135fcccf3d42e68b1f29be00fc72c6?version=3.46.2",title:"Multilayer map (canvas + svg)",slug:"MapLayered",component:Ct},{replPath:"666164c95fb9441188aab2622a4e8547?version=3.46.2",title:"Column annotated",slug:"Column",component:mt},{replPath:"f38656e90d0644cfb460206005c492e5?version=3.46.2",title:"Stacked column",slug:"ColumnStacked",component:bt},{replPath:"91fe94cac36c4829903238382563bc81?version=3.46.2",title:"Bar",slug:"Bar",component:wt},{replPath:"8d2e9a75cb0e4bf7abb86cb65915a93c?version=3.46.2",title:"Stacked bar",slug:"BarStacked",component:Mt},{replPath:"cc8d7b6ace40433da8d694f2877258a8?version=3.46.2",title:"Multiline (html labels + quadtree tooltip)",slug:"MultiLine",component:Pt},{replPath:"e6ae831e723646c8a01a039b3eeb33cb?version=3.46.2",title:"Stacked area",slug:"AreaStacked",component:ht},{replPath:"d9a9c151058d4e3eb74a4eed60eabb54?version=3.46.2",title:"Scatter (svg + canvas + voronoi)",slug:"Scatter",component:st},{replPath:"f9f33add37d440f78b24092c7ba8154d?version=3.46.2",title:"Cleveland dot plot",slug:"ClevelandDotPlot",component:Wt},{replPath:"fd96397862ff43e09fc8c83bfd818642?version=3.46.2",title:"Calendar (one cake per month)",slug:"Calendar",component:Ht},{replPath:"2c5131bd0b694d54a6211b40afbd3c09?version=3.46.2",title:"Time of day plot",slug:"Timeplot",component:er},{replPath:"58a15bea15bd46ee8364409c15045a8b?version=3.46.2",title:"Histogram (variable bins)",slug:"Histogram",component:Ft},{replPath:"1c3297c4347248fc885b215f4907f8b2?version=3.46.2",title:"Small multiples (animated domain transition)",slug:"SmallMultiples",component:qt},{replPath:"cb6bb95b7d1549f7be8d8fc7258ea1da?version=3.46.2",title:"Radar chart",slug:"Radar",component:rr},{replPath:"5d3d22482b3d400d96c88d7de7ff45b1?version=3.46.2",title:"Circle pack",slug:"CirclePack",component:or},{replPath:"8ecba3df31e24658bf039a1a4d5daedc?version=3.46.2",title:"Nested circle pack",slug:"CirclePackNested",component:ir},{replPath:"0f7f35ffe2f14a25860772897f7a0b5c?version=3.46.2",title:"Sankey",slug:"Sankey",component:dr},{replPath:"4e7a8affd4724d03b33493c85e50471c?version=3.46.2",title:"Brush",slug:"Brush",component:gr},{replPath:"0eaf387a0a564971865fb6176f959940?version=3.46.2",title:"Synced brush",slug:"SyncedBrush",component:xr},{replPath:"132d2c81c3f841a0be0162443b008a92?version=3.46.2",title:"Beeswarm",slug:"Beeswarm",component:Dr},{replPath:"9d0e23f494f645b4a9623c46474462f6?version=3.46.2",title:"Beeswarm, force layout",slug:"BeeswarmForce",component:Er},{replPath:"1879eb5e27f74784a69b65a11844f373?version=3.46.2",title:"Circle pack, force layout",slug:"CirclePackForce",component:Tr}];export{Xr as e};
