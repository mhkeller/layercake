import{e as k,b as D,t as y}from"./BBz-090T.js";import{z as $,G as x,A as B,P as g,w as O,M as z}from"./Cxro91qv.js";import{i as C}from"./BZkFnTQF.js";import{p as d}from"./IEQ67wLA.js";import{d as M,t as A}from"./DPn4pLDi.js";import{u as I}from"./Cwne2hEM.js";var J=y('<button title="download zip file" class="icon svelte-lkwcax" style="background-image: url(/icons/download.svg)">Download &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>');function q(p,n){$(n,!1);let s=d(n,"data",24,()=>({})),m=d(n,"slug",8),w=d(n,"ssr",8,!1),i=z(!1);function b(a=""){return(a.match(/from\s'(.+)'?/gm)||[]).map(c=>c.replace(/(from |'|"|;)/g,"")).filter(c=>!c.startsWith("."))}const f=[s().main,...s().components,...s().componentComponents].reduce((a,e)=>a.concat(b(e.contents)),[]).reduce((a,e)=>(a.includes(e)||a.push(e),a),[]);async function j(){g(i,!0);const a=new Date().getTime(),e=await(await window.fetch(`/svelte-app.json?${a}`)).json(),r=await(await window.fetch(`/deps.json?${a}`)).json();if(f.length>0){const t=e.findIndex(({path:o})=>o==="package.json"),u=JSON.parse(e[t].data),h={},v={};f.forEach(o=>{o!=="svelte"&&(h[o]=r[o],r[o]||window.alert(`Missing dependency, add "${o}" to this repo's package.json`))}),Object.assign(u.dependencies,h),Object.assign(u.devDependencies,v),e[t].data=JSON.stringify(u,null,"  ")}e.push(...s().components.map(t=>({path:`src/routes/${t.title.replace("./","")}`,data:t.contents}))),e.push(...s().modules.map(t=>({path:`src/routes/${t.title.replace("./","")}`,data:t.contents}))),e.push(...s().componentModules.map(t=>({path:`src/routes/${t.title.replace("../","")}`,data:t.contents}))),e.push(...s().componentComponents.map(t=>({path:`src/routes/${t.title}`,data:t.contents}))),e.push(...s().csvs.map(t=>({path:`src/routes/${t.title.replace("../","")}`,data:t.contents}))),e.push(...s().jsons.map(t=>({path:`src/routes/${t.title.replace("../","")}`,data:t.contents}))),e.push({path:"src/routes/+page.svelte",data:s().main.contents});const c=I(e.filter(Boolean),"path",!1);M(A(c),`layercake-${w()?"ssr-":""}${m()}.zip`),g(i,!1)}C();var l=J();x(()=>l.disabled=O(i)),k("click",l,j),D(p,l),B()}function E(p){const n=p.split("/"),s=n[n.length-1].split(".");return s.pop(),s.join(".").toLowerCase()}export{q as D,E as c};
