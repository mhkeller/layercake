import{e as r}from"./index-4d8f42c1.js";async function l({fetch:n,params:a}){const{slug:o}=a,t=`${o}.json`,e=await n(t),s=await e.json();if(e.status===200)return{slug:o,content:s,active:o};throw r(500,`Could not load ${t}: ${s.message}`)}const u=Object.freeze(Object.defineProperty({__proto__:null,load:l},Symbol.toStringTag,{value:"Module"}));export{u as _,l};