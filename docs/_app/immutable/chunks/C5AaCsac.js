import{ak as sr,b as tr,al as j,h as T,s as H,c as ur,x as K,f as lr,r as P,g as R,d as C,i as y,a as rr,p as vr,am as D,an as ar,a2 as or,Y as X,ao as q,ap as $,aq as Y,ar as cr,as as dr,at as hr,n as gr,m as _r,z as pr,a0 as Ar,au as Er,av as Nr,a3 as Tr,V as F,aw as Ir,j as br,ax as Sr,ay as Mr,_ as Cr,az as Lr,aA as Or}from"./DGgq1KgZ.js";import{f as wr}from"./CS1UFJiM.js";function Gr(r,a){return a}function Hr(r,a,e,f){for(var i=[],s=a.length,u=0;u<s;u++)cr(a[u].e,i,!0);var l=s>0&&i.length===0&&e!==null;if(l){var g=e.parentNode;dr(g),g.append(e),f.clear(),S(r,a[0].prev,a[s-1].next)}hr(i,()=>{for(var h=0;h<s;h++){var o=a[h];l||(f.delete(o.k),S(r,o.prev,o.next)),gr(o.e,!l)}})}function Kr(r,a,e,f,i,s=null){var u=r,l={flags:a,items:new Map,first:null},g=(a&j)!==0;if(g){var h=r;u=T?H(_r(h)):h.appendChild(sr())}T&&ur();var o=null,_=!1,n=pr(()=>{var d=e();return Ar(d)?d:d==null?[]:ar(d)});tr(()=>{var d=K(n),t=d.length;if(_&&t===0)return;_=t===0;let E=!1;if(T){var A=u.data===lr;A!==(t===0)&&(u=P(),H(u),R(!1),E=!0)}if(T){for(var N=null,I,p=0;p<t;p++){if(C.nodeType===8&&C.data===Er){u=C,E=!0,R(!1);break}var v=d[p],c=f(v,p);I=er(C,l,N,null,v,c,p,i,a,e),l.items.set(c,I),N=I}t>0&&H(P())}T||Rr(d,l,u,i,a,f,e),s!==null&&(t===0?o?y(o):o=rr(()=>s(u)):o!==null&&vr(o,()=>{o=null})),E&&R(!0),K(n)}),T&&(u=C)}function Rr(r,a,e,f,i,s,u){var V,x,z,B;var l=(i&Nr)!==0,g=(i&(q|Y))!==0,h=r.length,o=a.items,_=a.first,n=_,d,t=null,E,A=[],N=[],I,p,v,c;if(l)for(c=0;c<h;c+=1)I=r[c],p=s(I,c),v=o.get(p),v!==void 0&&((V=v.a)==null||V.measure(),(E??(E=new Set)).add(v));for(c=0;c<h;c+=1){if(I=r[c],p=s(I,c),v=o.get(p),v===void 0){var ir=n?n.e.nodes_start:e;t=er(ir,a,t,t===null?a.first:t.next,I,p,c,f,i,u),o.set(p,t),A=[],N=[],n=t.next;continue}if(g&&Dr(v,I,c,i),v.e.f&D&&(y(v.e),l&&((x=v.a)==null||x.unfix(),(E??(E=new Set)).delete(v))),v!==n){if(d!==void 0&&d.has(v)){if(A.length<N.length){var L=N[0],b;t=L.prev;var U=A[0],O=A[A.length-1];for(b=0;b<A.length;b+=1)J(A[b],L,e);for(b=0;b<N.length;b+=1)d.delete(N[b]);S(a,U.prev,O.next),S(a,t,U),S(a,O,L),n=L,t=O,c-=1,A=[],N=[]}else d.delete(v),J(v,n,e),S(a,v.prev,v.next),S(a,v,t===null?a.first:t.next),S(a,t,v),t=v;continue}for(A=[],N=[];n!==null&&n.k!==p;)n.e.f&D||(d??(d=new Set)).add(n),N.push(n),n=n.next;if(n===null)continue;v=n}A.push(v),t=v,n=v.next}if(n!==null||d!==void 0){for(var M=d===void 0?[]:ar(d);n!==null;)n.e.f&D||M.push(n),n=n.next;var w=M.length;if(w>0){var nr=i&j&&h===0?e:null;if(l){for(c=0;c<w;c+=1)(z=M[c].a)==null||z.measure();for(c=0;c<w;c+=1)(B=M[c].a)==null||B.fix()}Hr(a,M,nr,o)}}l&&or(()=>{var G;if(E!==void 0)for(v of E)(G=v.a)==null||G.apply()}),X.first=a.first&&a.first.e,X.last=t&&t.e}function Dr(r,a,e,f){f&q&&$(r.v,a),f&Y?$(r.i,e):r.i=e}function er(r,a,e,f,i,s,u,l,g,h){var o=(g&q)!==0,_=(g&Ir)===0,n=o?_?Tr(i):F(i):i,d=g&Y?F(u):u,t={i:d,v:n,k:s,a:null,e:null,prev:e,next:f};try{return t.e=rr(()=>l(r,n,d,h),T),t.e.prev=e&&e.e,t.e.next=f&&f.e,e===null?a.first=t:(e.next=t,e.e.next=t.e),f!==null&&(f.prev=t,f.e.prev=t.e),t}finally{}}function J(r,a,e){for(var f=r.next?r.next.e.nodes_start:e,i=a?a.e.nodes_start:e,s=r.e.nodes_start;s!==f;){var u=br(s);i.before(s),s=u}}function S(r,a,e){a===null?r.first=e:(a.next=e,a.e.next=e&&e.e),e!==null&&(e.prev=a,e.e.prev=a&&a.e)}function fr(r){var a,e,f="";if(typeof r=="string"||typeof r=="number")f+=r;else if(typeof r=="object")if(Array.isArray(r)){var i=r.length;for(a=0;a<i;a++)r[a]&&(e=fr(r[a]))&&(f&&(f+=" "),f+=e)}else for(e in r)r[e]&&(f&&(f+=" "),f+=e);return f}function kr(){for(var r,a,e=0,f="",i=arguments.length;e<i;e++)(r=arguments[e])&&(a=fr(r))&&(f&&(f+=" "),f+=a);return f}function Pr(r){return typeof r=="object"?kr(r):r??""}const Q=[...` 	
\r\f \v\uFEFF`];function qr(r,a,e){var f=r==null?"":""+r;if(a&&(f=f?f+" "+a:a),e){for(var i in e)if(e[i])f=f?f+" "+i:i;else if(f.length)for(var s=i.length,u=0;(u=f.indexOf(i,u))>=0;){var l=u+s;(u===0||Q.includes(f[u-1]))&&(l===f.length||Q.includes(f[l]))?f=(u===0?"":f.substring(0,u))+f.substring(l+1):u=l}}return f===""?null:f}function W(r,a=!1){var e=a?" !important;":";",f="";for(var i in r){var s=r[i];s!=null&&s!==""&&(f+=" "+i+": "+s+e)}return f}function k(r){return r[0]!=="-"||r[1]!=="-"?r.toLowerCase():r}function Xr(r,a){if(a){var e="",f,i;if(Array.isArray(a)?(f=a[0],i=a[1]):f=a,r){r=String(r).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var s=!1,u=0,l=!1,g=[];f&&g.push(...Object.keys(f).map(k)),i&&g.push(...Object.keys(i).map(k));var h=0,o=-1;const E=r.length;for(var _=0;_<E;_++){var n=r[_];if(l?n==="/"&&r[_-1]==="*"&&(l=!1):s?s===n&&(s=!1):n==="/"&&r[_+1]==="*"?l=!0:n==='"'||n==="'"?s=n:n==="("?u++:n===")"&&u--,!l&&s===!1&&u===0){if(n===":"&&o===-1)o=_;else if(n===";"||_===E-1){if(o!==-1){var d=k(r.substring(h,o).trim());if(!g.includes(d)){n!==";"&&_++;var t=r.substring(h,_).trim();e+=" "+t+";"}}h=_+1,o=-1}}}}return f&&(e+=W(f)),i&&(e+=W(i,!0)),e=e.trim(),e===""?null:e}return r==null?null:String(r)}function $r(r,a,e,f,i,s){var u=r.__className;if(T||u!==e){var l=qr(e,f,s);(!T||l!==r.getAttribute("class"))&&(l==null?r.removeAttribute("class"):a?r.className=l:r.setAttribute("class",l)),r.__className=e}else if(s&&i!==s)for(var g in s){var h=!!s[g];(i==null||h!==!!i[g])&&r.classList.toggle(g,h)}return s}const Yr=Symbol("is custom element"),Ur=Symbol("is html");function Fr(r){if(T){var a=!1,e=()=>{if(!a){if(a=!0,r.hasAttribute("value")){var f=r.value;Z(r,"value",null),r.value=f}if(r.hasAttribute("checked")){var i=r.checked;Z(r,"checked",null),r.checked=i}}};r.__on_r=e,Lr(e),wr()}}function Z(r,a,e,f){var i=Vr(r);T&&(i[a]=r.getAttribute(a),a==="src"||a==="srcset"||a==="href"&&r.nodeName==="LINK")||i[a]!==(i[a]=e)&&(a==="loading"&&(r[Sr]=e),e==null?r.removeAttribute(a):typeof e!="string"&&xr(r).includes(a)?r[a]=e:r.setAttribute(a,e))}function Vr(r){return r.__attributes??(r.__attributes={[Yr]:r.nodeName.includes("-"),[Ur]:r.namespaceURI===Mr})}var m=new Map;function xr(r){var a=m.get(r.nodeName);if(a)return a;m.set(r.nodeName,a=[]);for(var e,f=r,i=Element.prototype;i!==f;){e=Or(f);for(var s in e)e[s].set&&a.push(s);f=Cr(f)}return a}export{Z as a,Pr as c,Kr as e,Gr as i,Fr as r,$r as s,Xr as t};
