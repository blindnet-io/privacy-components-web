import{s as e,i as t,R as n,y as a}from"./6057ea6f.js";class s extends e{static get properties(){return{_username:{state:!0},_password:{state:!0}}}static get styles(){return t`:host{display:block;width:40vw;padding:50px 100px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.34),0 .500862px 1.50259px rgba(0,0,0,.17);border-radius:20px}h1{margin-top:0}`}showDCI(){const e=document.querySelector("base")?.href||"/";n.go(`${e}admin`)||console.error("admin route not found")}async getBlindnetAdminToken(e,t){return fetch("https://blindnet-connector-demo-staging.azurewebsites.net/auth/admin/token",{method:"POST",body:JSON.stringify({username:e,password:t})}).then((e=>e.json()))}handleLoginClick(){this.getBlindnetAdminToken(this._username,this._password).then((e=>{localStorage.setItem("dci_admin_token",e),this.showDCI()}))}handleUsernameChange(e){this._username=e.target.value}handlePasswordChange(e){this._password=e.target.value}connectedCallback(){super.connectedCallback(),localStorage.removeItem("dci_admin_token")}render(){return a` <h1>Back Office</h1> <input @change="${this.handleUsernameChange}" type="text" placeholder="username"> <input @change="${this.handlePasswordChange}" type="password" placeholder="password"> <button @click="${this.handleLoginClick}">Login</button> `}}customElements.define("app-backoffice",s);export{s as AppBackOffice};
