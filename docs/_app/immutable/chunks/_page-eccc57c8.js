import{e as a}from"./index-1885ff30.js";const c=!0;async function l({fetch:s,params:n}){const{slug:e}=n,t=`${e}.json`,o=await s(t),r=await o.json();if(o.status===200)return{slug:e,content:r,active:e};throw a(500,`Could not load ${t}: ${r.message}`)}const i=Object.freeze(Object.defineProperty({__proto__:null,load:l,prerender:c},Symbol.toStringTag,{value:"Module"}));export{i as _,l,c as p};
