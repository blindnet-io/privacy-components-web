import{s as e,i as t,y as d}from"./67d21acf.js";import"./59a102de.js";import{l as i}from"./b146c163.js";class o extends e{static get properties(){return{_apiToken:{state:!0}}}static get styles(){return t`:host{display:block;width:40vw;padding:50px 100px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.34),0 .500862px 1.50259px rgba(0,0,0,.17);border-radius:20px}@media (min-width:1250px){:host{width:950px}}`}render(){return this._apiToken=localStorage.getItem("dci_admin_token"),setTimeout((()=>{}),1e3),d` <bldn-bridge admin-token="${i(this._apiToken)}"></bldn-bridge> `}}customElements.define("addons-demo-dci",o);export{o as AppDCI};
