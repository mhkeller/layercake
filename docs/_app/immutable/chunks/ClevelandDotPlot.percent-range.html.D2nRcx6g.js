import{a as w,n as Lt,d as ht,t as R,s as lt,e as mt}from"./disclose-version.CmtI0EPl.js";import{p as et,aN as at,Q as T,R as ot,t as j,a as it,c as D,f as ct,r as U,s as H,K as P,w as t,P as p,v as $,N as d,aO as pt}from"./runtime.B3Do0ZXm.js";import{i as tt}from"./if.DMXaGV_-.js";import{s as ft,a as m,q as jt,f as Rt}from"./Brush.html.DSgXU-YJ.js";import{s as F,e as dt,a as kt,t as Mt,i as xt}from"./class.B1rLQBbq.js";import{p as a,b as Ct}from"./index-client.CfugqxwE.js";import{i as st}from"./lifecycle.B5gl02A_.js";import{s as nt,a as o}from"./store.C8KVTQwS.js";var Bt=R("<title> </title>"),zt=Lt('<svg preserveAspectRatio="none" style="right:0px; bottom:0px;" class="svelte-6sm8ei"><!><defs><!></defs><!></svg>');function le(W,e){et(e,!1);const l=nt(),_=()=>o(s,"$padding",l),{padding:s}=at("LayerCake");let f=a(e,"element",12,void 0),x=a(e,"zIndex",8,void 0),h=a(e,"pointerEvents",8,void 0),u=a(e,"fixedAspectRatio",8,1),v=a(e,"viewBox",28,()=>`0 0 100 ${100/u()}`),B=a(e,"label",8,void 0),z=a(e,"labelledBy",8,void 0),K=a(e,"describedBy",8,void 0),A=a(e,"title",8,void 0);T(()=>P(u()),()=>{v(`0 0 100 ${100/u()}`)}),ot(),st();var c=zt();Ct(c,b=>f(b),()=>f());var q=D(c);ft(q,e,"title",{},b=>{var y=ht(),G=ct(y);tt(G,A,i=>{var r=Bt(),g=D(r);U(r),j(()=>lt(g,A())),w(i,r)}),w(b,y)});var k=H(q),n=D(k);ft(n,e,"defs",{},null),U(k);var V=H(k);ft(V,e,"default",{get element(){return f()}},null),U(c),j(()=>{F(c,"viewBox",v()),F(c,"aria-label",B()),F(c,"aria-labelledby",z()),F(c,"aria-describedby",K()),m(c,"z-index",x(),void 0,!0),m(c,"pointer-events",h()===!1?"none":null,void 0,!0),m(c,"top",_().top+"px",void 0,!0),m(c,"left",_().left+"px",void 0,!0),m(c,"width",`calc(100% - ${_().left+_().right}px)`,void 0,!0),m(c,"height",`calc(100% - ${_().top+_().bottom}px)`,void 0,!0)}),w(W,c),it()}var At=R('<div class="baseline svelte-fdkjmm" style="top:100%; width:100%;"></div>'),Vt=R('<div class="gridline svelte-fdkjmm" style="top:0; bottom:0;"></div>'),Tt=R('<div class="tick-mark svelte-fdkjmm"></div>'),Ut=R('<!> <!> <!> <div><div class="text svelte-fdkjmm"> </div></div>',1),Kt=R('<div class="axis x-axis svelte-fdkjmm"></div>');function de(W,e){et(e,!1);const l=nt(),_=()=>o(B,"$percentRange",l),s=()=>o(v,"$xScale",l),f=p(),x=p(),h=p(),u=p(),{xScale:v,percentRange:B}=at("LayerCake");let z=a(e,"tickMarks",8,!1),K=a(e,"gridlines",8,!0),A=a(e,"tickMarkLength",8,6),c=a(e,"baseline",8,!1),q=a(e,"snapLabels",8,!1),k=a(e,"format",8,r=>r),n=a(e,"ticks",8,void 0),V=a(e,"tickGutter",8,0),b=a(e,"dx",8,0),y=a(e,"dy",8,0),G=a(e,"units",24,()=>_()===!0?"%":"px");T(()=>(P(z()),P(A())),()=>{$(f,z()===!0?A()??6:0)}),T(()=>s(),()=>{$(x,typeof s().bandwidth=="function")}),T(()=>(P(n()),t(x),s()),()=>{$(h,Array.isArray(n())?n():t(x)?s().domain():typeof n()=="function"?n()(s().ticks()):s().ticks(n()))}),T(()=>(t(x),s()),()=>{$(u,t(x)?s().bandwidth()/2:0)}),ot(),st();var i=Kt();dt(i,7,()=>t(h),r=>r,(r,g,M)=>{var N=Ut();const C=d(()=>s()(t(g)));var I=ct(N);tt(I,()=>c()===!0,J=>{var O=At();w(J,O)});var E=H(I,2);tt(E,()=>K()===!0,J=>{var O=Vt();j(()=>m(O,"left",`${t(C)??""}${G()??""}`,void 0,!0)),w(J,O)});var S=H(E,2);tt(S,()=>z()===!0,J=>{var O=Tt();j(()=>{m(O,"left",`${t(C)+t(u)}${G()??""}`),m(O,"height",`${t(f)??""}px`),m(O,"bottom",`${-t(f)-V()}px`)}),w(J,O)});var L=H(S,2),X=D(L),Q=D(X);j(()=>lt(Q,k()(t(g)))),U(X),U(L),j(()=>{kt(L,`tick tick-${t(M)??""} svelte-fdkjmm`),F(L,"style",`top:calc(100% + ${V()??""}px);`),m(L,"left",`${t(C)+t(u)}${G()??""}`,void 0,!0),m(X,"top",`${t(f)??""}px`),m(X,"transform",`translate(calc(-50% + ${b()??""}px), ${y()??""}px)`)}),w(r,N)}),U(i),j(()=>Mt(i,"snapLabels",q())),w(W,i),it()}var qt=R('<div class="gridline svelte-1jmrx3z" style="top:0;"></div>'),Nt=R('<div class="tick-mark svelte-1jmrx3z"></div>'),Ot=R('<div><!> <!> <div class="text svelte-1jmrx3z"> </div></div>'),Pt=R('<div class="axis y-axis svelte-1jmrx3z"></div>');function re(W,e){et(e,!1);const l=nt(),_=()=>o(q,"$percentRange",l),s=()=>o(c,"$yScale",l),f=()=>o(A,"$xRange",l),x=p(),h=p(),u=p(),v=p(),B=p(),z=p(),K=p(),{xRange:A,yScale:c,percentRange:q}=at("LayerCake");let k=a(e,"tickMarks",8,!1),n=a(e,"labelPosition",8,"even"),V=a(e,"snapBaselineLabel",8,!1),b=a(e,"gridlines",8,!0),y=a(e,"tickMarkLength",8,void 0),G=a(e,"format",8,S=>S),i=a(e,"ticks",8,4),r=a(e,"tickGutter",8,0),g=a(e,"dx",8,0),M=a(e,"dy",24,()=>-3),N=a(e,"charPixelWidth",8,7.25),C=a(e,"units",24,()=>_()===!0?"%":"px");function I(S,L){return L===","||L==="."?S+N()*.5:S+N()}T(()=>s(),()=>{$(x,typeof s().bandwidth=="function")}),T(()=>(P(i()),t(x),s()),()=>{$(h,Array.isArray(i())?i():t(x)?s().domain():typeof i()=="function"?i()(s().ticks()):s().ticks(i()))}),T(()=>(t(h),P(G())),()=>{$(v,Math.max(10,Math.max(...t(h).map(S=>G()(S).toString().split("").reduce(I,0)))))}),T(()=>(P(k()),P(n()),P(y()),t(v)),()=>{$(u,k()===!0?n()==="above"?y()??t(v):y()??6:0)}),T(()=>(P(r()),P(n()),t(v),t(u)),()=>{$(B,-r()-(n()==="above"?t(v):t(u)))}),T(()=>(t(x),s()),()=>{$(z,t(x)?s().bandwidth()/2:0)}),T(()=>(t(h),s()),()=>{$(K,Math.max(...t(h).map(s())))}),ot(),st();var E=Pt();dt(E,7,()=>t(h),S=>S,(S,L,X)=>{var Q=Ot();const J=d(()=>s()(t(L)));var O=D(Q);tt(O,()=>b()===!0,rt=>{var Y=qt();m(Y,"right","0px",void 0,!0),j(()=>m(Y,"left",`${t(B)??""}px`,void 0,!0)),w(rt,Y)});var vt=H(O,2);tt(vt,()=>k()===!0,rt=>{var Y=Nt();m(Y,"top","0"),j(()=>{m(Y,"left",`${t(B)??""}px`),m(Y,"width",`${t(u)??""}px`)}),w(rt,Y)});var Z=H(vt,2);m(Z,"top","0");var ut=D(Z);j(()=>lt(ut,G()(t(L)))),U(Z),U(Q),j(()=>{kt(Q,`tick tick-${t(X)??""} svelte-1jmrx3z`),F(Q,"style",`left:${f()[0]??""}${C()??""};top:${t(J)+t(z)}${C()??""};`),m(Z,"text-align",n()==="even"?"right":"left"),m(Z,"width",`${t(v)??""}px`),m(Z,"left",`${-t(v)-r()-(n()==="even"?t(u):0)}px`),m(Z,"transform",`translate(${g()+(n()==="even"?-3:0)}px, calc(-50% + ${M()+(n()==="above"||V()===!0&&t(J)===t(K)?-3:4)}px))`)}),w(S,Q)}),U(E),w(W,E),it()}var Wt=R('<div class="circle svelte-icbw6q"></div>'),It=R('<div class="scatter-group"></div>');function ce(W,e){et(e,!1);const l=nt(),_=()=>o(u,"$data",l),s=()=>o(v,"$xGet",l),f=()=>o(z,"$xScale",l),x=()=>o(B,"$yGet",l),h=()=>o(K,"$yScale",l),{data:u,xGet:v,yGet:B,xScale:z,yScale:K}=at("LayerCake");let A=a(e,"r",8,5),c=a(e,"fill",8,"#0cf"),q=a(e,"stroke",8,"#000"),k=a(e,"strokeWidth",8,1);st();var n=It();dt(n,5,_,xt,(V,b)=>{var y=Wt();const G=d(()=>s()(t(b))+(f().bandwidth?f().bandwidth()/2:0)),i=d(()=>x()(t(b))+(h().bandwidth?h().bandwidth()/2:0)),r=d(()=>A()*2),g=d(()=>A()*2),M=d(()=>c()??""),N=d(()=>k()??""),C=d(()=>q()??""),I=d(()=>`
				left: ${t(G)}%;
				top: ${t(i)}%;
				width: ${t(r)}px;
				height: ${t(g)}px;
				background-color: ${t(M)};
				border: ${t(N)}px solid ${t(C)};
			`);j(()=>F(y,"style",t(I))),w(V,y)}),U(n),w(W,n),it()}var Qt=R('<div class="bg svelte-19xh5jy" role="tooltip"></div> <!>',1);function Et(W,e){et(e,!1);const l=nt(),_=()=>o(K,"$xGet",l),s=()=>o(A,"$yGet",l),f=()=>o(c,"$width",l),x=()=>o(q,"$height",l),h=()=>o(z,"$data",l),u=p(),v=p(),B=p(),{data:z,xGet:K,yGet:A,width:c,height:q}=at("LayerCake");let k=p(!1),n=p({}),V=p({}),b=a(e,"x",8,"x"),y=a(e,"y",8,"y"),G=a(e,"searchRadius",8,void 0),i=a(e,"dataset",8,void 0);function r(C){$(V,C);const I=`layer${b().toUpperCase()}`,E=`layer${y().toUpperCase()}`,S=C[I]/(b()==="x"?f():x())*100,L=C[E]/(y()==="y"?x():f())*100;$(n,t(B).find(S,L,G())||{}),$(k,Object.keys(t(n)).length>0)}T(()=>(P(b()),_(),s()),()=>{$(u,b()==="x"?_():s())}),T(()=>(P(y()),s(),_()),()=>{$(v,y()==="y"?s():_())}),T(()=>(f(),x(),t(u),t(v),P(i()),h()),()=>{$(B,jt().extent([[-1,-1],[f()+1,x()+1]]).x(t(u)).y(t(v)).addAll(i()||h()))}),ot(),st();var g=Qt(),M=ct(g),N=H(M,2);ft(N,e,"default",{get x(){return t(u)(t(n))||0},get y(){return t(v)(t(n))||0},get found(){return t(n)},get visible(){return t(k)},get e(){return t(V)}},null),mt("mousemove",M,r),mt("mouseout",M,()=>$(k,!1)),mt("blur",M,()=>$(k,!1)),w(W,g),it()}var Xt=R('<div class="row"><span class="key svelte-16stchf"> </span> </div>'),Yt=R('<div class="line svelte-16stchf"></div> <div class="tooltip svelte-16stchf"><div class="title svelte-16stchf"> </div> <!></div>',1);function oe(W,e){et(e,!1);const l=nt(),_=()=>o(B,"$config",l),s=()=>o(h,"$data",l),f=()=>o(u,"$width",l),x=()=>o(v,"$yScale",l),{data:h,width:u,yScale:v,config:B}=at("LayerCake"),z=Rt(","),K=i=>i.replace(/^\w/,r=>r.toUpperCase());let A=a(e,"formatTitle",8,i=>i),c=a(e,"formatKey",8,i=>K(i)),q=a(e,"formatValue",8,i=>isNaN(+i)?i:z(i)),k=a(e,"offset",24,()=>-20),n=a(e,"dataset",8,void 0);const V=150,b=V/2;function y(i){return Object.keys(i).length===0?[]:Object.keys(i).filter(g=>g!==_().x).map(g=>({key:g,value:i[g]})).sort((g,M)=>M.value-g.value)}st();var G=d(()=>n()||s());Et(W,{get dataset(){return t(G)},y:"x",children:pt,$$slots:{default:(i,r)=>{const g=d(()=>r.x),M=d(()=>r.visible),N=d(()=>r.found);var C=ht();const I=d(()=>y(t(N)));var E=ct(C);tt(E,()=>t(M)===!0,S=>{var L=Yt(),X=ct(L),Q=H(X,2);const J=d(()=>V),O=d(()=>(t(M)?"block":"none")??""),vt=d(()=>x()(t(I)[0].value)??""),Z=d(()=>k()??""),ut=d(()=>Math.min(Math.max(b,t(g)/100*f()),f()-b)??""),rt=d(()=>`
        width:${t(J)}px;
        display: ${t(O)};
        top:calc(${t(vt)}% + ${t(Z)}px);
        left:${t(ut)}px;`);var Y=D(Q),bt=D(Y);j(()=>lt(bt,A()(t(N)[_().x]))),U(Y);var wt=H(Y,2);dt(wt,1,()=>t(I),xt,($t,yt)=>{var _t=Xt(),gt=D(_t),St=D(gt);j(()=>lt(St,`${c()(t(yt).key)??""}:`)),U(gt);var Gt=H(gt);j(()=>lt(Gt,` ${q()(t(yt).value)??""}`)),U(_t),w($t,_t)}),U(Q),j(()=>{F(X,"style",`left:${t(g)/100*f()}px;`),F(Q,"style",t(rt))}),w(S,L)}),w(i,C)}}}),it()}var Dt=R('<div class="circle svelte-1j3utxh"></div>'),Ht=R('<div class="dot-row"><div class="line svelte-1j3utxh"></div> <!></div>'),Ft=R('<div class="dot-plot"></div>');function ve(W,e){et(e,!1);const l=nt(),_=()=>o(c,"$yScale",l),s=()=>o(B,"$data",l),f=()=>o(K,"$yGet",l),x=()=>o(z,"$xGet",l),h=()=>o(A,"$zScale",l),u=()=>o(q,"$config",l),v=p(),{data:B,xGet:z,yGet:K,zScale:A,yScale:c,config:q}=at("LayerCake");let k=a(e,"r",8,5);T(()=>_(),()=>{$(v,_().bandwidth()/2)}),ot(),st();var n=Ft();dt(n,5,s,xt,(V,b)=>{var y=Ht();const G=d(()=>f()(t(b))),i=d(()=>x()(t(b)));var r=D(y);const g=d(()=>Math.min(...t(i))??""),M=d(()=>t(G)+t(v)),N=d(()=>100-Math.max(...t(i))),C=d(()=>`
					left: ${t(g)}%;
					top: ${t(M)}%;
					right: ${t(N)}%;
				`);var I=H(r,2);dt(I,1,()=>t(i),xt,(E,S,L)=>{var X=Dt();const Q=d(()=>`
						left: ${t(S)??""}%;
						top: ${t(G)+t(v)}%;
						width: ${k()*2}px;
						height: ${k()*2}px;
						background: ${h()(u().x[L])??""};
					`);j(()=>F(X,"style",t(Q))),w(E,X)}),U(y),j(()=>F(r,"style",t(C))),w(V,y)}),U(n),w(W,n),it()}export{de as A,ve as C,Et as Q,le as S,re as a,ce as b,oe as c};
