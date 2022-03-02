var T=Object.defineProperty;var N=Object.getOwnPropertySymbols;var j=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var S=(e,t,r)=>t in e?T(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,O=(e,t)=>{for(var r in t||(t={}))j.call(t,r)&&S(e,r,t[r]);if(N)for(var r of N(t))z.call(t,r)&&S(e,r,t[r]);return e};var w=(e,t,r)=>(S(e,typeof t!="symbol"?t+"":t,r),r);import{j as C,R as L,K as M,r as B,m as o,i as P,a as q}from"./vendor.4db264cc.js";const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}};F();const i=C.exports.jsx,v=C.exports.jsxs;class H extends L.Component{constructor(t){super(t);w(this,"pathRef1");w(this,"pathRef2");this.pathRef1=L.createRef(),this.pathRef2=L.createRef()}componentDidMount(){M.fromTo(this.pathRef1.current,{path:this.pathRef1.current},{path:this.pathRef2.current},{repeat:9999,duration:3e3,yoyo:!0}).start(null)}render(){return v("header",{className:"Header","aria-label":"Logo Odek AS",children:[i("div",{className:"header-content",children:i("button",{className:"logo-button button-but-not button-start-game",type:"button","aria-label":"Klikk for \xE5 pr\xF8ve et lite spill"})}),v("svg",{"data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1200 60",preserveAspectRatio:"none",children:[i("title",{children:"Curves for layout"}),i("path",{d:"M 1220,29.73833 V 0 H -20 V 37.875952 C 26.020383,54.023649 79.557403,60.77598 130.12926,59.929601 210.61218,58.582625 296.85628,7.822943 367.7482,16.856665 520.67612,36.344195 446.65676,99.056879 696.38459,16.929698 752.27272,-1.4500497 815.42233,86.987906 945.26604,35.556151 1043.7762,-3.4642067 1051.526,48.618078 1104.7882,46.588413 1143.5717,45.110489 1159.2032,40.71835 1220,29.73833 Z",className:"shape-fill",ref:this.pathRef1}),i("path",{d:"M 1220,35.685582 V 0 H -20 c 0,0 -6.567187,21.72741 0,27.959071 C 20.808323,66.682445 88.892661,12.142715 143.72024,9.5777427 274.12385,3.4771348 295.4616,120.86629 535.25613,16.762442 c 88.71212,-38.513278 212.51012,84.860368 318.32386,9.155378 66.20744,-47.368453 162.61541,33.111422 244.77901,31.157073 41.0956,-0.977505 101.4862,0.005 121.641,-21.389311 z",className:"shape-fill",ref:this.pathRef2,visibility:"hidden"})]})]})}}function V(e){const t=s=>{s.currentTarget.classList.add("on-drag-start"),e.onDragStart(s,e.index)},r=s=>{e.isUsed||s.currentTarget.classList.remove("on-drag-start")};return i("span",{className:`DragSquare ${e.isUsed?"on-drag-start":""}`,draggable:!e.isUsed,onDragStart:s=>t(s),onDragEnd:s=>r(s),children:e.char})}function $(e){const t=n=>{n.currentTarget.classList.add("on-drag-over"),n.preventDefault()},r=n=>{n.currentTarget.classList.remove("on-drag-over")},s=n=>{e.onDragOver(n)},a=n=>{n.currentTarget.classList.remove("on-drag-over"),e.onDrop(n,e.index)};return i("span",{className:"DropSquare",onDragOver:n=>s(n),onDragEnter:n=>t(n),onDragLeave:n=>r(n),onDrop:n=>a(n),children:e.char})}function K(e){const[t,r]=B.exports.useState(Array.from(e.anagram)),[s,a]=B.exports.useState(Array(e.solution.length).fill("")),n=()=>{r(Array.from(e.anagram)),a(Array(e.solution.length).fill(""))},f=(l,p)=>{l.dataTransfer.setData("index",p)},y=l=>{l.preventDefault()},E=(l,p)=>{var h=l.dataTransfer.getData("index");const D=[...s];D[p]=t[h],a(D),l.preventDefault()},c=s.includes("")?null:s.join("")===e.solution,b=l=>{if(l===null)return i("div",{});if(l===!0)return i("div",{children:"Oh yeah!"});if(l===!1)return v("div",{children:["Ikke helt riktig det der."," ",i("button",{className:"button-but-not button-as-link",onClick:()=>n(),children:"Pr\xF8v igjen!"})]})};return v("div",{className:"AnagramPuzzle",children:[i("div",{className:"puzzle",children:t.map((l,p)=>i(V,{isUsed:s.includes(l),char:l,index:p,onDragStart:(h,D)=>f(h,D)},p))}),i("div",{className:"solution",children:s.map((l,p)=>i($,{char:l,index:p,onDragOver:h=>y(h),onDrop:h=>E(h,p)},p))}),i("div",{className:"description",children:b(c)})]})}function U(){return v("div",{className:"App",children:[i(H,{}),v("main",{children:[i("p",{children:"Hei og velkommen til Odek AS sine hjemmesider. Det kommer enda mer her snart."}),i("div",{className:"anagram-puzzle",children:i(K,{anagram:"ODEK",solution:"KODE"})}),v("p",{children:["Bare ta kontakt med Jostein p\xE5 ",i("a",{href:"mailto:jostein@odek.no",children:"jostein@odek.no"})," dersom du lurer p\xE5 noe."]})]})]})}var G="/assets/favicon.c050ce20.svg";let d,m,u,x,R=!1;const A=window.innerWidth,k=window.innerHeight;let g=window.devicePixelRatio;g!==1&&g!==2&&g!==3&&(g=1);function J(e){d=o.exports.Engine.create(),d.gravity.y=0,m=o.exports.Render.create({element:e,engine:d,options:{width:A,height:k,background:"#E6F4F1",wireframes:!1,pixelRatio:g}}),x={x:A/2,y:k/2},u=I(x);const t=o.exports.Constraint.create({pointA:x,bodyB:u,stiffness:.05,render:{strokeStyle:"#ccc",lineWidth:2,anchors:!1,visible:!1,type:"spring"}}),r=X({x:-10,y:100});let s=1;setInterval(()=>{s=s===1?2:1,r.render.sprite.texture=`/assets/bug-${s}@${g}.png?v={VERSJON}`},100);let a=1;setInterval(()=>{const c=O({},r.position);c.x<0?a=1:c.x>A&&(a=-1),(c.y<0||c.y>k)&&(c.x=-100,c.y=100,o.exports.Body.setPosition(r,c),o.exports.Body.setAngularVelocity(r,0)),o.exports.Body.setVelocity(r,{x:3*a,y:0}),o.exports.Body.setAngle(r,a*90*Math.PI/180)},50),o.exports.Composite.add(d.world,[u,t,r]);const n=o.exports.Mouse.create(m.canvas),f=o.exports.MouseConstraint.create(d,{mouse:n,constraint:{stiffness:.2,render:{visible:!1}}});function y(c,b,l){return Math.abs(c.position.x-b.x)<l&&Math.abs(c.position.y-b.y)<l}o.exports.Events.on(f,"enddrag",c=>{c.body===u&&!y(u,x,15)&&(R=!0)}),o.exports.Events.on(f,"startdrag",c=>{c.body===u&&(t.render.visible=!0)}),o.exports.Events.on(d,"afterUpdate",function(){R&&y(u,x,15)&&(u=I(x),o.exports.Composite.add(d.world,u),t.bodyB=u,t.render.visible=!1,R=!1)}),o.exports.Composite.add(d.world,f),m.mouse=n,o.exports.Render.run(m);var E=o.exports.Runner.create();return o.exports.Runner.run(E,d),m.canvas}function W(){o.exports.Render.stop(m),o.exports.World.clear(d.world,!0),o.exports.Engine.clear(d),m.canvas.remove(),m.canvas=null,m.context=null,m.textures={},d=null,m=null,u=null}function I(e){const t=o.exports.Bodies.circle(e.x,e.y,25,{label:"logoIcon",density:.004,render:{sprite:{texture:G,xScale:1,yScale:1}}});return o.exports.Body.setInertia(t,1/0),t}function X(e){return o.exports.Bodies.rectangle(e.x,e.y,40,50,{label:"bug",isStatic:!1,density:.01,render:{sprite:{texture:`/assets/bug-1@${g}.png?v={VERSJON}`,xScale:1/g,yScale:1/g}}})}P.exports.polyfill();window.addEventListener("touchmove",function(){},{passive:!1});q.render(i(L.StrictMode,{children:i(U,{})}),document.getElementById("root"));const Z=document.querySelectorAll(".button-start-game");Z.forEach(e=>{e.addEventListener("click",()=>{_()})});function _(){document.body.classList.add("game-open"),document.querySelector("meta[name=viewport]").setAttribute("content","initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0");const t=J(document.body);setTimeout(()=>{t.classList.add("show-canvas");var r=document.createElement("button");r.classList.add("close-button"),r.innerText="X",document.body.appendChild(r),r.addEventListener("click",()=>{document.body.removeChild(r),document.body.classList.remove("game-open"),t.classList.remove("show-canvas"),setTimeout(()=>{W()},500)})},50)}
