import{S as y,i as k,s as v,e as B,t as D,c as x,a as O,h as C,d as g,b as w,f as N,g as S,G as T,N as q,H as _,aP as z}from"./vendor-2ea78382.js";import{k as E}from"./Brush.html-f1e0b39f.js";import{d as I}from"./downloadBlob-f865e357.js";function J(r){let e,o,t,p;return{c(){e=B("button"),o=D("Download \xA0\xA0\xA0\xA0\xA0"),this.h()},l(l){e=x(l,"BUTTON",{title:!0,class:!0,style:!0});var c=O(e);o=C(c,"Download \xA0\xA0\xA0\xA0\xA0"),c.forEach(g),this.h()},h(){e.disabled=r[0],w(e,"title","download zip file"),w(e,"class","icon svelte-1gef78k"),N(e,"background-image","url(/icons/download.svg)")},m(l,c){S(l,e,c),T(e,o),t||(p=q(e,"click",r[1]),t=!0)},p(l,[c]){c&1&&(e.disabled=l[0])},i:_,o:_,d(l){l&&g(e),t=!1,p()}}}function L(r=""){return(r.match(/from\s'(.+)'?/gm)||[]).map(t=>t.replace(/(from |'|"|;)/g,"")).filter(t=>!t.startsWith("."))}function M(r,e,o){let{data:t={}}=e,{slug:p}=e,{ssr:l=!1}=e,c=!1;const f=[t.main,...t.components,...t.componentComponents].reduce((a,n)=>a.concat(L(n.contents)),[]).reduce((a,n)=>(a.includes(n)||a.push(n),a),[]);async function j(){o(0,c=!0);const a=new Date().getTime(),n=await(await window.fetch(`/svelte-app.json?${a}`)).json(),d=await(await window.fetch(`/deps.json?${a}`)).json();if(f.length>0){const s=n.findIndex(({path:i})=>i==="package.json"),u=JSON.parse(n[s].data),h={},m={};f.forEach(i=>{if(i==="layercake")m[i]=d[i];else{if(i==="svelte")return;h[i]=d[i]}d[i]||window.alert(`Missing dependency, add "${i}" to layercake.graphic's package.json`)}),Object.assign(u.dependencies,h),Object.assign(u.devDependencies,m),n[s].data=JSON.stringify(u,null,"  ")}n.push(...t.components.map(s=>({path:`src/routes/${s.title.replace("./","")}`,data:s.contents}))),n.push(...t.modules.map(s=>({path:`src/routes/${s.title.replace("./","")}`,data:s.contents}))),n.push(...t.componentModules.map(s=>({path:`src/routes/${s.title.replace("../","")}`,data:s.contents}))),n.push(...t.componentComponents.map(s=>({path:`src/routes/${s.title}`,data:s.contents}))),n.push(...t.csvs.map(s=>({path:`src/routes/${s.title.replace("../","")}`,data:s.contents}))),n.push(...t.jsons.map(s=>({path:`src/routes/${s.title.replace("../","")}`,data:s.contents}))),n.push({path:"src/routes/index.svelte",data:t.main.contents}),console.log("here");const b=E(n.filter(Boolean),"path",!1);I(z(b),`layercake-${l?"ssr-":""}${p}.zip`),o(0,c=!1)}return r.$$set=a=>{"data"in a&&o(2,t=a.data),"slug"in a&&o(3,p=a.slug),"ssr"in a&&o(4,l=a.ssr)},[c,j,t,p,l]}class G extends y{constructor(e){super();k(this,e,M,J,v,{data:2,slug:3,ssr:4})}}function H(r){const e=r.split("/"),o=e[e.length-1].split(".");return o.pop(),o.join(".").toLowerCase()}export{G as D,H as c};