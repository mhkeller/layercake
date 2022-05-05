var Bn=Object.defineProperty;var _n=Object.getOwnPropertySymbols;var On=Object.prototype.hasOwnProperty,In=Object.prototype.propertyIsEnumerable;var yn=(e,i,n)=>i in e?Bn(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,Yt=(e,i)=>{for(var n in i||(i={}))On.call(i,n)&&yn(e,n,i[n]);if(_n)for(var n of _n(i))In.call(i,n)&&yn(e,n,i[n]);return e};import{ae as Ft,af as qn,S as Sn,i as xn,s as Nn,e as Yn,c as Fn,a as _t,d as M,b as S,I as Vn,a4 as D,f as pt,ag as Un,T as Jt,U as Kt,V as Qt,x as ne,u as be,l as hn,r as Zn,w as Jn,A as Kn,P as l,C as s,ah as z,ai as d,y as Qn,R as Xt,G as vt,aj as Vt,ak as Ut,E as mn,D as Xn}from"./vendor-e56b8d6e.js";function vn(e){return e===0?!0:e}function j(e){return vn(e)?Array.isArray(e)?i=>e.map(n=>typeof n!="function"?i[n]:n(i)):typeof e!="function"?i=>i[e]:e:null}function pn(e){const i={};for(const n of e){if(Object(n)!==n)throw new TypeError("iterable for fromEntries should yield objects");const{"0":r,"1":c}=n;Object.defineProperty(i,r,{configurable:!0,enumerable:!0,writable:!0,value:c})}return i}function Zt(e,i={}){return pn(Object.entries(e).filter(([n,r])=>r!==void 0&&i[n]===void 0))}function $n(e,i){if(!Array.isArray(e))throw new TypeError("The first argument of calcExtents() must be an array. If you got this error using the <LayerCake> component, consider passing a flat array to the `flatData` prop. More info: https://layercake.graphics/guide/#flatdata");if(Array.isArray(i)||i===void 0||i===null)throw new TypeError("The second argument of calcExtents() must be an object with field names as keys as accessor functions as values.");const n={},r=Object.keys(i),c=r.length;let o,u,a,b,g,f,h,_;const R=e.length;for(o=0;o<c;o+=1){for(b=r[o],h=i[b],g=null,f=null,u=0;u<R;u+=1)if(_=h(e[u]),Array.isArray(_)){const k=_.length;for(a=0;a<k;a+=1)_[a]!==void 0&&_[a]!==null&&Number.isNaN(_[a])===!1&&((g===null||_[a]<g)&&(g=_[a]),(f===null||_[a]>f)&&(f=_[a]))}else _!=null&&Number.isNaN(_)===!1&&((g===null||_<g)&&(g=_),(f===null||_>f)&&(f=_));n[b]=[g,f]}return n}function Pn(e=[],i){return Array.isArray(i)===!0?i.map((n,r)=>n===null?e[r]:n):e}function ct(e){return function([n,r]){return n?Pn(n[e],r):r}}var ze={x:Ft,y:Ft,z:Ft,r:qn};function ei(e){return e.constant?"symlog":e.base?"log":e.exponent?e.exponent()===.5?"sqrt":"pow":"other"}function Rn(e){return e}function ti(e){return i=>Math.log(e*i)}function ni(e){return i=>e*Math.exp(i)}function ii(e){return i=>Math.sign(i)*Math.log1p(Math.abs(i/e))}function ri(e){return i=>Math.sign(i)*Math.expm1(Math.abs(i))*e}function ut(e){return function(n){return n<0?-Math.pow(-n,e):Math.pow(n,e)}}function oi(e){const i=ei(e);if(i==="log"){const n=Math.sign(e.domain()[0]);return{lift:ti(n),ground:ni(n),scaleType:i}}return i==="pow"?{lift:ut(1),ground:ut(1/1),scaleType:i}:i==="sqrt"?{lift:ut(.5),ground:ut(1/.5),scaleType:i}:i==="symlog"?{lift:ii(1),ground:ri(1),scaleType:i}:{lift:Rn,ground:Rn,scaleType:i}}function ai(e,i){if(typeof e.range!="function")throw new Error("Scale method `range` must be a function");if(typeof e.domain!="function")throw new Error("Scale method `domain` must be a function");if(!Array.isArray(i))return e.domain();e.domain().length!==2&&console.warn("[LayerCake] The scale is expected to have a domain of length 2 to use padding. Are you sure you want to use padding? Your scale's domain is:",e.domain()),e.range().length!==2&&console.warn("[LayerCake] The scale is expected to have a range of length 2 to use padding. Are you sure you want to use padding? Your scale's range is:",e.range());const{lift:n,ground:r}=oi(e),c=e.domain()[0],o=Object.prototype.toString.call(c)==="[object Date]",[u,a]=e.domain().map(R=>n(o?R.getTime():R)),[b,g]=e.range(),f=i[0]||0,h=i[1]||0,_=(a-u)/(Math.abs(g-b)-f-h);return[u-f*_,h*_+a].map(R=>r(o?new Date(R):R))}function fi(e,i,n,r,c){let o,u;return c===!0?(o=0,u=100):(o=e==="r"?1:0,u=e==="y"?n:e==="r"?25:i),r===!0?[u,o]:[o,u]}function ci(e,i,n,r,c,o){return c?typeof c=="function"?c({width:i,height:n}):c:fi(e,i,n,r,o)}function lt(e){return function([n,r,c,o,u,a,b,g,f,h]){if(r===null)return null;const _=ci(e,b,g,a,f,h),R=n===ze[e]?n():n.copy();return R.domain(Pn(r[e],c)).range(_),o&&R.domain(ai(R,o)),u===!0&&(typeof R.nice=="function"?R.nice():console.error(`[Layer Cake] You set \`${e}Nice: true\` but the ${e}Scale does not have a \`.nice\` method. Ignoring...`)),R}}function st([e,i]){return n=>{const r=e(n);return Array.isArray(r)?r.map(c=>i(c)):i(r)}}function dt([e]){if(typeof e=="function"){if(typeof e.range=="function")return e.range();console.error("[LayerCake] Your scale doesn't have a `.range` method?")}return null}var gt={x:!1,y:!0,z:!1,r:!1};const ui=e=>({element:e[0]&4,width:e[0]&256,height:e[0]&512,aspectRatio:e[0]&1024,containerWidth:e[0]&128,containerHeight:e[0]&64}),zn=e=>({element:e[2],width:e[8],height:e[9],aspectRatio:e[10],containerWidth:e[7],containerHeight:e[6]});function bn(e){let i,n,r;const c=e[90].default,o=Xt(c,e,e[89],zn);return{c(){i=Yn("div"),o&&o.c(),this.h()},l(u){i=Fn(u,"DIV",{class:!0});var a=_t(i);o&&o.l(a),a.forEach(M),this.h()},h(){S(i,"class","layercake-container svelte-vhzpsp"),Vn(()=>e[92].call(i)),D(i,"position",e[5],!1),D(i,"top",e[5]==="absolute"?"0":null,!1),D(i,"right",e[5]==="absolute"?"0":null,!1),D(i,"bottom",e[5]==="absolute"?"0":null,!1),D(i,"left",e[5]==="absolute"?"0":null,!1),D(i,"pointer-events",e[4]===!1?"none":null,!1)},m(u,a){pt(u,i,a),o&&o.m(i,null),e[91](i),n=Un(i,e[92].bind(i)),r=!0},p(u,a){o&&o.p&&(!r||a[0]&1988|a[2]&134217728)&&Jt(o,c,u,u[89],r?Qt(c,u[89],a,ui):Kt(u[89]),zn),a[0]&32&&D(i,"position",u[5],!1),a[0]&32&&D(i,"top",u[5]==="absolute"?"0":null,!1),a[0]&32&&D(i,"right",u[5]==="absolute"?"0":null,!1),a[0]&32&&D(i,"bottom",u[5]==="absolute"?"0":null,!1),a[0]&32&&D(i,"left",u[5]==="absolute"?"0":null,!1),a[0]&16&&D(i,"pointer-events",u[4]===!1?"none":null,!1)},i(u){r||(ne(o,u),r=!0)},o(u){be(o,u),r=!1},d(u){u&&M(i),o&&o.d(u),e[91](null),n()}}}function li(e){let i,n,r=(e[3]===!0||typeof window!="undefined")&&bn(e);return{c(){r&&r.c(),i=hn()},l(c){r&&r.l(c),i=hn()},m(c,o){r&&r.m(c,o),pt(c,i,o),n=!0},p(c,o){c[3]===!0||typeof window!="undefined"?r?(r.p(c,o),o[0]&8&&ne(r,1)):(r=bn(c),r.c(),ne(r,1),r.m(i.parentNode,i)):r&&(Zn(),be(r,1,1,()=>{r=null}),Jn())},i(c){n||(ne(r),n=!0)},o(c){be(r),n=!1},d(c){r&&r.d(c),c&&M(i)}}}function si(e,i,n){let r,c,o,u,a,b,g,f,h,_,R,k,T,H,ie,re,y,yt,ht,mt,Rt,zt,bt,wt,Dt,St,xt,Nt,Pt,kt,Et,At,Ct,jt,Mt,we,De,Tt,$t,en,tn,{$$slots:kn={},$$scope:nn}=i,{ssr:rn=!1}=i,{pointerEvents:on=!0}=i,{position:an="relative"}=i,{percentRange:Se=!1}=i,{width:Ht=void 0}=i,{height:Lt=void 0}=i,{containerWidth:L=Ht||100}=i,{containerHeight:G=Lt||100}=i,{element:xe=void 0}=i,{x:W=void 0}=i,{y:B=void 0}=i,{z:O=void 0}=i,{r:I=void 0}=i,{data:q=[]}=i,{xDomain:Y=void 0}=i,{yDomain:F=void 0}=i,{zDomain:V=void 0}=i,{rDomain:U=void 0}=i,{xNice:Ne=!1}=i,{yNice:Pe=!1}=i,{zNice:ke=!1}=i,{rNice:Ee=!1}=i,{xReverse:Ae=gt.x}=i,{yReverse:Ce=gt.y}=i,{zReverse:je=gt.z}=i,{rReverse:Me=gt.r}=i,{xPadding:Te=void 0}=i,{yPadding:He=void 0}=i,{zPadding:Le=void 0}=i,{rPadding:Ge=void 0}=i,{xScale:We=ze.x}=i,{yScale:Be=ze.y}=i,{zScale:Oe=ze.z}=i,{rScale:Ie=ze.r}=i,{xRange:Z=void 0}=i,{yRange:J=void 0}=i,{zRange:K=void 0}=i,{rRange:Q=void 0}=i,{padding:qe={}}=i,{extents:Ye={}}=i,{flatData:Fe=void 0}=i,{custom:Ve={}}=i,Gt=!1;Kn(()=>{Gt=!0});const m={},E=s(Se);l(e,E,t=>n(128,Tt=t));const X=s(L);l(e,X,t=>n(7,De=t));const v=s(G);l(e,v,t=>n(6,we=t));const Ue=s(Zt(Ye));l(e,Ue,t=>n(127,Mt=t));const Ze=s(q);l(e,Ze,t=>n(126,jt=t));const oe=s(Fe||q);l(e,oe,t=>n(125,Ct=t));const Je=s(qe);l(e,Je,t=>n(124,At=t));const p=s(j(W));l(e,p,t=>n(123,Et=t));const $=s(j(B));l(e,$,t=>n(122,kt=t));const ee=s(j(O));l(e,ee,t=>n(121,Pt=t));const te=s(j(I));l(e,te,t=>n(120,Nt=t));const Ke=s(Y);l(e,Ke,t=>n(119,xt=t));const Qe=s(F);l(e,Qe,t=>n(118,St=t));const Xe=s(V);l(e,Xe,t=>n(117,Dt=t));const ve=s(U);l(e,ve,t=>n(116,wt=t));const ae=s(Ne);l(e,ae,t=>n(115,bt=t));const fe=s(Pe);l(e,fe,t=>n(114,zt=t));const ce=s(ke);l(e,ce,t=>n(113,Rt=t));const ue=s(Ee);l(e,ue,t=>n(112,mt=t));const le=s(Ae);l(e,le,t=>n(111,ht=t));const se=s(Ce);l(e,se,t=>n(110,yt=t));const de=s(je);l(e,de,t=>n(109,y=t));const ge=s(Me);l(e,ge,t=>n(108,re=t));const _e=s(Te);l(e,_e,t=>n(107,ie=t));const ye=s(He);l(e,ye,t=>n(106,H=t));const he=s(Le);l(e,he,t=>n(105,T=t));const me=s(Ge);l(e,me,t=>n(104,k=t));const pe=s(Z);l(e,pe,t=>n(103,R=t));const $e=s(J);l(e,$e,t=>n(102,_=t));const et=s(K);l(e,et,t=>n(101,h=t));const tt=s(Q);l(e,tt,t=>n(100,f=t));const nt=s(We);l(e,nt,t=>n(99,g=t));const it=s(Be);l(e,it,t=>n(98,b=t));const rt=s(Oe);l(e,rt,t=>n(97,a=t));const ot=s(Ie);l(e,ot,t=>n(96,u=t));const at=s(m);l(e,at,t=>n(94,c=t));const ft=s(Ve);l(e,ft,t=>n(95,o=t));const fn=z([p,$,ee,te],([t,P,x,w])=>{const Re={};return t&&(Re.x=t),P&&(Re.y=P),x&&(Re.z=x),w&&(Re.r=w),Re}),cn=z([Je,X,v],([t])=>Object.assign({top:0,right:0,bottom:0,left:0},t)),un=z([X,v,cn],([t,P,x])=>{const w={};return w.top=x.top,w.right=t-x.right,w.bottom=P-x.bottom,w.left=x.left,w.width=w.right-w.left,w.height=w.bottom-w.top,w.width<=0&&Gt===!0&&console.warn("[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?"),w.height<=0&&Gt===!0&&console.warn("[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?"),w}),A=z([un],([t])=>t.width);l(e,A,t=>n(8,$t=t));const C=z([un],([t])=>t.height);l(e,C,t=>n(9,en=t));const N=z([oe,fn,Ue],([t,P,x])=>{const w=Zt(P,x);return Object.keys(w).length>0?Yt(Yt({},$n(t,w)),x):{}}),ln=z([N,Ke],ct("x")),sn=z([N,Qe],ct("y")),dn=z([N,Xe],ct("z")),gn=z([N,ve],ct("r")),Wt=z([nt,N,ln,_e,ae,le,A,C,pe,E],lt("x")),En=z([p,Wt],st),Bt=z([it,N,sn,ye,fe,se,A,C,$e,E],lt("y")),An=z([$,Bt],st),Ot=z([rt,N,dn,he,ce,de,A,C,et,E],lt("z")),Cn=z([ee,Ot],st),It=z([ot,N,gn,me,ue,ge,A,C,tt,E],lt("r")),jn=z([te,It],st),Mn=z([Wt],dt),Tn=z([Bt],dt),Hn=z([Ot],dt),Ln=z([It],dt),qt=z([A,C],([t,P])=>t/P);l(e,qt,t=>n(10,tn=t));function Gn(t){vt[t?"unshift":"push"](()=>{xe=t,n(2,xe)})}function Wn(){L=this.clientWidth,G=this.clientHeight,n(0,L),n(1,G)}return e.$$set=t=>{"ssr"in t&&n(3,rn=t.ssr),"pointerEvents"in t&&n(4,on=t.pointerEvents),"position"in t&&n(5,an=t.position),"percentRange"in t&&n(51,Se=t.percentRange),"width"in t&&n(52,Ht=t.width),"height"in t&&n(53,Lt=t.height),"containerWidth"in t&&n(0,L=t.containerWidth),"containerHeight"in t&&n(1,G=t.containerHeight),"element"in t&&n(2,xe=t.element),"x"in t&&n(54,W=t.x),"y"in t&&n(55,B=t.y),"z"in t&&n(56,O=t.z),"r"in t&&n(57,I=t.r),"data"in t&&n(58,q=t.data),"xDomain"in t&&n(59,Y=t.xDomain),"yDomain"in t&&n(60,F=t.yDomain),"zDomain"in t&&n(61,V=t.zDomain),"rDomain"in t&&n(62,U=t.rDomain),"xNice"in t&&n(63,Ne=t.xNice),"yNice"in t&&n(64,Pe=t.yNice),"zNice"in t&&n(65,ke=t.zNice),"rNice"in t&&n(66,Ee=t.rNice),"xReverse"in t&&n(67,Ae=t.xReverse),"yReverse"in t&&n(68,Ce=t.yReverse),"zReverse"in t&&n(69,je=t.zReverse),"rReverse"in t&&n(70,Me=t.rReverse),"xPadding"in t&&n(71,Te=t.xPadding),"yPadding"in t&&n(72,He=t.yPadding),"zPadding"in t&&n(73,Le=t.zPadding),"rPadding"in t&&n(74,Ge=t.rPadding),"xScale"in t&&n(75,We=t.xScale),"yScale"in t&&n(76,Be=t.yScale),"zScale"in t&&n(77,Oe=t.zScale),"rScale"in t&&n(78,Ie=t.rScale),"xRange"in t&&n(79,Z=t.xRange),"yRange"in t&&n(80,J=t.yRange),"zRange"in t&&n(81,K=t.zRange),"rRange"in t&&n(82,Q=t.rRange),"padding"in t&&n(83,qe=t.padding),"extents"in t&&n(84,Ye=t.extents),"flatData"in t&&n(85,Fe=t.flatData),"custom"in t&&n(86,Ve=t.custom),"$$scope"in t&&n(89,nn=t.$$scope)},e.$$.update=()=>{e.$$.dirty[1]&8388608&&W&&n(87,m.x=W,m),e.$$.dirty[1]&16777216&&B&&n(87,m.y=B,m),e.$$.dirty[1]&33554432&&O&&n(87,m.z=O,m),e.$$.dirty[1]&67108864&&I&&n(87,m.r=I,m),e.$$.dirty[1]&268435456&&Y&&n(87,m.xDomain=Y,m),e.$$.dirty[1]&536870912&&F&&n(87,m.yDomain=F,m),e.$$.dirty[1]&1073741824&&V&&n(87,m.zDomain=V,m),e.$$.dirty[2]&1&&U&&n(87,m.rDomain=U,m),e.$$.dirty[2]&131072&&Z&&n(87,m.xRange=Z,m),e.$$.dirty[2]&262144&&J&&n(87,m.yRange=J,m),e.$$.dirty[2]&524288&&K&&n(87,m.zRange=K,m),e.$$.dirty[2]&1048576&&Q&&n(87,m.rRange=Q,m),e.$$.dirty[1]&1048576&&d(E,Tt=Se,Tt),e.$$.dirty[0]&1&&d(X,De=L,De),e.$$.dirty[0]&2&&d(v,we=G,we),e.$$.dirty[2]&4194304&&d(Ue,Mt=Zt(Ye),Mt),e.$$.dirty[1]&134217728&&d(Ze,jt=q,jt),e.$$.dirty[1]&134217728|e.$$.dirty[2]&8388608&&d(oe,Ct=Fe||q,Ct),e.$$.dirty[2]&2097152&&d(Je,At=qe,At),e.$$.dirty[1]&8388608&&d(p,Et=j(W),Et),e.$$.dirty[1]&16777216&&d($,kt=j(B),kt),e.$$.dirty[1]&33554432&&d(ee,Pt=j(O),Pt),e.$$.dirty[1]&67108864&&d(te,Nt=j(I),Nt),e.$$.dirty[1]&268435456&&d(Ke,xt=Y,xt),e.$$.dirty[1]&536870912&&d(Qe,St=F,St),e.$$.dirty[1]&1073741824&&d(Xe,Dt=V,Dt),e.$$.dirty[2]&1&&d(ve,wt=U,wt),e.$$.dirty[2]&2&&d(ae,bt=Ne,bt),e.$$.dirty[2]&4&&d(fe,zt=Pe,zt),e.$$.dirty[2]&8&&d(ce,Rt=ke,Rt),e.$$.dirty[2]&16&&d(ue,mt=Ee,mt),e.$$.dirty[2]&32&&d(le,ht=Ae,ht),e.$$.dirty[2]&64&&d(se,yt=Ce,yt),e.$$.dirty[2]&128&&d(de,y=je,y),e.$$.dirty[2]&256&&d(ge,re=Me,re),e.$$.dirty[2]&512&&d(_e,ie=Te,ie),e.$$.dirty[2]&1024&&d(ye,H=He,H),e.$$.dirty[2]&2048&&d(he,T=Le,T),e.$$.dirty[2]&4096&&d(me,k=Ge,k),e.$$.dirty[2]&131072&&d(pe,R=Z,R),e.$$.dirty[2]&262144&&d($e,_=J,_),e.$$.dirty[2]&524288&&d(et,h=K,h),e.$$.dirty[2]&1048576&&d(tt,f=Q,f),e.$$.dirty[2]&8192&&d(nt,g=We,g),e.$$.dirty[2]&16384&&d(it,b=Be,b),e.$$.dirty[2]&32768&&d(rt,a=Oe,a),e.$$.dirty[2]&65536&&d(ot,u=Ie,u),e.$$.dirty[2]&16777216&&d(ft,o=Ve,o),e.$$.dirty[2]&33554432&&d(at,c=m,c),e.$$.dirty[2]&67108864&&Qn("LayerCake",r)},n(88,r={activeGetters:fn,width:A,height:C,percentRange:E,aspectRatio:qt,containerWidth:X,containerHeight:v,x:p,y:$,z:ee,r:te,custom:ft,data:Ze,xNice:ae,yNice:fe,zNice:ce,rNice:ue,xReverse:le,yReverse:se,zReverse:de,rReverse:ge,xPadding:_e,yPadding:ye,zPadding:he,rPadding:me,padding:cn,flatData:oe,extents:N,xDomain:ln,yDomain:sn,zDomain:dn,rDomain:gn,xRange:Mn,yRange:Tn,zRange:Hn,rRange:Ln,config:at,xScale:Wt,xGet:En,yScale:Bt,yGet:An,zScale:Ot,zGet:Cn,rScale:It,rGet:jn}),[L,G,xe,rn,on,an,we,De,$t,en,tn,E,X,v,Ue,Ze,oe,Je,p,$,ee,te,Ke,Qe,Xe,ve,ae,fe,ce,ue,le,se,de,ge,_e,ye,he,me,pe,$e,et,tt,nt,it,rt,ot,at,ft,A,C,qt,Se,Ht,Lt,W,B,O,I,q,Y,F,V,U,Ne,Pe,ke,Ee,Ae,Ce,je,Me,Te,He,Le,Ge,We,Be,Oe,Ie,Z,J,K,Q,qe,Ye,Fe,Ve,m,r,nn,kn,Gn,Wn]}class Ri extends Sn{constructor(i){super();xn(this,i,si,li,Nn,{ssr:3,pointerEvents:4,position:5,percentRange:51,width:52,height:53,containerWidth:0,containerHeight:1,element:2,x:54,y:55,z:56,r:57,data:58,xDomain:59,yDomain:60,zDomain:61,rDomain:62,xNice:63,yNice:64,zNice:65,rNice:66,xReverse:67,yReverse:68,zReverse:69,rReverse:70,xPadding:71,yPadding:72,zPadding:73,rPadding:74,xScale:75,yScale:76,zScale:77,rScale:78,xRange:79,yRange:80,zRange:81,rRange:82,padding:83,extents:84,flatData:85,custom:86},null,[-1,-1,-1,-1,-1])}}const di=e=>({element:e&1}),wn=e=>({element:e[0]}),gi=e=>({element:e&1}),Dn=e=>({element:e[0]});function _i(e){let i,n,r,c,o;const u=e[13].defs,a=Xt(u,e,e[12],Dn),b=e[13].default,g=Xt(b,e,e[12],wn);return{c(){i=Vt("svg"),n=Vt("defs"),a&&a.c(),r=Vt("g"),g&&g.c(),this.h()},l(f){i=Ut(f,"svg",{class:!0,viewBox:!0,width:!0,height:!0});var h=_t(i);n=Ut(h,"defs",{});var _=_t(n);a&&a.l(_),_.forEach(M),r=Ut(h,"g",{class:!0,transform:!0});var R=_t(r);g&&g.l(R),R.forEach(M),h.forEach(M),this.h()},h(){S(r,"class","layercake-layout-svg_g"),S(r,"transform",c="translate("+e[7].left+", "+e[7].top+")"),S(i,"class","layercake-layout-svg svelte-u84d8d"),S(i,"viewBox",e[4]),S(i,"width",e[5]),S(i,"height",e[6]),D(i,"z-index",e[2],!1),D(i,"pointer-events",e[3]===!1?"none":null,!1)},m(f,h){pt(f,i,h),mn(i,n),a&&a.m(n,null),mn(i,r),g&&g.m(r,null),e[14](r),e[15](i),o=!0},p(f,[h]){a&&a.p&&(!o||h&4097)&&Jt(a,u,f,f[12],o?Qt(u,f[12],h,gi):Kt(f[12]),Dn),g&&g.p&&(!o||h&4097)&&Jt(g,b,f,f[12],o?Qt(b,f[12],h,di):Kt(f[12]),wn),(!o||h&128&&c!==(c="translate("+f[7].left+", "+f[7].top+")"))&&S(r,"transform",c),(!o||h&16)&&S(i,"viewBox",f[4]),(!o||h&32)&&S(i,"width",f[5]),(!o||h&64)&&S(i,"height",f[6]),h&4&&D(i,"z-index",f[2],!1),h&8&&D(i,"pointer-events",f[3]===!1?"none":null,!1)},i(f){o||(ne(a,f),ne(g,f),o=!0)},o(f){be(a,f),be(g,f),o=!1},d(f){f&&M(i),a&&a.d(f),g&&g.d(f),e[14](null),e[15](null)}}}function yi(e,i,n){let r,c,o,{$$slots:u={},$$scope:a}=i,{element:b=void 0}=i,{innerElement:g=void 0}=i,{zIndex:f=void 0}=i,{pointerEvents:h=void 0}=i,{viewBox:_=void 0}=i,{attrs:R={}}=i;const{containerWidth:k,containerHeight:T,padding:H}=Xn("LayerCake");l(e,k,y=>n(5,r=y)),l(e,T,y=>n(6,c=y)),l(e,H,y=>n(7,o=y));function ie(y){vt[y?"unshift":"push"](()=>{g=y,n(1,g)})}function re(y){vt[y?"unshift":"push"](()=>{b=y,n(0,b)})}return e.$$set=y=>{"element"in y&&n(0,b=y.element),"innerElement"in y&&n(1,g=y.innerElement),"zIndex"in y&&n(2,f=y.zIndex),"pointerEvents"in y&&n(3,h=y.pointerEvents),"viewBox"in y&&n(4,_=y.viewBox),"attrs"in y&&n(11,R=y.attrs),"$$scope"in y&&n(12,a=y.$$scope)},e.$$.update=()=>{e.$$.dirty&2049&&b&&Object.entries(R).forEach(y=>b.setAttribute(...y))},[b,g,f,h,_,r,c,o,k,T,H,R,a,u,ie,re]}class zi extends Sn{constructor(i){super();xn(this,i,yi,_i,Nn,{element:0,innerElement:1,zIndex:2,pointerEvents:3,viewBox:4,attrs:11})}}export{Ri as L,zi as S,$n as c};