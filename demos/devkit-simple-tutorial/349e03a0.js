import{r as e,s as t,$ as s}from"./b44ad9c5.js";import{M as n,e as i,t as r,A as a,a as d,m as o,n as p,o as c}from"./52a7457d.js";import{n as l}from"./71cd43f0.js";function u(e,t,s,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,s):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,n);else for(var d=e.length-1;d>=0;d--)(i=e[d])&&(a=(r<3?i(a):r>3?i(t,s,a):i(t,s))||a);return r>3&&a&&Object.defineProperty(t,s,a),a}const b=e`.base-btn{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif}.animated-btn{box-shadow:0 5px 10px 0 rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.2),0 4px 8px rgba(0,0,0,.2),0 8px 16px rgba(0,0,0,.2)}.animated-btn:not([disabled]):hover{transform:translateY(-2px);transition:.2s;box-shadow:0 7px 10px 0 rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.2),0 6px 8px rgba(0,0,0,.2),0 10px 16px rgba(0,0,0,.2)}.animated-btn:not([disabled]):active{transform:translateY(2px);transition:.2s;box-shadow:0 5px 10px 0 rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.2),0 4px 8px rgba(0,0,0,.2),0 8px 16px rgba(0,0,0,.2)}`;var m;!function(e){e[e.PENDING_DECISION=0]="PENDING_DECISION",e[e.APPROVED=1]="APPROVED",e[e.DENIED=2]="DENIED"}(m||(m={}));let g=class extends t{constructor(){super(...arguments),this.demand={id:"",date:"",action:a.ACCESS,data_subject:{id:"",schema:""}},this._open=!1,this._uiState=m.PENDING_DECISION,this._message=""}willUpdate(e){e.has("demand")&&async function(e){return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${e}`,{method:"GET",headers:{accept:"application/json"}}).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}(this.demand.id).then((e=>{this._demandDetails=e}))}handleApproveDemandClick(){(async function(e,t,s="en"){if(void 0===e)throw TypeError("You must pass an ID of the demand to deny.");return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,msg:t,lang:s})}).then((e=>{if(!e.ok)throw new Error(e.statusText)}))})(this.demand.id,this._message).then((()=>{this._uiState=m.APPROVED}))}handleDenyDemandClick(){(async function(e,t,s=n["OTHER-MOTIVE"],i="en"){if(void 0===e)throw TypeError("You must pass an ID of the demand to deny.");return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,motive:s,msg:t,lang:i})}).then((e=>{if(!e.ok)throw new Error(e.statusText)}))})(this.demand.id,this._message).then((()=>{this._uiState=m.DENIED}))}handleMessageInput(e){const{value:t}=e.target;this._message=t}render(){return s` ${d(this._uiState,[[m.PENDING_DECISION,()=>s` <div id="summary-ctr" @click="${()=>{this._open=!this._open}}"> <span class="dmd-info-element">${new Date(this.demand.date).toLocaleDateString("en-gb")}</span> <span class="dmd-info-element">John Smith</span> <span class="dmd-info-element">${this.demand.action}</span> </div> ${l(this._open,(()=>s` <div id="dmd-response-ctr"> ${l(this._demandDetails,(()=>s` <div id="response-msg-ctr"> <label for="response-msg">${o("Optional Message")}</label> <textarea id="response-msg" rows="5" cols="50" @input="${this.handleMessageInput}"></textarea> </div> <div id="response-btns-ctr"> <button id="approve-btn" class="dmd-btn animated-btn" @click="${this.handleApproveDemandClick}"> Approve </button> <button id="deny-btn" class="dmd-btn animated-btn" @click="${this.handleDenyDemandClick}"> Deny </button> </div> `),(()=>s` Getting demand details... `))} </div> `))} `],[m.APPROVED,()=>s` <div class="decision-ctr">${o("Demand Approved ✅")}</div> `],[m.DENIED,()=>s` <div class="decision-ctr">${o("Demand Denied ❌")}</div> `]])} `}};g.styles=[b,e`:host{border:2px solid #5b5b5b;border-radius:10px;box-shadow:0 5px 10px 0 rgba(0,0,0,.5)}#summary-ctr{display:grid;grid-template-columns:repeat(3,1fr);padding:20px 0}.dmd-info-element{display:inline-flex;justify-items:center;text-align:center;justify-self:center;align-items:center}#dmd-response-ctr{display:grid;justify-content:center;padding:20px;row-gap:20px}#response-msg-ctr{display:grid;row-gap:10px}#response-msg-ctr label{display:block;text-align:left}#response-msg{display:block;background:#f8f8fc;border:1px solid #d9d9d9;border-radius:8px}#response-btns-ctr{display:flex;justify-items:center;justify-content:center;column-gap:40px}#approve-btn{border-color:#51d214}#deny-btn{border-color:#f90707}.dmd-btn{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:18px;padding:20px;border:4px solid;border-radius:10px;border-width:4px;background:0 0;width:150px;text-align:center}.decision-ctr{padding:20px;font-size:16px}li{text-align:left}`],u([i({attribute:!1})],g.prototype,"demand",void 0),u([r()],g.prototype,"_open",void 0),u([r()],g.prototype,"_demandDetails",void 0),u([r()],g.prototype,"_uiState",void 0),u([r()],g.prototype,"_message",void 0),g=u([p("requests-list-item")],g);let h=class extends t{constructor(){super(),this._demands=[],this._intervalId=void 0,this.reloadRequests()}reloadRequests(){(async function(){return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests",{method:"GET",headers:{accept:"application/json"}}).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))})().then((e=>{this._demands=e}))}render(){return s` <div id="process-req-ctr"> <span class="title"><b>${o("PRIVACY REQUESTS TO PROCESS")}</b></span> <div id="requests-list"> <div class="list-header-ctr"> <span class="list-header"><b>${o("Submitted")}</b></span> <span class="list-header"><b>${o("Data Subject")}</b></span> <span class="list-header"><b>${o("Action(s)")}</b></span> </div> ${c(this._demands,(e=>s`<requests-list-item .demand="${e}"></requests-list-item>`))} </div> </div> `}};h.styles=[b,e`#process-req-ctr{display:grid;row-gap:40px;text-align:center}#requests-list{display:grid;row-gap:10px}.list-header-ctr{display:grid;grid-template-columns:repeat(3,1fr);text-align:center}.title{font-size:22px}`],u([r()],h.prototype,"_demands",void 0),u([r()],h.prototype,"_intervalId",void 0),h=u([p("process-requests-view")],h);let v=class extends t{render(){return s``}};v.styles=[b,e``],v=u([p("request-history-view")],v);let S=class extends t{render(){return s``}};var x;S.styles=[b,e``],S=u([p("settings-view")],S),function(e){e[e.PROCESS_REQUESTS=0]="PROCESS_REQUESTS",e[e.REQUEST_HISTORY=1]="REQUEST_HISTORY",e[e.SETTINGS=2]="SETTINGS"}(x||(x={}));let f=class extends t{constructor(){super(...arguments),this._uiState=x.PROCESS_REQUESTS}render(){return s` <div id="dci-ctr"> <div id="sidebar-ctr"> <div id="user-ctr"></div> <div id="view-btns-ctr"> <button id="to-process-view-btn" class="view-btn animated-btn ${this._uiState===x.PROCESS_REQUESTS?"current-view-btn":""}" @click="${()=>{this._uiState=x.PROCESS_REQUESTS}}"> Requests to process </button> <button id="req-history-view-btn" class="view-btn animated-btn ${this._uiState===x.REQUEST_HISTORY?"current-view-btn":""}" @click="${()=>{this._uiState=x.REQUEST_HISTORY}}"> Requests history </button> <button id="settings-btn" class="view-btn animated-btn ${this._uiState===x.SETTINGS?"current-view-btn":""}" @click="${()=>{this._uiState=x.SETTINGS}}"> Settings </button> </div> </div> <div id="view-ctr"> ${d(this._uiState,[[x.PROCESS_REQUESTS,()=>s` <process-requests-view></process-requests-view> `],[x.REQUEST_HISTORY,()=>s` <request-history-view></request-history-view> `],[x.SETTINGS,()=>s` <settings-view></settings-view> `]])} </div> </div> `}};f.styles=[b,e`:host{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:16;max-width:1350px}:host button{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;font-size:16;max-width:1350px}#dci-ctr{display:grid;grid-template-columns:repeat(5,1fr)}#sidebar-ctr{grid-column:1/2}#view-btns-ctr{display:grid;padding:20px;row-gap:20px}.view-btn{border:none;background:0 0;padding:40px;border-radius:10px;background-color:#d9d9d9;color:#000;font-size:18px}.current-view-btn{background-color:#5b5b5b;color:#fff}#view-ctr{grid-column:2/6;justify-content:center}`],u([r()],f.prototype,"_uiState",void 0),f=u([p("bldn-data-consum")],f);class y extends t{static get styles(){return e``}render(){return s` <bldn-data-consum></bldn-data-consum> `}}customElements.define("app-dci",y);export{y as AppDCI};
