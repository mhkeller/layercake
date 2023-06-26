import{s as Rn,f as E,a as H,l as X,K as Fn,g as A,d as m,c as U,h as I,r as Le,m as Y,j as y,x as _,i as N,B as Oe,b as kn,p as qn,M as Hn,N as Un,E as Re,q as ht,e as vt}from"../chunks/scheduler.101db06a.js";import{S as Wn,i as Gn,a as k,c as Be,t as Q,g as Te,b as pt,d as Xn,m as gt,e as mt}from"../chunks/index.5bc76508.js";import{e as x}from"../chunks/each.af0871f9.js";import{c as Yn}from"../chunks/_components.929b369d.js";var Ft="1.13.6",_t=typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global||Function("return this")()||{},Ce=Array.prototype,Ze=Object.prototype,dt=typeof Symbol<"u"?Symbol.prototype:null,Jn=Ce.push,me=Ce.slice,ve=Ze.toString,Qn=Ze.hasOwnProperty,kt=typeof ArrayBuffer<"u",Zn=typeof DataView<"u",Kn=Array.isArray,yt=Object.keys,wt=Object.create,Et=kt&&ArrayBuffer.isView,xn=isNaN,bn=isFinite,qt=!{toString:null}.propertyIsEnumerable("toString"),At=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],jn=Math.pow(2,53)-1;function D(e,t){return t=t==null?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),u=0;u<n;u++)r[u]=arguments[u+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var l=Array(t+1);for(u=0;u<t;u++)l[u]=arguments[u];return l[t]=r,e.apply(this,l)}}function ne(e){var t=typeof e;return t==="function"||t==="object"&&!!e}function er(e){return e===null}function Ht(e){return e===void 0}function Ut(e){return e===!0||e===!1||ve.call(e)==="[object Boolean]"}function tr(e){return!!(e&&e.nodeType===1)}function T(e){var t="[object "+e+"]";return function(n){return ve.call(n)===t}}const Ke=T("String"),Wt=T("Number"),nr=T("Date"),rr=T("RegExp"),lr=T("Error"),Gt=T("Symbol"),Xt=T("ArrayBuffer");var Yt=T("Function"),ur=_t.document&&_t.document.childNodes;typeof/./!="function"&&typeof Int8Array!="object"&&typeof ur!="function"&&(Yt=function(e){return typeof e=="function"||!1});const C=Yt,Jt=T("Object");var Qt=Zn&&Jt(new DataView(new ArrayBuffer(8))),xe=typeof Map<"u"&&Jt(new Map),ar=T("DataView");function ir(e){return e!=null&&C(e.getInt8)&&Xt(e.buffer)}const Ie=Qt?ir:ar,re=Kn||T("Array");function b(e,t){return e!=null&&Qn.call(e,t)}var He=T("Arguments");(function(){He(arguments)||(He=function(e){return b(e,"callee")})})();const be=He;function or(e){return!Gt(e)&&bn(e)&&!isNaN(parseFloat(e))}function Zt(e){return Wt(e)&&xn(e)}function Kt(e){return function(){return e}}function xt(e){return function(t){var n=e(t);return typeof n=="number"&&n>=0&&n<=jn}}function bt(e){return function(t){return t==null?void 0:t[e]}}const ze=bt("byteLength"),fr=xt(ze);var sr=/\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;function cr(e){return Et?Et(e)&&!Ie(e):fr(e)&&sr.test(ve.call(e))}const jt=kt?cr:Kt(!1),P=bt("length");function hr(e){for(var t={},n=e.length,r=0;r<n;++r)t[e[r]]=!0;return{contains:function(u){return t[u]===!0},push:function(u){return t[u]=!0,e.push(u)}}}function en(e,t){t=hr(t);var n=At.length,r=e.constructor,u=C(r)&&r.prototype||Ze,l="constructor";for(b(e,l)&&!t.contains(l)&&t.push(l);n--;)l=At[n],l in e&&e[l]!==u[l]&&!t.contains(l)&&t.push(l)}function z(e){if(!ne(e))return[];if(yt)return yt(e);var t=[];for(var n in e)b(e,n)&&t.push(n);return qt&&en(e,t),t}function vr(e){if(e==null)return!0;var t=P(e);return typeof t=="number"&&(re(e)||Ke(e)||be(e))?t===0:P(z(e))===0}function tn(e,t){var n=z(t),r=n.length;if(e==null)return!r;for(var u=Object(e),l=0;l<r;l++){var a=n[l];if(t[a]!==u[a]||!(a in u))return!1}return!0}function d(e){if(e instanceof d)return e;if(!(this instanceof d))return new d(e);this._wrapped=e}d.VERSION=Ft;d.prototype.value=function(){return this._wrapped};d.prototype.valueOf=d.prototype.toJSON=d.prototype.value;d.prototype.toString=function(){return String(this._wrapped)};function Mt(e){return new Uint8Array(e.buffer||e,e.byteOffset||0,ze(e))}var Ot="[object DataView]";function Ue(e,t,n,r){if(e===t)return e!==0||1/e===1/t;if(e==null||t==null)return!1;if(e!==e)return t!==t;var u=typeof e;return u!=="function"&&u!=="object"&&typeof t!="object"?!1:nn(e,t,n,r)}function nn(e,t,n,r){e instanceof d&&(e=e._wrapped),t instanceof d&&(t=t._wrapped);var u=ve.call(e);if(u!==ve.call(t))return!1;if(Qt&&u=="[object Object]"&&Ie(e)){if(!Ie(t))return!1;u=Ot}switch(u){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:+e==0?1/+e===1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return dt.valueOf.call(e)===dt.valueOf.call(t);case"[object ArrayBuffer]":case Ot:return nn(Mt(e),Mt(t),n,r)}var l=u==="[object Array]";if(!l&&jt(e)){var a=ze(e);if(a!==ze(t))return!1;if(e.buffer===t.buffer&&e.byteOffset===t.byteOffset)return!0;l=!0}if(!l){if(typeof e!="object"||typeof t!="object")return!1;var i=e.constructor,o=t.constructor;if(i!==o&&!(C(i)&&i instanceof i&&C(o)&&o instanceof o)&&"constructor"in e&&"constructor"in t)return!1}n=n||[],r=r||[];for(var f=n.length;f--;)if(n[f]===e)return r[f]===t;if(n.push(e),r.push(t),l){if(f=e.length,f!==t.length)return!1;for(;f--;)if(!Ue(e[f],t[f],n,r))return!1}else{var h=z(e),s;if(f=h.length,z(t).length!==f)return!1;for(;f--;)if(s=h[f],!(b(t,s)&&Ue(e[s],t[s],n,r)))return!1}return n.pop(),r.pop(),!0}function pr(e,t){return Ue(e,t)}function _e(e){if(!ne(e))return[];var t=[];for(var n in e)t.push(n);return qt&&en(e,t),t}function je(e){var t=P(e);return function(n){if(n==null)return!1;var r=_e(n);if(P(r))return!1;for(var u=0;u<t;u++)if(!C(n[e[u]]))return!1;return e!==un||!C(n[et])}}var et="forEach",rn="has",tt=["clear","delete"],ln=["get",rn,"set"],gr=tt.concat(et,ln),un=tt.concat(ln),mr=["add"].concat(tt,et,rn);const _r=xe?je(gr):T("Map"),dr=xe?je(un):T("WeakMap"),yr=xe?je(mr):T("Set"),wr=T("WeakSet");function se(e){for(var t=z(e),n=t.length,r=Array(n),u=0;u<n;u++)r[u]=e[t[u]];return r}function Er(e){for(var t=z(e),n=t.length,r=Array(n),u=0;u<n;u++)r[u]=[t[u],e[t[u]]];return r}function an(e){for(var t={},n=z(e),r=0,u=n.length;r<u;r++)t[e[n[r]]]=n[r];return t}function We(e){var t=[];for(var n in e)C(e[n])&&t.push(n);return t.sort()}function nt(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||n==null)return n;for(var u=1;u<r;u++)for(var l=arguments[u],a=e(l),i=a.length,o=0;o<i;o++){var f=a[o];(!t||n[f]===void 0)&&(n[f]=l[f])}return n}}const on=nt(_e),Se=nt(z),fn=nt(_e,!0);function Ar(){return function(){}}function sn(e){if(!ne(e))return{};if(wt)return wt(e);var t=Ar();t.prototype=e;var n=new t;return t.prototype=null,n}function Mr(e,t){var n=sn(e);return t&&Se(n,t),n}function Or(e){return ne(e)?re(e)?e.slice():on({},e):e}function Ir(e,t){return t(e),e}function cn(e){return re(e)?e:[e]}d.toPath=cn;function de(e){return d.toPath(e)}function rt(e,t){for(var n=t.length,r=0;r<n;r++){if(e==null)return;e=e[t[r]]}return n?e:void 0}function hn(e,t,n){var r=rt(e,de(t));return Ht(r)?n:r}function zr(e,t){t=de(t);for(var n=t.length,r=0;r<n;r++){var u=t[r];if(!b(e,u))return!1;e=e[u]}return!!n}function lt(e){return e}function pe(e){return e=Se({},e),function(t){return tn(t,e)}}function ut(e){return e=de(e),function(t){return rt(t,e)}}function ye(e,t,n){if(t===void 0)return e;switch(n??3){case 1:return function(r){return e.call(t,r)};case 3:return function(r,u,l){return e.call(t,r,u,l)};case 4:return function(r,u,l,a){return e.call(t,r,u,l,a)}}return function(){return e.apply(t,arguments)}}function vn(e,t,n){return e==null?lt:C(e)?ye(e,t,n):ne(e)&&!re(e)?pe(e):ut(e)}function at(e,t){return vn(e,t,1/0)}d.iteratee=at;function V(e,t,n){return d.iteratee!==at?d.iteratee(e,t):vn(e,t,n)}function Sr(e,t,n){t=V(t,n);for(var r=z(e),u=r.length,l={},a=0;a<u;a++){var i=r[a];l[i]=t(e[i],i,e)}return l}function pn(){}function Br(e){return e==null?pn:function(t){return hn(e,t)}}function Tr(e,t,n){var r=Array(Math.max(0,e));t=ye(t,n,1);for(var u=0;u<e;u++)r[u]=t(u);return r}function Ge(e,t){return t==null&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))}const ge=Date.now||function(){return new Date().getTime()};function gn(e){var t=function(l){return e[l]},n="(?:"+z(e).join("|")+")",r=RegExp(n),u=RegExp(n,"g");return function(l){return l=l==null?"":""+l,r.test(l)?l.replace(u,t):l}}const mn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},Cr=gn(mn),$r=an(mn),Nr=gn($r),Dr=d.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var Fe=/(.)^/,Pr={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},Vr=/\\|'|\r|\n|\u2028|\u2029/g;function Lr(e){return"\\"+Pr[e]}var Rr=/^\s*(\w|\$)+\s*$/;function Fr(e,t,n){!t&&n&&(t=n),t=fn({},t,d.templateSettings);var r=RegExp([(t.escape||Fe).source,(t.interpolate||Fe).source,(t.evaluate||Fe).source].join("|")+"|$","g"),u=0,l="__p+='";e.replace(r,function(f,h,s,c,v){return l+=e.slice(u,v).replace(Vr,Lr),u=v+f.length,h?l+=`'+
((__t=(`+h+`))==null?'':_.escape(__t))+
'`:s?l+=`'+
((__t=(`+s+`))==null?'':__t)+
'`:c&&(l+=`';
`+c+`
__p+='`),f}),l+=`';
`;var a=t.variable;if(a){if(!Rr.test(a))throw new Error("variable is not a bare identifier: "+a)}else l=`with(obj||{}){
`+l+`}
`,a="obj";l=`var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
`+l+`return __p;
`;var i;try{i=new Function(a,"_",l)}catch(f){throw f.source=l,f}var o=function(f){return i.call(this,f,d)};return o.source="function("+a+`){
`+l+"}",o}function kr(e,t,n){t=de(t);var r=t.length;if(!r)return C(n)?n.call(e):n;for(var u=0;u<r;u++){var l=e==null?void 0:e[t[u]];l===void 0&&(l=n,u=r),e=C(l)?l.call(e):l}return e}var qr=0;function Hr(e){var t=++qr+"";return e?e+t:t}function Ur(e){var t=d(e);return t._chain=!0,t}function _n(e,t,n,r,u){if(!(r instanceof t))return e.apply(n,u);var l=sn(e.prototype),a=e.apply(l,u);return ne(a)?a:l}var ce=D(function(e,t){var n=ce.placeholder,r=function(){for(var u=0,l=t.length,a=Array(l),i=0;i<l;i++)a[i]=t[i]===n?arguments[u++]:t[i];for(;u<arguments.length;)a.push(arguments[u++]);return _n(e,r,this,this,a)};return r});ce.placeholder=d;const dn=D(function(e,t,n){if(!C(e))throw new TypeError("Bind must be called on a function");var r=D(function(u){return _n(e,r,t,this,n.concat(u))});return r}),R=xt(P);function le(e,t,n,r){if(r=r||[],!t&&t!==0)t=1/0;else if(t<=0)return r.concat(e);for(var u=r.length,l=0,a=P(e);l<a;l++){var i=e[l];if(R(i)&&(re(i)||be(i)))if(t>1)le(i,t-1,n,r),u=r.length;else for(var o=0,f=i.length;o<f;)r[u++]=i[o++];else n||(r[u++]=i)}return r}const Wr=D(function(e,t){t=le(t,!1,!1);var n=t.length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=dn(e[r],e)}return e});function Gr(e,t){var n=function(r){var u=n.cache,l=""+(t?t.apply(this,arguments):r);return b(u,l)||(u[l]=e.apply(this,arguments)),u[l]};return n.cache={},n}const yn=D(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),Xr=ce(yn,d,1);function Yr(e,t,n){var r,u,l,a,i=0;n||(n={});var o=function(){i=n.leading===!1?0:ge(),r=null,a=e.apply(u,l),r||(u=l=null)},f=function(){var h=ge();!i&&n.leading===!1&&(i=h);var s=t-(h-i);return u=this,l=arguments,s<=0||s>t?(r&&(clearTimeout(r),r=null),i=h,a=e.apply(u,l),r||(u=l=null)):!r&&n.trailing!==!1&&(r=setTimeout(o,s)),a};return f.cancel=function(){clearTimeout(r),i=0,r=u=l=null},f}function Jr(e,t,n){var r,u,l,a,i,o=function(){var h=ge()-u;t>h?r=setTimeout(o,t-h):(r=null,n||(a=e.apply(i,l)),r||(l=i=null))},f=D(function(h){return i=this,l=h,u=ge(),r||(r=setTimeout(o,t),n&&(a=e.apply(i,l))),a});return f.cancel=function(){clearTimeout(r),r=l=i=null},f}function Qr(e,t){return ce(t,e)}function it(e){return function(){return!e.apply(this,arguments)}}function Zr(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}}function Kr(e,t){return function(){if(--e<1)return t.apply(this,arguments)}}function wn(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}}const xr=ce(wn,2);function En(e,t,n){t=V(t,n);for(var r=z(e),u,l=0,a=r.length;l<a;l++)if(u=r[l],t(e[u],u,e))return u}function An(e){return function(t,n,r){n=V(n,r);for(var u=P(t),l=e>0?0:u-1;l>=0&&l<u;l+=e)if(n(t[l],l,t))return l;return-1}}const ot=An(1),Mn=An(-1);function On(e,t,n,r){n=V(n,r,1);for(var u=n(t),l=0,a=P(e);l<a;){var i=Math.floor((l+a)/2);n(e[i])<u?l=i+1:a=i}return l}function In(e,t,n){return function(r,u,l){var a=0,i=P(r);if(typeof l=="number")e>0?a=l>=0?l:Math.max(l+i,a):i=l>=0?Math.min(l+1,i):l+i+1;else if(n&&l&&i)return l=n(r,u),r[l]===u?l:-1;if(u!==u)return l=t(me.call(r,a,i),Zt),l>=0?l+a:-1;for(l=e>0?a:i-1;l>=0&&l<i;l+=e)if(r[l]===u)return l;return-1}}const zn=In(1,ot,On),br=In(-1,Mn);function Xe(e,t,n){var r=R(e)?ot:En,u=r(e,t,n);if(u!==void 0&&u!==-1)return e[u]}function jr(e,t){return Xe(e,pe(t))}function Z(e,t,n){t=ye(t,n);var r,u;if(R(e))for(r=0,u=e.length;r<u;r++)t(e[r],r,e);else{var l=z(e);for(r=0,u=l.length;r<u;r++)t(e[l[r]],l[r],e)}return e}function te(e,t,n){t=V(t,n);for(var r=!R(e)&&z(e),u=(r||e).length,l=Array(u),a=0;a<u;a++){var i=r?r[a]:a;l[a]=t(e[i],i,e)}return l}function Sn(e){var t=function(n,r,u,l){var a=!R(n)&&z(n),i=(a||n).length,o=e>0?0:i-1;for(l||(u=n[a?a[o]:o],o+=e);o>=0&&o<i;o+=e){var f=a?a[o]:o;u=r(u,n[f],f,n)}return u};return function(n,r,u,l){var a=arguments.length>=3;return t(n,ye(r,l,4),u,a)}}const ke=Sn(1),It=Sn(-1);function fe(e,t,n){var r=[];return t=V(t,n),Z(e,function(u,l,a){t(u,l,a)&&r.push(u)}),r}function el(e,t,n){return fe(e,it(V(t)),n)}function zt(e,t,n){t=V(t,n);for(var r=!R(e)&&z(e),u=(r||e).length,l=0;l<u;l++){var a=r?r[l]:l;if(!t(e[a],a,e))return!1}return!0}function St(e,t,n){t=V(t,n);for(var r=!R(e)&&z(e),u=(r||e).length,l=0;l<u;l++){var a=r?r[l]:l;if(t(e[a],a,e))return!0}return!1}function J(e,t,n,r){return R(e)||(e=se(e)),(typeof n!="number"||r)&&(n=0),zn(e,t,n)>=0}const tl=D(function(e,t,n){var r,u;return C(t)?u=t:(t=de(t),r=t.slice(0,-1),t=t[t.length-1]),te(e,function(l){var a=u;if(!a){if(r&&r.length&&(l=rt(l,r)),l==null)return;a=l[t]}return a==null?a:a.apply(l,n)})});function ft(e,t){return te(e,ut(t))}function nl(e,t){return fe(e,pe(t))}function Bn(e,t,n){var r=-1/0,u=-1/0,l,a;if(t==null||typeof t=="number"&&typeof e[0]!="object"&&e!=null){e=R(e)?e:se(e);for(var i=0,o=e.length;i<o;i++)l=e[i],l!=null&&l>r&&(r=l)}else t=V(t,n),Z(e,function(f,h,s){a=t(f,h,s),(a>u||a===-1/0&&r===-1/0)&&(r=f,u=a)});return r}function rl(e,t,n){var r=1/0,u=1/0,l,a;if(t==null||typeof t=="number"&&typeof e[0]!="object"&&e!=null){e=R(e)?e:se(e);for(var i=0,o=e.length;i<o;i++)l=e[i],l!=null&&l<r&&(r=l)}else t=V(t,n),Z(e,function(f,h,s){a=t(f,h,s),(a<u||a===1/0&&r===1/0)&&(r=f,u=a)});return r}var ll=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;function Tn(e){return e?re(e)?me.call(e):Ke(e)?e.match(ll):R(e)?te(e,lt):se(e):[]}function Cn(e,t,n){if(t==null||n)return R(e)||(e=se(e)),e[Ge(e.length-1)];var r=Tn(e),u=P(r);t=Math.max(Math.min(t,u),0);for(var l=u-1,a=0;a<t;a++){var i=Ge(a,l),o=r[a];r[a]=r[i],r[i]=o}return r.slice(0,t)}function ul(e){return Cn(e,1/0)}function $n(e,t,n){var r=0;return t=V(t,n),ft(te(e,function(u,l,a){return{value:u,index:r++,criteria:t(u,l,a)}}).sort(function(u,l){var a=u.criteria,i=l.criteria;if(a!==i){if(a>i||a===void 0)return 1;if(a<i||i===void 0)return-1}return u.index-l.index}),"value")}function $e(e,t){return function(n,r,u){var l=t?[[],[]]:{};return r=V(r,u),Z(n,function(a,i){var o=r(a,i,n);e(l,a,o)}),l}}const Ye=$e(function(e,t,n){b(e,n)?e[n].push(t):e[n]=[t]}),al=$e(function(e,t,n){e[n]=t}),il=$e(function(e,t,n){b(e,n)?e[n]++:e[n]=1}),ol=$e(function(e,t,n){e[n?0:1].push(t)},!0);function fl(e){return e==null?0:R(e)?e.length:z(e).length}function sl(e,t,n){return t in n}const Nn=D(function(e,t){var n={},r=t[0];if(e==null)return n;C(r)?(t.length>1&&(r=ye(r,t[1])),t=_e(e)):(r=sl,t=le(t,!1,!1),e=Object(e));for(var u=0,l=t.length;u<l;u++){var a=t[u],i=e[a];r(i,a,e)&&(n[a]=i)}return n}),cl=D(function(e,t){var n=t[0],r;return C(n)?(n=it(n),t.length>1&&(r=t[1])):(t=te(le(t,!1,!1),String),n=function(u,l){return!J(t,l)}),Nn(e,n,r)});function Dn(e,t,n){return me.call(e,0,Math.max(0,e.length-(t==null||n?1:t)))}function qe(e,t,n){return e==null||e.length<1?t==null||n?void 0:[]:t==null||n?e[0]:Dn(e,e.length-t)}function Ae(e,t,n){return me.call(e,t==null||n?1:t)}function hl(e,t,n){return e==null||e.length<1?t==null||n?void 0:[]:t==null||n?e[e.length-1]:Ae(e,Math.max(0,e.length-t))}function vl(e){return fe(e,Boolean)}function pl(e,t){return le(e,t,!1)}const Pn=D(function(e,t){return t=le(t,!0,!0),fe(e,function(n){return!J(t,n)})}),gl=D(function(e,t){return Pn(e,t)});function Je(e,t,n,r){Ut(t)||(r=n,n=t,t=!1),n!=null&&(n=V(n,r));for(var u=[],l=[],a=0,i=P(e);a<i;a++){var o=e[a],f=n?n(o,a,e):o;t&&!n?((!a||l!==f)&&u.push(o),l=f):n?J(l,f)||(l.push(f),u.push(o)):J(u,o)||u.push(o)}return u}const ml=D(function(e){return Je(le(e,!0,!0))});function _l(e){for(var t=[],n=arguments.length,r=0,u=P(e);r<u;r++){var l=e[r];if(!J(t,l)){var a;for(a=1;a<n&&J(arguments[a],l);a++);a===n&&t.push(l)}}return t}function Qe(e){for(var t=e&&Bn(e,P).length||0,n=Array(t),r=0;r<t;r++)n[r]=ft(e,r);return n}const dl=D(Qe);function yl(e,t){for(var n={},r=0,u=P(e);r<u;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n}function wl(e,t,n){t==null&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),u=Array(r),l=0;l<r;l++,e+=n)u[l]=e;return u}function El(e,t){if(t==null||t<1)return[];for(var n=[],r=0,u=e.length;r<u;)n.push(me.call(e,r,r+=t));return n}function st(e,t){return e._chain?d(t).chain():t}function Vn(e){return Z(We(e),function(t){var n=d[t]=e[t];d.prototype[t]=function(){var r=[this._wrapped];return Jn.apply(r,arguments),st(this,n.apply(d,r))}}),d}Z(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=Ce[e];d.prototype[e]=function(){var n=this._wrapped;return n!=null&&(t.apply(n,arguments),(e==="shift"||e==="splice")&&n.length===0&&delete n[0]),st(this,n)}});Z(["concat","join","slice"],function(e){var t=Ce[e];d.prototype[e]=function(){var n=this._wrapped;return n!=null&&(n=t.apply(n,arguments)),st(this,n)}});const Al=Object.freeze(Object.defineProperty({__proto__:null,VERSION:Ft,after:Kr,all:zt,allKeys:_e,any:St,assign:Se,before:wn,bind:dn,bindAll:Wr,chain:Ur,chunk:El,clone:Or,collect:te,compact:vl,compose:Zr,constant:Kt,contains:J,countBy:il,create:Mr,debounce:Jr,default:d,defaults:fn,defer:Xr,delay:yn,detect:Xe,difference:Pn,drop:Ae,each:Z,escape:Cr,every:zt,extend:on,extendOwn:Se,filter:fe,find:Xe,findIndex:ot,findKey:En,findLastIndex:Mn,findWhere:jr,first:qe,flatten:pl,foldl:ke,foldr:It,forEach:Z,functions:We,get:hn,groupBy:Ye,has:zr,head:qe,identity:lt,include:J,includes:J,indexBy:al,indexOf:zn,initial:Dn,inject:ke,intersection:_l,invert:an,invoke:tl,isArguments:be,isArray:re,isArrayBuffer:Xt,isBoolean:Ut,isDataView:Ie,isDate:nr,isElement:tr,isEmpty:vr,isEqual:pr,isError:lr,isFinite:or,isFunction:C,isMap:_r,isMatch:tn,isNaN:Zt,isNull:er,isNumber:Wt,isObject:ne,isRegExp:rr,isSet:yr,isString:Ke,isSymbol:Gt,isTypedArray:jt,isUndefined:Ht,isWeakMap:dr,isWeakSet:wr,iteratee:at,keys:z,last:hl,lastIndexOf:br,map:te,mapObject:Sr,matcher:pe,matches:pe,max:Bn,memoize:Gr,methods:We,min:rl,mixin:Vn,negate:it,noop:pn,now:ge,object:yl,omit:cl,once:xr,pairs:Er,partial:ce,partition:ol,pick:Nn,pluck:ft,property:ut,propertyOf:Br,random:Ge,range:wl,reduce:ke,reduceRight:It,reject:el,rest:Ae,restArguments:D,result:kr,sample:Cn,select:fe,shuffle:ul,size:fl,some:St,sortBy:$n,sortedIndex:On,tail:Ae,take:qe,tap:Ir,template:Fr,templateSettings:Dr,throttle:Yr,times:Tr,toArray:Tn,toPath:cn,transpose:Qe,unescape:Nr,union:ml,uniq:Je,unique:Je,uniqueId:Hr,unzip:Qe,values:se,where:nl,without:gl,wrap:Qr,zip:dl},Symbol.toStringTag,{value:"Module"}));var Bt=Vn(Al);Bt._=Bt;function Tt(e,t,n){const r=e.slice();return r[9]=t[n],r}function Ct(e,t,n){const r=e.slice();return r[12]=t[n][0],r[13]=t[n][1],r}function $t(e,t,n){const r=e.slice();return r[16]=t[n],r}function Nt(e,t,n){const r=e.slice();return r[9]=t[n],r}function Dt(e){let t,n,r=e[9].name+"",u,l,a;return{c(){t=E("li"),n=E("a"),u=X(r),a=H(),this.h()},l(i){t=A(i,"LI",{});var o=I(t);n=A(o,"A",{class:!0,href:!0});var f=I(n);u=Y(f,r),f.forEach(m),a=U(o),o.forEach(m),this.h()},h(){y(n,"class",l="section "+(e[1]===Me(e[9].name)?"active":"")+" svelte-zeff0t"),y(n,"href","/components#"+Me(e[9].name))},m(i,o){N(i,t,o),_(t,n),_(n,u),_(t,a)},p(i,o){o&2&&l!==(l="section "+(i[1]===Me(i[9].name)?"active":"")+" svelte-zeff0t")&&y(n,"class",l)},d(i){i&&m(t)}}}function Ml(e){let t=e[16].slug+"",n;return{c(){n=X(t)},l(r){n=Y(r,t)},m(r,u){N(r,n,u)},p:Re,i:Re,o:Re,d(r){r&&m(n)}}}function Ol(e){let t,n,r;var u=e[16].component;function l(a){return{}}return u&&(t=ht(u,l())),{c(){t&&pt(t.$$.fragment),n=vt()},l(a){t&&Xn(t.$$.fragment,a),n=vt()},m(a,i){t&&gt(t,a,i),N(a,n,i),r=!0},p(a,i){if(u!==(u=a[16].component)){if(t){Te();const o=t;Q(o.$$.fragment,1,0,()=>{mt(o,1)}),Be()}u?(t=ht(u,l()),pt(t.$$.fragment),k(t.$$.fragment,1),gt(t,n.parentNode,n)):t=null}},i(a){r||(t&&k(t.$$.fragment,a),r=!0)},o(a){t&&Q(t.$$.fragment,a),r=!1},d(a){a&&m(n),t&&mt(t,a)}}}function Pt(e){let t,n,r,u,l=(e[16].name||Sl(e[16].slug))+"",a,i,o,f=e[16].classes.map(Tl).join("")+"",h,s,c,v,O;const S=[Ol,Ml],W=[];function q($,L){return $[16].component?0:1}return c=q(e),v=W[c]=S[c](e),{c(){t=E("div"),n=E("div"),r=E("span"),u=E("a"),a=X(l),i=H(),o=new Hn(!1),h=H(),s=E("div"),v.c(),this.h()},l($){t=A($,"DIV",{class:!0});var L=I(t);n=A(L,"DIV",{class:!0});var F=I(n);r=A(F,"SPAN",{});var G=I(r);u=A(G,"A",{href:!0,"sveltekit:prefetch":!0,class:!0});var ue=I(u);a=Y(ue,l),ue.forEach(m),G.forEach(m),i=U(F),o=Un(F,!1),F.forEach(m),h=U(L),s=A(L,"DIV",{class:!0});var he=I(s);v.l(he),he.forEach(m),L.forEach(m),this.h()},h(){y(u,"href","/components/"+e[16].slug),y(u,"sveltekit:prefetch",""),y(u,"class","svelte-zeff0t"),o.a=null,y(n,"class","component-name svelte-zeff0t"),y(s,"class","block-container svelte-zeff0t"),y(t,"class","component-block svelte-zeff0t")},m($,L){N($,t,L),_(t,n),_(n,r),_(r,u),_(u,a),_(n,i),o.m(f,n),_(t,h),_(t,s),W[c].m(s,null),O=!0},p($,L){v.p($,L)},i($){O||(k(v),O=!0)},o($){Q(v),O=!1},d($){$&&m(t),W[c].d()}}}function Vt(e){let t,n=Bl(e[12])+"",r,u,l,a,i=x(e[13]),o=[];for(let h=0;h<i.length;h+=1)o[h]=Pt($t(e,i,h));const f=h=>Q(o[h],1,1,()=>{o[h]=null});return{c(){t=E("h4"),r=X(n),u=H(),l=E("div");for(let h=0;h<o.length;h+=1)o[h].c();this.h()},l(h){t=A(h,"H4",{class:!0});var s=I(t);r=Y(s,n),s.forEach(m),u=U(h),l=A(h,"DIV",{class:!0});var c=I(l);for(let v=0;v<o.length;v+=1)o[v].l(c);c.forEach(m),this.h()},h(){y(t,"class","svelte-zeff0t"),y(l,"class","subgroup-blocks")},m(h,s){N(h,t,s),_(t,r),N(h,u,s),N(h,l,s);for(let c=0;c<o.length;c+=1)o[c]&&o[c].m(l,null);a=!0},p(h,s){if(s&4){i=x(h[13]);let c;for(c=0;c<i.length;c+=1){const v=$t(h,i,c);o[c]?(o[c].p(v,s),k(o[c],1)):(o[c]=Pt(v),o[c].c(),k(o[c],1),o[c].m(l,null))}for(Te(),c=i.length;c<o.length;c+=1)f(c);Be()}},i(h){if(!a){for(let s=0;s<i.length;s+=1)k(o[s]);a=!0}},o(h){o=o.filter(Boolean);for(let s=0;s<o.length;s+=1)Q(o[s]);a=!1},d(h){h&&(m(t),m(u),m(l)),Oe(o,h)}}}function Lt(e){let t,n=e[9].name+"",r,u,l,a,i,o=x(Object.entries(Ye(e[9].components,Rt))),f=[];for(let s=0;s<o.length;s+=1)f[s]=Vt(Ct(e,o,s));const h=s=>Q(f[s],1,1,()=>{f[s]=null});return{c(){t=E("h3"),r=X(n),u=H(),l=E("div");for(let s=0;s<f.length;s+=1)f[s].c();a=H(),this.h()},l(s){t=A(s,"H3",{id:!0,class:!0});var c=I(t);r=Y(c,n),c.forEach(m),u=U(s),l=A(s,"DIV",{class:!0});var v=I(l);for(let O=0;O<f.length;O+=1)f[O].l(v);a=U(v),v.forEach(m),this.h()},h(){y(t,"id",Me(e[9].name)),y(t,"class","svelte-zeff0t"),y(l,"class","component-blocks svelte-zeff0t")},m(s,c){N(s,t,c),_(t,r),N(s,u,c),N(s,l,c);for(let v=0;v<f.length;v+=1)f[v]&&f[v].m(l,null);_(l,a),i=!0},p(s,c){if(c&4){o=x(Object.entries(Ye(s[9].components,Rt)));let v;for(v=0;v<o.length;v+=1){const O=Ct(s,o,v);f[v]?(f[v].p(O,c),k(f[v],1)):(f[v]=Vt(O),f[v].c(),k(f[v],1),f[v].m(l,a))}for(Te(),v=o.length;v<f.length;v+=1)h(v);Be()}},i(s){if(!i){for(let c=0;c<o.length;c+=1)k(f[c]);i=!0}},o(s){f=f.filter(Boolean);for(let c=0;c<f.length;c+=1)Q(f[c]);i=!1},d(s){s&&(m(t),m(u),m(l)),Oe(f,s)}}}function Il(e){let t,n,r,u,l,a,i,o,f="Components",h,s,c,v='Because Layer Cake doesn&#39;t come with any pre-built components, here are a few options to get you started. These are meant to serve as starting points for many common chart types. They have a few built-in options to be flexible for handling different scenarios so they can be reused as much as possible. For example, the <a href="/components/Scatter.svg.svelte" sveltekit:prefetch="" target="_blank" class="svelte-zeff0t">Scatter</a> components support both linear and ordinal scales so you can use them in configurations like a regular <a href="/example/Scatter" sveltekit:prefetch="" target="_blank" class="svelte-zeff0t">Scatter plot</a> but also charts like the <a href="/example/Timeplot" sveltekit:prefetch="" target="_blank" class="svelte-zeff0t">Time of Day</a> plot where the y-scale is made up of groups.',O,S,W,q,$="%-range",L,F,G,ue,he=!0+"",Ne,De,Pe,we,ae=x(e[2]),B=[];for(let p=0;p<ae.length;p+=1)B[p]=Dt(Nt(e,ae,p));let j=x(e[2]),w=[];for(let p=0;p<j.length;p+=1)w[p]=Lt(Tt(e,j,p));const Ln=p=>Q(w[p],1,1,()=>{w[p]=null});return{c(){t=E("meta"),n=E("meta"),r=H(),u=E("sidebar"),l=E("ul");for(let p=0;p<B.length;p+=1)B[p].c();a=H(),i=E("div"),o=E("h2"),o.textContent=f,h=H(),s=E("div"),c=E("p"),c.innerHTML=v,O=H(),S=E("p"),W=X("Some componens have HTML, SVG and Canvas versions and those marked as "),q=E("span"),q.textContent=$,L=X(" are optimized to be used server-side with the "),F=E("a"),G=E("code"),ue=X("percentRange="),Ne=X(he),De=X(" prop."),Pe=H();for(let p=0;p<w.length;p+=1)w[p].c();this.h()},l(p){const M=Fn("svelte-18cdw4k",document.head);t=A(M,"META",{name:!0,content:!0}),n=A(M,"META",{name:!0,content:!0}),M.forEach(m),r=U(p),u=A(p,"SIDEBAR",{class:!0});var g=I(u);l=A(g,"UL",{class:!0});var K=I(l);for(let ee=0;ee<B.length;ee+=1)B[ee].l(K);K.forEach(m),g.forEach(m),a=U(p),i=A(p,"DIV",{id:!0,class:!0});var ie=I(i);o=A(ie,"H2",{class:!0,["data-svelte-h"]:!0}),Le(o)!=="svelte-1bt7j1y"&&(o.textContent=f),h=U(ie),s=A(ie,"DIV",{id:!0,class:!0});var Ee=I(s);c=A(Ee,"P",{["data-svelte-h"]:!0}),Le(c)!=="svelte-1c478b8"&&(c.innerHTML=v),O=U(Ee),S=A(Ee,"P",{});var oe=I(S);W=Y(oe,"Some componens have HTML, SVG and Canvas versions and those marked as "),q=A(oe,"SPAN",{class:!0,["data-svelte-h"]:!0}),Le(q)!=="svelte-173bgpn"&&(q.textContent=$),L=Y(oe," are optimized to be used server-side with the "),F=A(oe,"A",{href:!0,class:!0});var ct=I(F);G=A(ct,"CODE",{class:!0});var Ve=I(G);ue=Y(Ve,"percentRange="),Ne=Y(Ve,he),Ve.forEach(m),ct.forEach(m),De=Y(oe," prop."),oe.forEach(m),Ee.forEach(m),Pe=U(ie);for(let ee=0;ee<w.length;ee+=1)w[ee].l(ie);ie.forEach(m),this.h()},h(){document.title="LayerCake - Component gallery",y(t,"name","og:title"),y(t,"content","Layer Cake — Component gallery"),y(n,"name","twitter:title"),y(n,"content","Layer Cake — Component gallery"),y(l,"class","svelte-zeff0t"),y(u,"class","svelte-zeff0t"),y(o,"class","svelte-zeff0t"),y(q,"class","label percent-range svelte-zeff0t"),y(G,"class","svelte-zeff0t"),y(F,"href","/guide#percentrange"),y(F,"class","svelte-zeff0t"),y(s,"id","dek"),y(s,"class","svelte-zeff0t"),y(i,"id","container"),y(i,"class","svelte-zeff0t")},m(p,M){_(document.head,t),_(document.head,n),N(p,r,M),N(p,u,M),_(u,l);for(let g=0;g<B.length;g+=1)B[g]&&B[g].m(l,null);N(p,a,M),N(p,i,M),_(i,o),_(i,h),_(i,s),_(s,c),_(s,O),_(s,S),_(S,W),_(S,q),_(S,L),_(S,F),_(F,G),_(G,ue),_(G,Ne),_(S,De),_(i,Pe);for(let g=0;g<w.length;g+=1)w[g]&&w[g].m(i,null);e[3](i),we=!0},p(p,[M]){if(M&6){ae=x(p[2]);let g;for(g=0;g<ae.length;g+=1){const K=Nt(p,ae,g);B[g]?B[g].p(K,M):(B[g]=Dt(K),B[g].c(),B[g].m(l,null))}for(;g<B.length;g+=1)B[g].d(1);B.length=ae.length}if(M&4){j=x(p[2]);let g;for(g=0;g<j.length;g+=1){const K=Tt(p,j,g);w[g]?(w[g].p(K,M),k(w[g],1)):(w[g]=Lt(K),w[g].c(),k(w[g],1),w[g].m(i,null))}for(Te(),g=j.length;g<w.length;g+=1)Ln(g);Be()}},i(p){if(!we){for(let M=0;M<j.length;M+=1)k(w[M]);we=!0}},o(p){w=w.filter(Boolean);for(let M=0;M<w.length;M+=1)Q(w[M]);we=!1},d(p){p&&(m(r),m(u),m(a),m(i)),m(t),m(n),Oe(B,p),Oe(w,p),e[3](null)}}}function zl(e){const t=e.split(".").filter(n=>n!=="svelte");return t.shift(),t.length===0?["svg"]:t}function Sl(e){return e.split(".")[0]}function Bl(e){return e=="webgl"?"WebGL":e=="canvas"?"Canvas":e.toUpperCase()}function Me(e){return e.toLowerCase().split(" ")[0]}const Rt=e=>e.group,Tl=e=>`<span class="label ${e}">${e.replace("percent-","%-")}</span>`;function Cl(e,t,n){const r=Yn.map(c=>({name:`${c.name.replace(/^\w/,v=>v.toUpperCase())} components`,components:$n(c.components,"slug").map(({name:v,slug:O,component:S})=>{const W=zl(O);return{name:v,slug:O,component:S,classes:W,group:W.filter(q=>q!=="percent-range")[0]}})}));let u,l=[],a="axis",i="axis",o=[];kn(()=>{typeof window<"u"&&(o=u.querySelectorAll("[id]"),a=window.location.hash.slice(1),n(1,i=a||"axis"),f(),h(),window.addEventListener("scroll",h,!0),window.addEventListener("resize",f,!0),setTimeout(f,1e3),setTimeout(f,5e3))});function f(){if(u){const{top:c}=u.getBoundingClientRect();l=[].map.call(o,v=>v.getBoundingClientRect().top-c)}}function h(){const c=-window.scrollY;let v=o.length;for(;v--;)if(l[v]+c<100){const O=o[v],{id:S}=O;S!==a&&(n(1,i=S),a=S);return}}function s(c){qn[c?"unshift":"push"](()=>{u=c,n(0,u)})}return[u,i,r,s]}class Vl extends Wn{constructor(t){super(),Gn(this,t,Cl,Il,Rn,{})}}export{Vl as component};
