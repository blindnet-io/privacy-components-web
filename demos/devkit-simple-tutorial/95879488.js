import{s as i,r as e}from"./a4033112.js";import{A as t}from"./e6e0e6e2.js";import"./6d7ab533.js";const o=new t({domain:"blindnet.eu.auth0.com",client_id:"1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc",redirect_uri:`${window.location.origin}/demos/devkit-simple-tutorial/privacy`,authorizationParams:{redirect_uri:`${window.location.origin}/demos/devkit-simple-tutorial/privacy`}});class r extends i{static get properties(){return{}}static get styles(){return e``}render(){o.getTokenSilently(),o.loginWithRedirect()}}customElements.define("app-login",r);export{r as AppLogin};
