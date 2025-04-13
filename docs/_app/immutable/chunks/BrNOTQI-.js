var ze=e=>{throw TypeError(e)};var Ot=(e,t,n)=>t.has(e)||ze("Cannot "+n);var A=(e,t,n)=>(Ot(e,t,"read from private field"),n?n.call(e):t.get(e)),x=(e,t,n)=>t.has(e)?ze("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n);import{aT as Oe,aC as Je,aD as C,x as O,P as N,aE as Nt}from"./Dc8w0MKf.js";import{H as be,S as Ne,R as je}from"./CYgJF_JY.js";new URL("sveltekit-internal://");function jt(e,t){return e==="/"||t==="ignore"?e:t==="never"?e.endsWith("/")?e.slice(0,-1):e:t==="always"&&!e.endsWith("/")?e+"/":e}function $t(e){return e.split("%25").map(decodeURI).join("%25")}function Dt(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}function Ie({href:e}){return e.split("#")[0]}function Ft(e,t,n,a=!1){const r=new URL(e);Object.defineProperty(r,"searchParams",{value:new Proxy(r.searchParams,{get(i,o){if(o==="get"||o==="getAll"||o==="has")return l=>(n(l),i[o](l));t();const c=Reflect.get(i,o);return typeof c=="function"?c.bind(i):c}}),enumerable:!0,configurable:!0});const s=["href","pathname","search","toString","toJSON"];a&&s.push("hash");for(const i of s)Object.defineProperty(r,i,{get(){return t(),e[i]},enumerable:!0,configurable:!0});return r}function Vt(...e){let t=5381;for(const n of e)if(typeof n=="string"){let a=n.length;for(;a;)t=t*33^n.charCodeAt(--a)}else if(ArrayBuffer.isView(n)){const a=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let r=a.length;for(;r;)t=t*33^a[--r]}else throw new TypeError("value must be a string or TypedArray");return(t>>>0).toString(36)}function Bt(e){const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n.buffer}const Mt=window.fetch;window.fetch=(e,t)=>((e instanceof Request?e.method:(t==null?void 0:t.method)||"GET")!=="GET"&&W.delete($e(e)),Mt(e,t));const W=new Map;function qt(e,t){const n=$e(e,t),a=document.querySelector(n);if(a!=null&&a.textContent){let{body:r,...s}=JSON.parse(a.textContent);const i=a.getAttribute("data-ttl");return i&&W.set(n,{body:r,init:s,ttl:1e3*Number(i)}),a.getAttribute("data-b64")!==null&&(r=Bt(r)),Promise.resolve(new Response(r,s))}return window.fetch(e,t)}function Gt(e,t,n){if(W.size>0){const a=$e(e,n),r=W.get(a);if(r){if(performance.now()<r.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(r.body,r.init);W.delete(a)}}return window.fetch(t,n)}function $e(e,t){let a=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(t!=null&&t.headers||t!=null&&t.body){const r=[];t.headers&&r.push([...new Headers(t.headers)].join(",")),t.body&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&r.push(t.body),a+=`[data-hash="${Vt(...r)}"]`}return a}const Ht=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Kt(e){const t=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${Yt(e).map(a=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(a);if(r)return t.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const s=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(a);if(s)return t.push({name:s[1],matcher:s[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!a)return;const i=a.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return Ue(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return Ue(String.fromCharCode(...c.slice(2).split("-").map(p=>parseInt(p,16))));const d=Ht.exec(c),[,u,w,f,m]=d;return t.push({name:f,matcher:m,optional:!!u,rest:!!w,chained:w?l===1&&i[0]==="":!1}),w?"(.*?)":u?"([^/]*)?":"([^/]+?)"}return Ue(c)}).join("")}).join("")}/?$`),params:t}}function Wt(e){return!/^\([^)]+\)$/.test(e)}function Yt(e){return e.slice(1).split("/").filter(Wt)}function zt(e,t,n){const a={},r=e.slice(1),s=r.filter(o=>o!==void 0);let i=0;for(let o=0;o<t.length;o+=1){const c=t[o];let l=r[o-i];if(c.chained&&c.rest&&i&&(l=r.slice(o-i,o+1).filter(d=>d).join("/"),i=0),l===void 0){c.rest&&(a[c.name]="");continue}if(!c.matcher||n[c.matcher](l)){a[c.name]=l;const d=t[o+1],u=r[o+1];d&&!d.rest&&d.optional&&u&&c.chained&&(i=0),!d&&!u&&Object.keys(a).length===s.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return a}function Ue(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Jt({nodes:e,server_loads:t,dictionary:n,matchers:a}){const r=new Set(t);return Object.entries(n).map(([o,[c,l,d]])=>{const{pattern:u,params:w}=Kt(o),f={id:o,exec:m=>{const p=u.exec(m);if(p)return zt(p,w,a)},errors:[1,...d||[]].map(m=>e[m]),layouts:[0,...l||[]].map(i),leaf:s(c)};return f.errors.length=f.layouts.length=Math.max(f.errors.length,f.layouts.length),f});function s(o){const c=o<0;return c&&(o=~o),[c,e[o]]}function i(o){return o===void 0?o:[r.has(o),e[o]]}}function ut(e,t=JSON.parse){try{return t(sessionStorage[e])}catch{}}function Xe(e,t,n=JSON.stringify){const a=n(t);try{sessionStorage[e]=a}catch{}}var st;const P=((st=globalThis.__sveltekit_1nr8ot2)==null?void 0:st.base)??"";var it;const Xt=((it=globalThis.__sveltekit_1nr8ot2)==null?void 0:it.assets)??P,Zt="1744579813051",ht="sveltekit:snapshot",dt="sveltekit:scroll",pt="sveltekit:states",Qt="sveltekit:pageurl",q="sveltekit:history",J="sveltekit:navigation",F={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},fe=location.origin;function gt(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const n=document.getElementsByTagName("base");t=n.length?n[0].href:document.URL}return new URL(e,t)}function De(){return{x:pageXOffset,y:pageYOffset}}function M(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const Ze={...F,"":F.hover};function mt(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function wt(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=mt(e)}}function Pe(e,t,n){let a;try{if(a=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI),n&&a.hash.match(/^#[^/]/)){const o=location.hash.split("#")[1]||"/";a.hash=`#${o}${a.hash}`}}catch{}const r=e instanceof SVGAElement?e.target.baseVal:e.target,s=!a||!!r||Ae(a,t,n)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),i=(a==null?void 0:a.origin)===fe&&e.hasAttribute("download");return{url:a,external:s,target:r,download:i}}function de(e){let t=null,n=null,a=null,r=null,s=null,i=null,o=e;for(;o&&o!==document.documentElement;)a===null&&(a=M(o,"preload-code")),r===null&&(r=M(o,"preload-data")),t===null&&(t=M(o,"keepfocus")),n===null&&(n=M(o,"noscroll")),s===null&&(s=M(o,"reload")),i===null&&(i=M(o,"replacestate")),o=mt(o);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Ze[a??"off"],preload_data:Ze[r??"off"],keepfocus:c(t),noscroll:c(n),reload:c(s),replace_state:c(i)}}function Qe(e){const t=Oe(e);let n=!0;function a(){n=!0,t.update(i=>i)}function r(i){n=!1,t.set(i)}function s(i){let o;return t.subscribe(c=>{(o===void 0||n&&c!==o)&&i(o=c)})}return{notify:a,set:r,subscribe:s}}const yt={v:()=>{}};function en(){const{set:e,subscribe:t}=Oe(!1);let n;async function a(){clearTimeout(n);try{const r=await fetch(`${Xt}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const i=(await r.json()).version!==Zt;return i&&(e(!0),yt.v(),clearTimeout(n)),i}catch{return!1}}return{subscribe:t,check:a}}function Ae(e,t,n){return e.origin!==fe||!e.pathname.startsWith(t)?!0:n?!(e.pathname===t+"/"||e.pathname===t+"/index.html"||e.protocol==="file:"&&e.pathname.replace(/\/[^/]+\.html?$/,"")===t):!1}function Vn(e){}function et(e){const t=nn(e),n=new ArrayBuffer(t.length),a=new DataView(n);for(let r=0;r<n.byteLength;r++)a.setUint8(r,t.charCodeAt(r));return n}const tn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function nn(e){e.length%4===0&&(e=e.replace(/==?$/,""));let t="",n=0,a=0;for(let r=0;r<e.length;r++)n<<=6,n|=tn.indexOf(e[r]),a+=6,a===24&&(t+=String.fromCharCode((n&16711680)>>16),t+=String.fromCharCode((n&65280)>>8),t+=String.fromCharCode(n&255),n=a=0);return a===12?(n>>=4,t+=String.fromCharCode(n)):a===18&&(n>>=2,t+=String.fromCharCode((n&65280)>>8),t+=String.fromCharCode(n&255)),t}const rn=-1,an=-2,on=-3,sn=-4,cn=-5,ln=-6;function fn(e,t){if(typeof e=="number")return r(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const n=e,a=Array(n.length);function r(s,i=!1){if(s===rn)return;if(s===on)return NaN;if(s===sn)return 1/0;if(s===cn)return-1/0;if(s===ln)return-0;if(i)throw new Error("Invalid input");if(s in a)return a[s];const o=n[s];if(!o||typeof o!="object")a[s]=o;else if(Array.isArray(o))if(typeof o[0]=="string"){const c=o[0],l=t==null?void 0:t[c];if(l)return a[s]=l(r(o[1]));switch(c){case"Date":a[s]=new Date(o[1]);break;case"Set":const d=new Set;a[s]=d;for(let f=1;f<o.length;f+=1)d.add(r(o[f]));break;case"Map":const u=new Map;a[s]=u;for(let f=1;f<o.length;f+=2)u.set(r(o[f]),r(o[f+1]));break;case"RegExp":a[s]=new RegExp(o[1],o[2]);break;case"Object":a[s]=Object(o[1]);break;case"BigInt":a[s]=BigInt(o[1]);break;case"null":const w=Object.create(null);a[s]=w;for(let f=1;f<o.length;f+=2)w[o[f]]=r(o[f+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const f=globalThis[c],m=o[1],p=et(m),h=new f(p);a[s]=h;break}case"ArrayBuffer":{const f=o[1],m=et(f);a[s]=m;break}default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(o.length);a[s]=c;for(let l=0;l<o.length;l+=1){const d=o[l];d!==an&&(c[l]=r(d))}}else{const c={};a[s]=c;for(const l in o){const d=o[l];c[l]=r(d)}}return a[s]}return r(0)}const _t=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[..._t];const un=new Set([..._t]);[...un];function hn(e){return e.filter(t=>t!=null)}const dn="x-sveltekit-invalidated",pn="x-sveltekit-trailing-slash";function pe(e){return e instanceof be||e instanceof Ne?e.status:500}function gn(e){return e instanceof Ne?e.text:"Internal Error"}let U,X,Le;const mn=Je.toString().includes("$$")||/function \w+\(\) \{\}/.test(Je.toString());var ee,te,ne,re,ae,oe,se,ie,ct,ce,lt,le,ft;mn?(U={data:{},form:null,error:null,params:{},route:{id:null},state:{},status:-1,url:new URL("https://example.com")},X={current:null},Le={current:!1}):(U=new(ct=class{constructor(){x(this,ee,C({}));x(this,te,C(null));x(this,ne,C(null));x(this,re,C({}));x(this,ae,C({id:null}));x(this,oe,C({}));x(this,se,C(-1));x(this,ie,C(new URL("https://example.com")))}get data(){return O(A(this,ee))}set data(t){N(A(this,ee),t)}get form(){return O(A(this,te))}set form(t){N(A(this,te),t)}get error(){return O(A(this,ne))}set error(t){N(A(this,ne),t)}get params(){return O(A(this,re))}set params(t){N(A(this,re),t)}get route(){return O(A(this,ae))}set route(t){N(A(this,ae),t)}get state(){return O(A(this,oe))}set state(t){N(A(this,oe),t)}get status(){return O(A(this,se))}set status(t){N(A(this,se),t)}get url(){return O(A(this,ie))}set url(t){N(A(this,ie),t)}},ee=new WeakMap,te=new WeakMap,ne=new WeakMap,re=new WeakMap,ae=new WeakMap,oe=new WeakMap,se=new WeakMap,ie=new WeakMap,ct),X=new(lt=class{constructor(){x(this,ce,C(null))}get current(){return O(A(this,ce))}set current(t){N(A(this,ce),t)}},ce=new WeakMap,lt),Le=new(ft=class{constructor(){x(this,le,C(!1))}get current(){return O(A(this,le))}set current(t){N(A(this,le),t)}},le=new WeakMap,ft),yt.v=()=>Le.current=!0);function wn(e){Object.assign(U,e)}const yn="/__data.json",_n=".html__data.json";function vn(e){return e.endsWith(".html")?e.replace(/\.html$/,_n):e.replace(/\/$/,"")+yn}const bn=new Set(["icon","shortcut icon","apple-touch-icon"]),B=ut(dt)??{},Z=ut(ht)??{},$={url:Qe({}),page:Qe({}),navigating:Oe(null),updated:en()};function Fe(e){B[e]=De()}function An(e,t){let n=e+1;for(;B[n];)delete B[n],n+=1;for(n=t+1;Z[n];)delete Z[n],n+=1}function H(e){return location.href=e.href,new Promise(()=>{})}async function vt(){if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistration(P||"/");e&&await e.update()}}function tt(){}let Ve,xe,ge,j,Ce,k;const me=[],we=[];let L=null;const ue=new Map,bt=new Set,kn=new Set,Y=new Set;let v={branch:[],error:null,url:null},Be=!1,ye=!1,nt=!0,Q=!1,K=!1,At=!1,Me=!1,kt,E,T,V;const z=new Set;async function Gn(e,t,n){var r,s,i,o;document.URL!==location.href&&(location.href=location.href),k=e,await((s=(r=e.hooks).init)==null?void 0:s.call(r)),Ve=Jt(e),j=document.documentElement,Ce=t,xe=e.nodes[0],ge=e.nodes[1],xe(),ge(),E=(i=history.state)==null?void 0:i[q],T=(o=history.state)==null?void 0:o[J],E||(E=T=Date.now(),history.replaceState({...history.state,[q]:E,[J]:T},""));const a=B[E];a&&(history.scrollRestoration="manual",scrollTo(a.x,a.y)),n?await On(Ce,n):await Pn(k.hash?jn(new URL(location.href)):location.href,{replaceState:!0}),Cn()}function Sn(){me.length=0,Me=!1}function St(e){we.some(t=>t==null?void 0:t.snapshot)&&(Z[e]=we.map(t=>{var n;return(n=t==null?void 0:t.snapshot)==null?void 0:n.capture()}))}function Et(e){var t;(t=Z[e])==null||t.forEach((n,a)=>{var r,s;(s=(r=we[a])==null?void 0:r.snapshot)==null||s.restore(n)})}function rt(){Fe(E),Xe(dt,B),St(T),Xe(ht,Z)}async function qe(e,t,n,a){return he({type:"goto",url:gt(e),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,state:t.state,redirect_count:n,nav_token:a,accept:()=>{t.invalidateAll&&(Me=!0),t.invalidate&&t.invalidate.forEach(xn)}})}async function En(e){if(e.id!==(L==null?void 0:L.id)){const t={};z.add(t),L={id:e.id,token:t,promise:Ut({...e,preload:t}).then(n=>(z.delete(t),n.type==="loaded"&&n.state.error&&(L=null),n))}}return L.promise}async function Te(e){var n;const t=(n=await Se(e,!1))==null?void 0:n.route;t&&await Promise.all([...t.layouts,t.leaf].map(a=>a==null?void 0:a[1]()))}function Rt(e,t,n){var s;v=e.state;const a=document.querySelector("style[data-sveltekit]");a&&a.remove(),Object.assign(U,e.props.page),kt=new k.root({target:t,props:{...e.props,stores:$,components:we},hydrate:n,sync:!1}),Et(T);const r={from:null,to:{params:v.params,route:{id:((s=v.route)==null?void 0:s.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};Y.forEach(i=>i(r)),ye=!0}function _e({url:e,params:t,branch:n,status:a,error:r,route:s,form:i}){let o="never";if(P&&(e.pathname===P||e.pathname===P+"/"))o="always";else for(const f of n)(f==null?void 0:f.slash)!==void 0&&(o=f.slash);e.pathname=jt(e.pathname,o),e.search=e.search;const c={type:"loaded",state:{url:e,params:t,branch:n,error:r,route:s},props:{constructors:hn(n).map(f=>f.node.component),page:Ke(U)}};i!==void 0&&(c.props.form=i);let l={},d=!U,u=0;for(let f=0;f<Math.max(n.length,v.branch.length);f+=1){const m=n[f],p=v.branch[f];(m==null?void 0:m.data)!==(p==null?void 0:p.data)&&(d=!0),m&&(l={...l,...m.data},d&&(c.props[`data_${u}`]=l),u+=1)}return(!v.url||e.href!==v.url.href||v.error!==r||i!==void 0&&i!==U.form||d)&&(c.props.page={error:r,params:t,route:{id:(s==null?void 0:s.id)??null},state:{},status:a,url:new URL(e),form:i??null,data:d?l:U.data}),c}async function Ge({loader:e,parent:t,url:n,params:a,route:r,server_data_node:s}){var d,u,w;let i=null,o=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await e();if((d=l.universal)!=null&&d.load){let f=function(...p){for(const h of p){const{href:_}=new URL(h,n);c.dependencies.add(_)}};const m={route:new Proxy(r,{get:(p,h)=>(o&&(c.route=!0),p[h])}),params:new Proxy(a,{get:(p,h)=>(o&&c.params.add(h),p[h])}),data:(s==null?void 0:s.data)??null,url:Ft(n,()=>{o&&(c.url=!0)},p=>{o&&c.search_params.add(p)},k.hash),async fetch(p,h){p instanceof Request&&(h={body:p.method==="GET"||p.method==="HEAD"?void 0:await p.blob(),cache:p.cache,credentials:p.credentials,headers:[...p.headers].length?p.headers:void 0,integrity:p.integrity,keepalive:p.keepalive,method:p.method,mode:p.mode,redirect:p.redirect,referrer:p.referrer,referrerPolicy:p.referrerPolicy,signal:p.signal,...h});const{resolved:_,promise:R}=It(p,h,n);return o&&f(_.href),R},setHeaders:()=>{},depends:f,parent(){return o&&(c.parent=!0),t()},untrack(p){o=!1;try{return p()}finally{o=!0}}};i=await l.universal.load.call(null,m)??null}return{node:l,loader:e,server:s,universal:(u=l.universal)!=null&&u.load?{type:"data",data:i,uses:c}:null,data:i??(s==null?void 0:s.data)??null,slash:((w=l.universal)==null?void 0:w.trailingSlash)??(s==null?void 0:s.slash)}}function It(e,t,n){let a=e instanceof Request?e.url:e;const r=new URL(a,n);r.origin===n.origin&&(a=r.href.slice(n.origin.length));const s=ye?Gt(a,r.href,t):qt(a,t);return{resolved:r,promise:s}}function at(e,t,n,a,r,s){if(Me)return!0;if(!r)return!1;if(r.parent&&e||r.route&&t||r.url&&n)return!0;for(const i of r.search_params)if(a.has(i))return!0;for(const i of r.params)if(s[i]!==v.params[i])return!0;for(const i of r.dependencies)if(me.some(o=>o(new URL(i))))return!0;return!1}function He(e,t){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?t??null:null}function Rn(e,t){if(!e)return new Set(t.searchParams.keys());const n=new Set([...e.searchParams.keys(),...t.searchParams.keys()]);for(const a of n){const r=e.searchParams.getAll(a),s=t.searchParams.getAll(a);r.every(i=>s.includes(i))&&s.every(i=>r.includes(i))&&n.delete(a)}return n}function ot({error:e,url:t,route:n,params:a}){return{type:"loaded",state:{error:e,url:t,route:n,params:a,branch:[]},props:{page:Ke(U),constructors:[]}}}async function Ut({id:e,invalidating:t,url:n,params:a,route:r,preload:s}){if((L==null?void 0:L.id)===e)return z.delete(L.token),L.promise;const{errors:i,layouts:o,leaf:c}=r,l=[...o,c];i.forEach(g=>g==null?void 0:g().catch(()=>{})),l.forEach(g=>g==null?void 0:g[1]().catch(()=>{}));let d=null;const u=v.url?e!==ve(v.url):!1,w=v.route?r.id!==v.route.id:!1,f=Rn(v.url,n);let m=!1;const p=l.map((g,y)=>{var D;const b=v.branch[y],S=!!(g!=null&&g[0])&&((b==null?void 0:b.loader)!==g[1]||at(m,w,u,f,(D=b.server)==null?void 0:D.uses,a));return S&&(m=!0),S});if(p.some(Boolean)){try{d=await Pt(n,p)}catch(g){const y=await G(g,{url:n,params:a,route:{id:e}});return z.has(s)?ot({error:y,url:n,params:a,route:r}):ke({status:pe(g),error:y,url:n,route:r})}if(d.type==="redirect")return d}const h=d==null?void 0:d.nodes;let _=!1;const R=l.map(async(g,y)=>{var Ee;if(!g)return;const b=v.branch[y],S=h==null?void 0:h[y];if((!S||S.type==="skip")&&g[1]===(b==null?void 0:b.loader)&&!at(_,w,u,f,(Ee=b.universal)==null?void 0:Ee.uses,a))return b;if(_=!0,(S==null?void 0:S.type)==="error")throw S;return Ge({loader:g[1],url:n,params:a,route:r,parent:async()=>{var Ye;const We={};for(let Re=0;Re<y;Re+=1)Object.assign(We,(Ye=await R[Re])==null?void 0:Ye.data);return We},server_data_node:He(S===void 0&&g[0]?{type:"skip"}:S??null,g[0]?b==null?void 0:b.server:void 0)})});for(const g of R)g.catch(()=>{});const I=[];for(let g=0;g<l.length;g+=1)if(l[g])try{I.push(await R[g])}catch(y){if(y instanceof je)return{type:"redirect",location:y.location};if(z.has(s))return ot({error:await G(y,{params:a,url:n,route:{id:r.id}}),url:n,params:a,route:r});let b=pe(y),S;if(h!=null&&h.includes(y))b=y.status??b,S=y.error;else if(y instanceof be)S=y.body;else{if(await $.updated.check())return await vt(),await H(n);S=await G(y,{params:a,url:n,route:{id:r.id}})}const D=await In(g,I,i);return D?_e({url:n,params:a,branch:I.slice(0,D.idx).concat(D.node),status:b,error:S,route:r}):await Tt(n,{id:r.id},S,b)}else I.push(void 0);return _e({url:n,params:a,branch:I,status:200,error:null,route:r,form:t?void 0:null})}async function In(e,t,n){for(;e--;)if(n[e]){let a=e;for(;!t[a];)a-=1;try{return{idx:a+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function ke({status:e,error:t,url:n,route:a}){const r={};let s=null;if(k.server_loads[0]===0)try{const o=await Pt(n,[!0]);if(o.type!=="data"||o.nodes[0]&&o.nodes[0].type!=="data")throw 0;s=o.nodes[0]??null}catch{(n.origin!==fe||n.pathname!==location.pathname||Be)&&await H(n)}try{const o=await Ge({loader:xe,url:n,params:r,route:a,parent:()=>Promise.resolve({}),server_data_node:He(s)}),c={node:await ge(),loader:ge,universal:null,server:null,data:null};return _e({url:n,params:r,branch:[o,c],status:e,error:t,route:null})}catch(o){if(o instanceof je)return qe(new URL(o.location,location.href),{},0);throw o}}async function Un(e){const t=e.href;if(ue.has(t))return ue.get(t);let n;try{const a=(async()=>{let r=await k.hooks.reroute({url:new URL(e),fetch:async(s,i)=>It(s,i,e).promise})??e;if(typeof r=="string"){const s=new URL(e);k.hash?s.hash=r:s.pathname=r,r=s}return r})();ue.set(t,a),n=await a}catch{ue.delete(t);return}return n}async function Se(e,t){if(e&&!Ae(e,P,k.hash)){const n=await Un(e);if(!n)return;const a=Ln(n);for(const r of Ve){const s=r.exec(a);if(s)return{id:ve(e),invalidating:t,route:r,params:Dt(s),url:e}}}}function Ln(e){return $t(k.hash?e.hash.replace(/^#/,"").replace(/[?#].+/,""):e.pathname.slice(P.length))||"/"}function ve(e){return(k.hash?e.hash.replace(/^#/,""):e.pathname)+e.search}function Lt({url:e,type:t,intent:n,delta:a}){let r=!1;const s=Ct(v,n,e,t);a!==void 0&&(s.navigation.delta=a);const i={...s.navigation,cancel:()=>{r=!0,s.reject(new Error("navigation cancelled"))}};return Q||bt.forEach(o=>o(i)),r?null:s}async function he({type:e,url:t,popped:n,keepfocus:a,noscroll:r,replace_state:s,state:i={},redirect_count:o=0,nav_token:c={},accept:l=tt,block:d=tt}){const u=V;V=c;const w=await Se(t,!1),f=Lt({url:t,type:e,delta:n==null?void 0:n.delta,intent:w});if(!f){d(),V===c&&(V=u);return}const m=E,p=T;l(),Q=!0,ye&&$.navigating.set(X.current=f.navigation);let h=w&&await Ut(w);if(!h){if(Ae(t,P,k.hash))return await H(t);h=await Tt(t,{id:null},await G(new Ne(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=(w==null?void 0:w.url)||t,V!==c)return f.reject(new Error("navigation aborted")),!1;if(h.type==="redirect")if(o>=20)h=await ke({status:500,error:await G(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return await qe(new URL(h.location,t).href,{},o+1,c),!1;else h.props.page.status>=400&&await $.updated.check()&&(await vt(),await H(t));if(Sn(),Fe(m),St(p),h.props.page.url.pathname!==t.pathname&&(t.pathname=h.props.page.url.pathname),i=n?n.state:i,!n){const g=s?0:1,y={[q]:E+=g,[J]:T+=g,[pt]:i};(s?history.replaceState:history.pushState).call(history,y,"",t),s||An(E,T)}if(L=null,h.props.page.state=i,ye){v=h.state,h.props.page&&(h.props.page.url=t);const g=(await Promise.all(Array.from(kn,y=>y(f.navigation)))).filter(y=>typeof y=="function");if(g.length>0){let y=function(){g.forEach(b=>{Y.delete(b)})};g.push(y),g.forEach(b=>{Y.add(b)})}kt.$set(h.props),wn(h.props.page),At=!0}else Rt(h,Ce,!1);const{activeElement:_}=document;await Nt();const R=n?n.scroll:r?De():null;if(nt){const g=t.hash&&document.getElementById(decodeURIComponent(k.hash?t.hash.split("#")[2]??"":t.hash.slice(1)));R?scrollTo(R.x,R.y):g?g.scrollIntoView():scrollTo(0,0)}const I=document.activeElement!==_&&document.activeElement!==document.body;!a&&!I&&Nn(),nt=!0,h.props.page&&Object.assign(U,h.props.page),Q=!1,e==="popstate"&&Et(T),f.fulfil(void 0),Y.forEach(g=>g(f.navigation)),$.navigating.set(X.current=null)}async function Tt(e,t,n,a){return e.origin===fe&&e.pathname===location.pathname&&!Be?await ke({status:a,error:n,url:e,route:t}):await H(e)}function Tn(){let e,t,n;j.addEventListener("mousemove",o=>{const c=o.target;clearTimeout(e),e=setTimeout(()=>{s(c,F.hover)},20)});function a(o){o.defaultPrevented||s(o.composedPath()[0],F.tap)}j.addEventListener("mousedown",a),j.addEventListener("touchstart",a,{passive:!0});const r=new IntersectionObserver(o=>{for(const c of o)c.isIntersecting&&(Te(new URL(c.target.href)),r.unobserve(c.target))},{threshold:0});async function s(o,c){const l=wt(o,j),d=l===t&&c>=n;if(!l||d)return;const{url:u,external:w,download:f}=Pe(l,P,k.hash);if(w||f)return;const m=de(l),p=u&&ve(v.url)===ve(u);if(!(m.reload||p))if(c<=m.preload_data){t=l,n=F.tap;const h=await Se(u,!1);if(!h)return;En(h)}else c<=m.preload_code&&(t=l,n=c,Te(u))}function i(){r.disconnect();for(const o of j.querySelectorAll("a")){const{url:c,external:l,download:d}=Pe(o,P,k.hash);if(l||d)continue;const u=de(o);u.reload||(u.preload_code===F.viewport&&r.observe(o),u.preload_code===F.eager&&Te(c))}}Y.add(i),i()}function G(e,t){if(e instanceof be)return e.body;const n=pe(e),a=gn(e);return k.hooks.handleError({error:e,event:t,status:n,message:a})??{message:a}}function Pn(e,t={}){return e=new URL(gt(e)),e.origin!==fe?Promise.reject(new Error("goto: invalid URL")):qe(e,t,0)}function xn(e){if(typeof e=="function")me.push(e);else{const{href:t}=new URL(e,location.href);me.push(n=>n.href===t)}}function Cn(){var t;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let a=!1;if(rt(),!Q){const r=Ct(v,void 0,null,"leave"),s={...r.navigation,cancel:()=>{a=!0,r.reject(new Error("navigation cancelled"))}};bt.forEach(i=>i(s))}a?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&rt()}),(t=navigator.connection)!=null&&t.saveData||Tn(),j.addEventListener("click",async n=>{if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const a=wt(n.composedPath()[0],j);if(!a)return;const{url:r,external:s,target:i,download:o}=Pe(a,P,k.hash);if(!r)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=de(a);if(!(a instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:")||o)return;const[d,u]=(k.hash?r.hash.replace(/^#/,""):r.href).split("#"),w=d===Ie(location);if(s||c.reload&&(!w||!u)){Lt({url:r,type:"link"})?Q=!0:n.preventDefault();return}if(u!==void 0&&w){const[,f]=v.url.href.split("#");if(f===u){if(n.preventDefault(),u===""||u==="top"&&a.ownerDocument.getElementById("top")===null)window.scrollTo({top:0});else{const m=a.ownerDocument.getElementById(decodeURIComponent(u));m&&(m.scrollIntoView(),m.focus())}return}if(K=!0,Fe(E),e(r),!c.replace_state)return;K=!1}n.preventDefault(),await new Promise(f=>{requestAnimationFrame(()=>{setTimeout(f,0)}),setTimeout(f,100)}),await he({type:"link",url:r,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??r.href===location.href})}),j.addEventListener("submit",n=>{if(n.defaultPrevented)return;const a=HTMLFormElement.prototype.cloneNode.call(n.target),r=n.submitter;if(((r==null?void 0:r.formTarget)||a.target)==="_blank"||((r==null?void 0:r.formMethod)||a.method)!=="get")return;const o=new URL((r==null?void 0:r.hasAttribute("formaction"))&&(r==null?void 0:r.formAction)||a.action);if(Ae(o,P,!1))return;const c=n.target,l=de(c);if(l.reload)return;n.preventDefault(),n.stopPropagation();const d=new FormData(c),u=r==null?void 0:r.getAttribute("name");u&&d.append(u,(r==null?void 0:r.getAttribute("value"))??""),o.search=new URLSearchParams(d).toString(),he({type:"form",url:o,keepfocus:l.keepfocus,noscroll:l.noscroll,replace_state:l.replace_state??o.href===location.href})}),addEventListener("popstate",async n=>{var a;if((a=n.state)!=null&&a[q]){const r=n.state[q];if(V={},r===E)return;const s=B[r],i=n.state[pt]??{},o=new URL(n.state[Qt]??location.href),c=n.state[J],l=v.url?Ie(location)===Ie(v.url):!1;if(c===T&&(At||l)){i!==U.state&&(U.state=i),e(o),B[E]=De(),s&&scrollTo(s.x,s.y),E=r;return}const u=r-E;await he({type:"popstate",url:o,popped:{state:i,scroll:s,delta:u},accept:()=>{E=r,T=c},block:()=>{history.go(-u)},nav_token:V})}else if(!K){const r=new URL(location.href);e(r),k.hash&&location.reload()}}),addEventListener("hashchange",()=>{K&&(K=!1,history.replaceState({...history.state,[q]:++E,[J]:T},"",location.href))});for(const n of document.querySelectorAll("link"))bn.has(n.rel)&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&$.navigating.set(X.current=null)});function e(n){v.url=U.url=n,$.page.set(Ke(U)),$.page.notify()}}async function On(e,{status:t=200,error:n,node_ids:a,params:r,route:s,server_route:i,data:o,form:c}){Be=!0;const l=new URL(location.href);let d;({params:r={},route:s={id:null}}=await Se(l,!1)||{}),d=Ve.find(({id:f})=>f===s.id);let u,w=!0;try{const f=a.map(async(p,h)=>{const _=o[h];return _!=null&&_.uses&&(_.uses=xt(_.uses)),Ge({loader:k.nodes[p],url:l,params:r,route:s,parent:async()=>{const R={};for(let I=0;I<h;I+=1)Object.assign(R,(await f[I]).data);return R},server_data_node:He(_)})}),m=await Promise.all(f);if(d){const p=d.layouts;for(let h=0;h<p.length;h++)p[h]||m.splice(h,0,void 0)}u=_e({url:l,params:r,branch:m,status:t,error:n,form:c,route:d??null})}catch(f){if(f instanceof je){await H(new URL(f.location,location.href));return}u=await ke({status:pe(f),error:await G(f,{url:l,params:r,route:s}),url:l,route:s}),e.textContent="",w=!1}u.props.page&&(u.props.page.state={}),Rt(u,e,w)}async function Pt(e,t){var s;const n=new URL(e);n.pathname=vn(e.pathname),e.pathname.endsWith("/")&&n.searchParams.append(pn,"1"),n.searchParams.append(dn,t.map(i=>i?"1":"0").join(""));const a=window.fetch,r=await a(n.href,{});if(!r.ok){let i;throw(s=r.headers.get("content-type"))!=null&&s.includes("application/json")?i=await r.json():r.status===404?i="Not Found":r.status===500&&(i="Internal Error"),new be(r.status,i)}return new Promise(async i=>{var w;const o=new Map,c=r.body.getReader(),l=new TextDecoder;function d(f){return fn(f,{...k.decoders,Promise:m=>new Promise((p,h)=>{o.set(m,{fulfil:p,reject:h})})})}let u="";for(;;){const{done:f,value:m}=await c.read();if(f&&!u)break;for(u+=!m&&u?`
`:l.decode(m,{stream:!0});;){const p=u.indexOf(`
`);if(p===-1)break;const h=JSON.parse(u.slice(0,p));if(u=u.slice(p+1),h.type==="redirect")return i(h);if(h.type==="data")(w=h.nodes)==null||w.forEach(_=>{(_==null?void 0:_.type)==="data"&&(_.uses=xt(_.uses),_.data=d(_.data))}),i(h);else if(h.type==="chunk"){const{id:_,data:R,error:I}=h,g=o.get(_);o.delete(_),I?g.reject(d(I)):g.fulfil(d(R))}}}})}function xt(e){return{dependencies:new Set((e==null?void 0:e.dependencies)??[]),params:new Set((e==null?void 0:e.params)??[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url),search_params:new Set((e==null?void 0:e.search_params)??[])}}function Nn(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const t=document.body,n=t.getAttribute("tabindex");t.tabIndex=-1,t.focus({preventScroll:!0,focusVisible:!1}),n!==null?t.setAttribute("tabindex",n):t.removeAttribute("tabindex");const a=getSelection();if(a&&a.type!=="None"){const r=[];for(let s=0;s<a.rangeCount;s+=1)r.push(a.getRangeAt(s));setTimeout(()=>{if(a.rangeCount===r.length){for(let s=0;s<a.rangeCount;s+=1){const i=r[s],o=a.getRangeAt(s);if(i.commonAncestorContainer!==o.commonAncestorContainer||i.startContainer!==o.startContainer||i.endContainer!==o.endContainer||i.startOffset!==o.startOffset||i.endOffset!==o.endOffset)return}a.removeAllRanges()}})}}}function Ct(e,t,n,a){var c,l;let r,s;const i=new Promise((d,u)=>{r=d,s=u});return i.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:((c=e.route)==null?void 0:c.id)??null},url:e.url},to:n&&{params:(t==null?void 0:t.params)??null,route:{id:((l=t==null?void 0:t.route)==null?void 0:l.id)??null},url:n},willUnload:!t,type:a,complete:i},fulfil:r,reject:s}}function Ke(e){return{data:e.data,error:e.error,form:e.form,params:e.params,route:e.route,state:e.state,status:e.status,url:e.url}}function jn(e){const t=new URL(e);return t.hash=decodeURIComponent(e.hash),t}export{Gn as a,Pn as g,Vn as l,U as p,$ as s};
