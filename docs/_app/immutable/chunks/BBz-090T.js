import{aF as W,a2 as $,az as Y,a0 as B,ai as b,b as j,aG as q,h,aH as k,i as R,g as E,s as N,d as u,l as m,Y as M,aI as F,aJ as z,c as H,aK as C,k as A,at as G,j as U,aL as J,ar as K,ak as Q,aM as X,a as Z,z as x,A as ee,o as re}from"./Cxro91qv.js";const ae=new Set,I=new Set;function te(e,r,a,s){function n(t){if(s.capture||T.call(r,t),!t.cancelBubble)return a.call(this,t)}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?$(()=>{r.addEventListener(e,n,s)}):r.addEventListener(e,n,s),n}function fe(e,r,a,s,n){var t={capture:s,passive:n},i=te(e,r,a,t);(r===document.body||r===window||r===document)&&W(()=>{r.removeEventListener(e,i,t)})}function T(e){var O;var r=this,a=r.ownerDocument,s=e.type,n=((O=e.composedPath)==null?void 0:O.call(e))||[],t=n[0]||e.target,i=0,p=e.__root;if(p){var f=n.indexOf(p);if(f!==-1&&(r===document||r===window)){e.__root=r;return}var l=n.indexOf(r);if(l===-1)return;f<=l&&(i=f)}if(t=n[i]||e.target,t!==r){Y(e,"currentTarget",{configurable:!0,get(){return t||a}});try{for(var y,c=[];t!==null;){var d=t.assignedSlot||t.parentNode||t.host||null;try{var o=t["__"+s];if(o!==void 0&&!t.disabled)if(B(o)){var[g,...L]=o;g.apply(t,[e,...L])}else o.call(t,e)}catch(S){y?c.push(S):y=S}if(e.cancelBubble||d===r||d===null)break;t=d}if(y){for(let S of c)queueMicrotask(()=>{throw S});throw y}}finally{e.__root=r,delete e.currentTarget}}}let _;function ne(){_=void 0}function le(e){let r=null,a=h;var s;if(h){for(r=u,_===void 0&&(_=m(document.head));_!==null&&(_.nodeType!==8||_.data!==k);)_=R(_);_===null?E(!1):_=N(R(_))}h||(s=document.head.appendChild(b()));try{j(()=>e(s),q)}finally{a&&(E(!0),_=u,N(r))}}function P(e){var r=document.createElement("template");return r.innerHTML=e,r.content}function v(e,r){var a=M;a.nodes_start===null&&(a.nodes_start=e,a.nodes_end=r)}function ce(e,r){var a=(r&F)!==0,s=(r&z)!==0,n,t=!e.startsWith("<!>");return()=>{if(h)return v(u,null),u;n===void 0&&(n=P(t?e:"<!>"+e),a||(n=m(n)));var i=s?document.importNode(n,!0):n.cloneNode(!0);if(a){var p=m(i),f=i.lastChild;v(p,f)}else v(i,i);return i}}function _e(e,r,a="svg"){var s=!e.startsWith("<!>"),n=(r&F)!==0,t=`<${a}>${s?e:"<!>"+e}</${a}>`,i;return()=>{if(h)return v(u,null),u;if(!i){var p=P(t),f=m(p);if(n)for(i=document.createDocumentFragment();m(f);)i.appendChild(m(f));else i=m(f)}var l=i.cloneNode(!0);if(n){var y=m(l),c=l.lastChild;v(y,c)}else v(l,l);return l}}function he(e=""){if(!h){var r=b(e+"");return v(r,r),r}var a=u;return a.nodeType!==3&&(a.before(a=b()),N(a)),v(a,a),a}function ve(){if(h)return v(u,null),u;var e=document.createDocumentFragment(),r=document.createComment(""),a=b();return e.append(r,a),v(r,a),e}function pe(e,r){if(h){M.nodes_end=u,H();return}e!==null&&e.before(r)}const ie=["touchstart","touchmove"];function se(e){return ie.includes(e)}function me(e,r){var a=r==null?"":typeof r=="object"?r+"":r;a!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=a,e.nodeValue=a==null?"":a+"")}function oe(e,r){return V(e,r)}function ye(e,r){C(),r.intro=r.intro??!1;const a=r.target,s=h,n=u;try{for(var t=m(a);t&&(t.nodeType!==8||t.data!==k);)t=R(t);if(!t)throw A;E(!0),N(t),H();const i=V(e,{...r,anchor:t});if(u===null||u.nodeType!==8||u.data!==G)throw U(),A;return E(!1),i}catch(i){if(i===A)return r.recover===!1&&J(),C(),K(a),E(!1),oe(e,r);throw i}finally{E(s),N(n),ne()}}const w=new Map;function V(e,{target:r,anchor:a,props:s={},events:n,context:t,intro:i=!0}){C();var p=new Set,f=c=>{for(var d=0;d<c.length;d++){var o=c[d];if(!p.has(o)){p.add(o);var g=se(o);r.addEventListener(o,T,{passive:g});var L=w.get(o);L===void 0?(document.addEventListener(o,T,{passive:g}),w.set(o,1)):w.set(o,L+1)}}};f(Q(ae)),I.add(f);var l=void 0,y=X(()=>{var c=a??r.appendChild(b());return Z(()=>{if(t){x({});var d=re;d.c=t}n&&(s.$$events=n),h&&v(c,null),l=e(c,s)||{},h&&(M.nodes_end=u),t&&ee()}),()=>{var g;for(var d of p){r.removeEventListener(d,T);var o=w.get(d);--o===0?(document.removeEventListener(d,T),w.delete(d)):w.set(d,o)}I.delete(f),D.delete(l),c!==a&&((g=c.parentNode)==null||g.removeChild(c))}});return D.set(l,y),l}let D=new WeakMap;function ge(e){const r=D.get(e);r&&r()}const de="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(de);export{v as a,pe as b,P as c,ve as d,fe as e,ye as f,he as g,le as h,oe as m,_e as n,me as s,ce as t,ge as u};
