if(!self.define){let e,i={};const r=(r,s)=>(r=new URL(r+".js",s).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,f)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let n={};const o=e=>r(e,c),a={module:{uri:c},exports:n,require:o};i[c]=Promise.all(s.map((e=>a[e]||o(e)))).then((e=>(f(...e),n)))}}define(["./workbox-e7a07234"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"3157edc5.js",revision:"6765aa4af29f596b79a231b1d52e895e"},{url:"35985638.js",revision:"3fdb1d0e5e2dfbb500f6308833643d4a"},{url:"44912706.js",revision:"871bc65d58576e9f4533c10c4283fed6"},{url:"50cace5c.js",revision:"6a2364fe5123f6a70c236f2553f2794f"},{url:"55a8fec2.js",revision:"5aa861e3c87a06a1547986427455b64b"},{url:"5bf22929.js",revision:"cb8aa169847220a5729ffa5d51bbac34"},{url:"648eec42.js",revision:"21fb731ba79f763854353ed17e3cadb6"},{url:"66638afe.js",revision:"e489d3b594b6d23e64ae874605ff5046"},{url:"d753326a.js",revision:"c365c42ecb6eb69494ca33623ff1bef2"},{url:"e6a25153.js",revision:"471df3caeb0a970d4e192fe9d648677c"},{url:"index.html",revision:"39095c2772d9af43957a78b9be47f42c"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html")))}));
//# sourceMappingURL=sw.js.map
