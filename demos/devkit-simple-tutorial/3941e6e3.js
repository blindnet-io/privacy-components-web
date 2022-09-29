import{r as e,s as t,$ as E}from"./c0dcf44a.js";import{n as o}from"./71cd43f0.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:E,elements:o}=t;return{kind:E,elements:o,finisher(t){window.customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,n=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(E){E.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(E){E.createProperty(t.key,e)}};function r(e){return(t,E)=>void 0!==E?((e,t,E)=>{t.constructor.createProperty(E,e)})(e,t,E):n(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function A(e){return r({...e,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var N;null===(N=window.HTMLSlotElement)||void 0===N||N.prototype.assignedElements;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s=(e,t,E)=>{for(const E of t)if(E[0]===e)return(0,E[1])();return null==E?void 0:E()};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*i(e,t){if(void 0!==e){let E=0;for(const o of e)yield t(o,E++)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=(e,...t)=>({strTag:!0,strings:e,values:t});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class S{constructor(e){this.__litLocalizeEventHandler=e=>{"ready"===e.detail.status&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener("lit-localize-status",this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener("lit-localize-status",this.__litLocalizeEventHandler)}}const a=e=>e.addController(new S(e)),I=()=>e=>"function"==typeof e?l(e):d(e),d=({kind:e,elements:t})=>({kind:e,elements:t,finisher(e){e.addInitializer(a)}}),l=e=>(e.addInitializer(a),e);
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
for(let e=0;e<256;e++)(e>>4&15).toString(16),(15&e).toString(16);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */(new
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class{constructor(){this.settled=!1,this.promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t}))}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}).resolve();
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let C=e=>{return"string"!=typeof(t=e)&&"strTag"in t?((e,t,E)=>{let o=e[0];for(let R=1;R<e.length;R++)o+=t[E?E[R-1]:R-1],o+=e[R];return o})(e.strings,e.values):e;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var t};var O,c,p,P,L,u,D,g,h,_,U,m,b,v,G,Y,f,y,M,H,w,x,V,B,k,W,F,$,K,Z,J;!function(e){var t;(t=e.lb_type||(e.lb_type={})).CONTRACT="CONTRACT",t.CONSENT="CONSENT",t.LEGITIMATE_INTEREST="LEGITIMATE-INTEREST",t.NECESSARY="NECESSARY",t.NECESSARY_LEGAL_OBLIGATION="NECESSARY.LEGAL-OBLIGATION",t.NECESSARY_PUBLIC_INTEREST="NECESSARY.PUBLIC-INTEREST",t.NECESSARY_VITAL_INTEREST="NECESSARY.VITAL-INTEREST",t.OTHER_LEGAL_BASE="OTHER-LEGAL-BASE"}(O||(O={})),function(e){var t;(t=e.provenance||(e.provenance={}))._="*",t.DERIVED="DERIVED",t.TRANSFERRED="TRANSFERRED",t.USER="USER",t.USER_DATA_SUBJECT="USER.DATA-SUBJECT"}(c||(c={})),function(e){var t,E;(t=e.policy||(e.policy={})).NO_LONGER_THAN="NO-LONGER-THAN",t.NO_LESS_THAN="NO-LESS-THAN",(E=e.after||(e.after={})).CAPTURE_DATE="CAPTURE-DATE",E.RELATIONSHIP_START="RELATIONSHIP-START",E.RELATIONSHIP_END="RELATIONSHIP-END",E.SERVICE_START="SERVICE-START",E.SERVICE_END="SERVICE-END"}(p||(p={})),function(e){e.AUTO="auto",e.MANUAL="manual"}(P||(P={})),function(e){var t;(t=e.motive||(e.motive={})).IDENTITY_UNCONFIRMED="IDENTITY-UNCONFIRMED",t.LANGUAGE_UNSUPPORTED="LANGUAGE-UNSUPPORTED",t.VALID_REASONS="VALID-REASONS",t.IMPOSSIBLE="IMPOSSIBLE",t.NO_SUCH_DATA="NO-SUCH-DATA",t.REQUEST_UNSUPPORTED="REQUEST-UNSUPPORTED",t.USER_UNKNOWN="USER-UNKNOWN",t.OTHER_MOTIVE="OTHER-MOTIVE"}(L||(L={})),function(e){var t;(t=e.lb_type||(e.lb_type={})).CONTRACT="CONTRACT",t.CONSENT="CONSENT",t.LEGITIMATE_INTEREST="LEGITIMATE-INTEREST",t.NECESSARY="NECESSARY",t.NECESSARY_LEGAL_OBLIGATION="NECESSARY.LEGAL-OBLIGATION",t.NECESSARY_PUBLIC_INTEREST="NECESSARY.PUBLIC-INTEREST",t.NECESSARY_VITAL_INTEREST="NECESSARY.VITAL-INTEREST",t.OTHER_LEGAL_BASE="OTHER-LEGAL-BASE"}(u||(u={})),function(e){var t;(t=e.action||(e.action={})).ACCESS="ACCESS",t.DELETE="DELETE",t.MODIFY="MODIFY",t.OBJECT="OBJECT",t.PORTABILITY="PORTABILITY",t.RESTRICT="RESTRICT",t.REVOKE_CONSENT="REVOKE-CONSENT",t.TRANSPARENCY="TRANSPARENCY",t.TRANSPARENCY_DATA_CATEGORIES="TRANSPARENCY.DATA-CATEGORIES",t.TRANSPARENCY_DPO="TRANSPARENCY.DPO",t.TRANSPARENCY_KNOWN="TRANSPARENCY.KNOWN",t.TRANSPARENCY_LEGAL_BASES="TRANSPARENCY.LEGAL-BASES",t.TRANSPARENCY_ORGANIZATION="TRANSPARENCY.ORGANIZATION",t.TRANSPARENCY_POLICY="TRANSPARENCY.POLICY",t.TRANSPARENCY_PROCESSING_CATEGORIES="TRANSPARENCY.PROCESSING-CATEGORIES",t.TRANSPARENCY_PROVENANCE="TRANSPARENCY.PROVENANCE",t.TRANSPARENCY_PURPOSE="TRANSPARENCY.PURPOSE",t.TRANSPARENCY_RETENTION="TRANSPARENCY.RETENTION",t.TRANSPARENCY_WHERE="TRANSPARENCY.WHERE",t.TRANSPARENCY_WHO="TRANSPARENCY.WHO",t.OTHER="OTHER"}(D||(D={})),function(e){var t;(t=e.action||(e.action={})).ACCESS="ACCESS",t.DELETE="DELETE",t.MODIFY="MODIFY",t.OBJECT="OBJECT",t.PORTABILITY="PORTABILITY",t.RESTRICT="RESTRICT",t.REVOKE_CONSENT="REVOKE-CONSENT",t.TRANSPARENCY="TRANSPARENCY",t.TRANSPARENCY_DATA_CATEGORIES="TRANSPARENCY.DATA-CATEGORIES",t.TRANSPARENCY_DPO="TRANSPARENCY.DPO",t.TRANSPARENCY_KNOWN="TRANSPARENCY.KNOWN",t.TRANSPARENCY_LEGAL_BASES="TRANSPARENCY.LEGAL-BASES",t.TRANSPARENCY_ORGANIZATION="TRANSPARENCY.ORGANIZATION",t.TRANSPARENCY_POLICY="TRANSPARENCY.POLICY",t.TRANSPARENCY_PROCESSING_CATEGORIES="TRANSPARENCY.PROCESSING-CATEGORIES",t.TRANSPARENCY_PROVENANCE="TRANSPARENCY.PROVENANCE",t.TRANSPARENCY_PURPOSE="TRANSPARENCY.PURPOSE",t.TRANSPARENCY_RETENTION="TRANSPARENCY.RETENTION",t.TRANSPARENCY_WHERE="TRANSPARENCY.WHERE",t.TRANSPARENCY_WHO="TRANSPARENCY.WHO",t.OTHER="OTHER"}(g||(g={})),function(e){var t;(t=e.status||(e.status={})).IN_PROCESSING="IN_PROCESSING",t.PARTIALLY_COMPLETED="PARTIALLY_COMPLETED",t.COMPLETED="COMPLETED",t.CANCELED="CANCELED"}(h||(h={})),function(e){var t,E,o;(t=e.requested_action||(e.requested_action={})).ACCESS="ACCESS",t.DELETE="DELETE",t.MODIFY="MODIFY",t.OBJECT="OBJECT",t.PORTABILITY="PORTABILITY",t.RESTRICT="RESTRICT",t.REVOKE_CONSENT="REVOKE-CONSENT",t.TRANSPARENCY="TRANSPARENCY",t.TRANSPARENCY_DATA_CATEGORIES="TRANSPARENCY.DATA-CATEGORIES",t.TRANSPARENCY_DPO="TRANSPARENCY.DPO",t.TRANSPARENCY_KNOWN="TRANSPARENCY.KNOWN",t.TRANSPARENCY_LEGAL_BASES="TRANSPARENCY.LEGAL-BASES",t.TRANSPARENCY_ORGANIZATION="TRANSPARENCY.ORGANIZATION",t.TRANSPARENCY_POLICY="TRANSPARENCY.POLICY",t.TRANSPARENCY_PROCESSING_CATEGORIES="TRANSPARENCY.PROCESSING-CATEGORIES",t.TRANSPARENCY_PROVENANCE="TRANSPARENCY.PROVENANCE",t.TRANSPARENCY_PURPOSE="TRANSPARENCY.PURPOSE",t.TRANSPARENCY_RETENTION="TRANSPARENCY.RETENTION",t.TRANSPARENCY_WHERE="TRANSPARENCY.WHERE",t.TRANSPARENCY_WHO="TRANSPARENCY.WHO",t.OTHER="OTHER",(E=e.status||(e.status={})).GRANTED="GRANTED",E.DENIED="DENIED",E.PARTIALLY_GRANTED="PARTIALLY-GRANTED",E.UNDER_REVIEW="UNDER-REVIEW",E.CANCELED="CANCELED",(o=e.motive||(e.motive={})).IDENTITY_UNCONFIRMED="IDENTITY-UNCONFIRMED",o.LANGUAGE_UNSUPPORTED="LANGUAGE-UNSUPPORTED",o.VALID_REASONS="VALID-REASONS",o.IMPOSSIBLE="IMPOSSIBLE",o.NO_SUCH_DATA="NO-SUCH-DATA",o.REQUEST_UNSUPPORTED="REQUEST-UNSUPPORTED",o.USER_UNKNOWN="USER-UNKNOWN",o.OTHER_MOTIVE="OTHER-MOTIVE"}(_||(_={})),function(e){var t,E;(t=e.pc||(e.pc={}))._="*",t.ANONYMIZATION="ANONYMIZATION",t.AUTOMATED_INFERENCE="AUTOMATED-INFERENCE",t.AUTOMATED_DECISION_MAKING="AUTOMATED-DECISION-MAKING",t.COLLECTION="COLLECTION",t.GENERATING="GENERATING",t.PUBLISHING="PUBLISHING",t.STORING="STORING",t.SHARING="SHARING",t.USING="USING",t.OTHER_PROCESSING="OTHER-PROCESSING",(E=e.pp||(e.pp={}))._="*",E.ADVERTISING="ADVERTISING",E.COMPLIANCE="COMPLIANCE",E.EMPLOYMENT="EMPLOYMENT",E.JUSTICE="JUSTICE",E.MARKETING="MARKETING",E.MEDICAL="MEDICAL",E.PERSONALIZATION="PERSONALIZATION",E.PUBLIC_INTERESTS="PUBLIC-INTERESTS",E.RESEARCH="RESEARCH",E.SALE="SALE",E.SECURITY="SECURITY",E.SERVICES="SERVICES",E.SERVICES_ADDITIONAL_SERVICES="SERVICES.ADDITIONAL-SERVICES",E.SERVICES_BASIC_SERVICE="SERVICES.BASIC-SERVICE",E.SOCIAL_PROTECTION="SOCIAL-PROTECTION",E.TRACKING="TRACKING",E.VITAL_INTERESTS="VITAL-INTERESTS",E.OTHER_PURPOSE="OTHER-PURPOSE"}(U||(U={})),function(e){var t,E;(t=e.processing_category||(e.processing_category={}))._="*",t.ANONYMIZATION="ANONYMIZATION",t.AUTOMATED_INFERENCE="AUTOMATED-INFERENCE",t.AUTOMATED_DECISION_MAKING="AUTOMATED-DECISION-MAKING",t.COLLECTION="COLLECTION",t.GENERATING="GENERATING",t.PUBLISHING="PUBLISHING",t.STORING="STORING",t.SHARING="SHARING",t.USING="USING",t.OTHER_PROCESSING="OTHER-PROCESSING",(E=e.purpose||(e.purpose={}))._="*",E.ADVERTISING="ADVERTISING",E.COMPLIANCE="COMPLIANCE",E.EMPLOYMENT="EMPLOYMENT",E.JUSTICE="JUSTICE",E.MARKETING="MARKETING",E.MEDICAL="MEDICAL",E.PERSONALIZATION="PERSONALIZATION",E.PUBLIC_INTERESTS="PUBLIC-INTERESTS",E.RESEARCH="RESEARCH",E.SALE="SALE",E.SECURITY="SECURITY",E.SERVICES="SERVICES",E.SERVICES_ADDITIONAL_SERVICES="SERVICES.ADDITIONAL-SERVICES",E.SERVICES_BASIC_SERVICE="SERVICES.BASIC-SERVICE",E.SOCIAL_PROTECTION="SOCIAL-PROTECTION",E.TRACKING="TRACKING",E.VITAL_INTERESTS="VITAL-INTERESTS",E.OTHER_PURPOSE="OTHER-PURPOSE"}(m||(m={})),function(e){var t;(t=e.provenance||(e.provenance={}))._="*",t.DERIVED="DERIVED",t.TRANSFERRED="TRANSFERRED",t.USER="USER",t.USER_DATA_SUBJECT="USER.DATA-SUBJECT"}(b||(b={})),function(e){var t,E;(t=e.term||(e.term={}))._="*",t.DERIVED="DERIVED",t.TRANSFERRED="TRANSFERRED",t.USER="USER",t.USER_DATA_SUBJECT="USER.DATA-SUBJECT",(E=e.target||(e.target={}))._="*",E.ORGANIZATION="ORGANIZATION",E.SYSTEM="SYSTEM",E.PARTNERS="PARTNERS",E.PARTNERS_DOWNWARD="PARTNERS.DOWNWARD",E.PARTNERS_UPWARD="PARTNERS.UPWARD"}(v||(v={})),function(e){var t,E,o,R;(t=e.status||(e.status={})).GRANTED="GRANTED",t.DENIED="DENIED",t.PARTIALLY_GRANTED="PARTIALLY-GRANTED",t.UNDER_REVIEW="UNDER-REVIEW",t.CANCELED="CANCELED",(E=e.motive||(e.motive={})).IDENTITY_UNCONFIRMED="IDENTITY-UNCONFIRMED",E.LANGUAGE_UNSUPPORTED="LANGUAGE-UNSUPPORTED",E.VALID_REASONS="VALID-REASONS",E.IMPOSSIBLE="IMPOSSIBLE",E.NO_SUCH_DATA="NO-SUCH-DATA",E.REQUEST_UNSUPPORTED="REQUEST-UNSUPPORTED",E.USER_UNKNOWN="USER-UNKNOWN",E.OTHER_MOTIVE="OTHER-MOTIVE",(o=e.provenance||(e.provenance={}))._="*",o.DERIVED="DERIVED",o.TRANSFERRED="TRANSFERRED",o.USER="USER",o.USER_DATA_SUBJECT="USER.DATA-SUBJECT",(R=e.target||(e.target={}))._="*",R.ORGANIZATION="ORGANIZATION",R.SYSTEM="SYSTEM",R.PARTNERS="PARTNERS",R.PARTNERS_DOWNWARD="PARTNERS.DOWNWARD",R.PARTNERS_UPWARD="PARTNERS.UPWARD"}(G||(G={})),function(e){var t,E;(t=e.policy_type||(e.policy_type={})).NO_LONGER_THAN="NO-LONGER-THAN",t.NO_LESS_THAN="NO-LESS-THAN",(E=e.after||(e.after={})).CAPTURE_DATE="CAPTURE-DATE",E.RELATIONSHIP_START="RELATIONSHIP-START",E.RELATIONSHIP_END="RELATIONSHIP-END",E.SERVICE_START="SERVICE-START",E.SERVICE_END="SERVICE-END"}(Y||(Y={})),function(e){var t,E;(t=e.pc||(e.pc={}))._="*",t.ANONYMIZATION="ANONYMIZATION",t.AUTOMATED_INFERENCE="AUTOMATED-INFERENCE",t.AUTOMATED_DECISION_MAKING="AUTOMATED-DECISION-MAKING",t.COLLECTION="COLLECTION",t.GENERATING="GENERATING",t.PUBLISHING="PUBLISHING",t.STORING="STORING",t.SHARING="SHARING",t.USING="USING",t.OTHER_PROCESSING="OTHER-PROCESSING",(E=e.pp||(e.pp={}))._="*",E.ADVERTISING="ADVERTISING",E.COMPLIANCE="COMPLIANCE",E.EMPLOYMENT="EMPLOYMENT",E.JUSTICE="JUSTICE",E.MARKETING="MARKETING",E.MEDICAL="MEDICAL",E.PERSONALIZATION="PERSONALIZATION",E.PUBLIC_INTERESTS="PUBLIC-INTERESTS",E.RESEARCH="RESEARCH",E.SALE="SALE",E.SECURITY="SECURITY",E.SERVICES="SERVICES",E.SERVICES_ADDITIONAL_SERVICES="SERVICES.ADDITIONAL-SERVICES",E.SERVICES_BASIC_SERVICE="SERVICES.BASIC-SERVICE",E.SOCIAL_PROTECTION="SOCIAL-PROTECTION",E.TRACKING="TRACKING",E.VITAL_INTERESTS="VITAL-INTERESTS",E.OTHER_PURPOSE="OTHER-PURPOSE"}(f||(f={})),function(e){e.ACCESS="ACCESS",e.DELETE="DELETE",e.MODIFY="MODIFY",e.OBJECT="OBJECT",e.PORTABILITY="PORTABILITY",e.RESTRICT="RESTRICT",e.REVOKE="REVOKE-CONSENT",e.TRANSPARENCY="TRANSPARENCY",e["TRANSPARENCY.DATA.CATEGORIES"]="TRANSPARENCY.DATA-CATEGORIES",e["TRANSPARENCY.DPO"]="TRANSPARENCY.DPO",e["TRANSPARENCY.KNOWN"]="TRANSPARENCY.KNOWN",e["TRANSPARENCY.LEGAL.BASES"]="TRANSPARENCY.LEGAL-BASES",e["TRANSPARENCY.ORGANIZATION"]="TRANSPARENCY.ORGANIZATION",e["TRANSPARENCY.POLICY"]="TRANSPARENCY.POLICY",e["TRANSPARENCY.PROCESSING.CATEGORIES"]="TRANSPARENCY.PROCESSING-CATEGORIES",e["TRANSPARENCY.PROVENANCE"]="TRANSPARENCY.PROVENANCE",e["TRANSPARENCY.PURPOSE"]="TRANSPARENCY.PURPOSE",e["TRANSPARENCY.RETENTION"]="TRANSPARENCY.RETENTION",e["TRANSPARENCY.WHERE"]="TRANSPARENCY.WHERE",e["TRANSPARENCY.WHO"]="TRANSPARENCY.WHO",e["OTHER.DEMAND"]="OTHER-DEMAND"}(y||(y={})),function(e){e.TRANSPARENCY_DATA_CATEGORIES="TRANSPARENCY.DATA-CATEGORIES",e.TRANSPARENCY_DPO="TRANSPARENCY.DPO",e.TRANSPARENCY_KNOWN="TRANSPARENCY.KNOWN",e.TRANSPARENCY_LEGAL_BASES="TRANSPARENCY.LEGAL-BASES",e.TRANSPARENCY_ORGANIZATION="TRANSPARENCY.ORGANIZATION",e.TRANSPARENCY_POLICY="TRANSPARENCY.POLICY",e.TRANSPARENCY_PROCESSING_CATEGORIES="TRANSPARENCY.PROCESSING-CATEGORIES",e.TRANSPARENCY_PROVENANCE="TRANSPARENCY.PROVENANCE",e.TRANSPARENCY_PURPOSE="TRANSPARENCY.PURPOSE",e.TRANSPARENCY_RETENTION="TRANSPARENCY.RETENTION",e.TRANSPARENCY_WHERE="TRANSPARENCY.WHERE",e.TRANSPARENCY_WHO="TRANSPARENCY.WHO"}(M||(M={})),function(e){e.ALL="*",e.USER="USER",e["USER.DATA-SUBJECT"]="USER.DATA-SUBJECT",e.DERIVED="DERIVED",e.TRANSFERRED="TRANSFERRED"}(H||(H={})),function(e){e.IN_PROCESSING="IN_PROCESSING",e.PARTIALLY_COMPLETED="PARTIALLY_COMPLETED",e.COMPLETED="COMPLETED",e.CANCELED="CANCELED"}(w||(w={})),function(e){e.GRANTED="GRANTED",e.DENIED="DENIED",e["PARTIALLY-GRANTED"]="PARTIALLY-GRANTED",e["UNDER-REVIEW"]="UNDER-REVIEW",e.CANCELED="CANCELED"}(x||(x={})),function(e){e.ALL="*",e.SYSTEM="SYSTEM",e.ORGANIZATION="ORGANIZATION",e.PARTNERS="PARTNERS",e["PARTNERS.DOWNWARD"]="PARTNERS.DOWNWARD",e["PARTNERS.UPWARD"]="PARTNERS.UPWARD"}(V||(V={})),function(e){e["PARTNERS.DOWNWARD"]="PARTNERS.DOWNWARD",e["PARTNERS.UPWARD"]="PARTNERS.UPWARD"}(B||(B={})),function(e){e.ALL="*",e.AFFILIATION="AFFILIATION",e["AFFILIATION.MEMBERSHIP"]="AFFILIATION.MEMBERSHIP",e["AFFILIATION.MEMBERSHIP.UNION"]="AFFILIATION.MEMBERSHIP.UNION",e["AFFILIATION.SCHOOL"]="AFFILIATION.SCHOOL",e["AFFILIATION.WORKPLACE"]="AFFILIATION.WORKPLACE",e.BEHAVIOR="BEHAVIOR",e["BEHAVIOR.ACTIVITY"]="BEHAVIOR.ACTIVITY",e["BEHAVIOR.CONNECTION"]="BEHAVIOR.CONNECTION",e["BEHAVIOR.PREFERENCE"]="BEHAVIOR.PREFERENCE",e["BEHAVIOR.TELEMETRY"]="BEHAVIOR.TELEMETRY",e.BIOMETRIC="BIOMETRIC",e.CONTACT="CONTACT",e["CONTACT.EMAIL"]="CONTACT.EMAIL",e["CONTACT.ADDRESS"]="CONTACT.ADDRESS",e["CONTACT.PHONE"]="CONTACT.PHONE",e.DEMOGRAPHIC="DEMOGRAPHIC",e["DEMOGRAPHIC.AGE"]="DEMOGRAPHIC.AGE",e["DEMOGRAPHIC.BELIEFS"]="DEMOGRAPHIC.BELIEFS",e["DEMOGRAPHIC.GENDER"]="DEMOGRAPHIC.GENDER",e["DEMOGRAPHIC.ORIGIN"]="DEMOGRAPHIC.ORIGIN",e["DEMOGRAPHIC.RACE"]="DEMOGRAPHIC.RACE",e["DEMOGRAPHIC.SEXUAL-ORIENTATION"]="DEMOGRAPHIC.SEXUAL-ORIENTATION",e.DEVICE="DEVICE",e.FINANCIAL="FINANCIAL",e["FINANCIAL.BANK-ACCOUNT"]="FINANCIAL.BANK-ACCOUNT",e.GENETIC="GENETIC",e.HEALTH="HEALTH",e.IMAGE="IMAGE",e.LOCATION="LOCATION",e.NAME="NAME",e.PROFILING="PROFILING",e.RELATIONSHIPS="RELATIONSHIPS",e.UID="UID",e["UID.ID"]="UID.ID",e["UID.IP"]="UID.IP",e["UID.USER-ACCOUNT"]="UID.USER-ACCOUNT",e["UID.SOCIAL-MEDIA"]="UID.SOCIAL-MEDIA",e["OTHER-DATA"]="OTHER-DATA"}(k||(k={})),function(e){e.ALL="*",e.ANONYMIZATION="ANONYMIZATION",e["AUTOMATED-INFERENCE"]="AUTOMATED-INFERENCE",e["AUTOMATED-DECISION-MAKING"]="AUTOMATED-DECISION-MAKING",e.COLLECTION="COLLECTION",e.GENERATING="GENERATING",e.PUBLISHING="PUBLISHING",e.STORING="STORING",e.SHARING="SHARING",e.USING="USING",e["OTHER-PROCESSING"]="OTHER-PROCESSING"}(W||(W={})),function(e){e.ALL="*",e.ADVERTISING="ADVERTISING",e.COMPLIANCE="COMPLIANCE",e.EMPLOYMENT="EMPLOYMENT",e.JUSTICE="JUSTICE",e.MARKETING="MARKETING",e.MEDICAL="MEDICAL",e.PERSONALIZATION="PERSONALIZATION",e["PUBLIC-INTERESTS"]="PUBLIC-INTERESTS",e.RESEARCH="RESEARCH",e.SALE="SALE",e.SECURITY="SECURITY",e.SERVICES="SERVICES",e["SERVICES.ADDITIONAL-SERVICES"]="SERVICES.ADDITIONAL-SERVICES",e["SERVICES.BASIC-SERVICE"]="SERVICES.BASIC-SERVICE",e["SOCIAL-PROTECTION"]="SOCIAL-PROTECTION",e.TRACKING="TRACKING",e["VITAL-INTERESTS"]="VITAL-INTERESTS",e["OTHER-PURPOS"]="OTHER-PURPOSE"}(F||(F={})),function(e){e["IDENTITY-UNCONFIRMED"]="IDENTITY-UNCONFIRMED",e["LANGUAGE-UNSUPPORTED"]="LANGUAGE-UNSUPPORTED",e["VALID-REASONS"]="VALID-REASONS",e.IMPOSSIBLE="IMPOSSIBLE",e["NO-SUCH-DATA"]="NO-SUCH-DATA",e["REQUEST-UNSUPPORTED"]="REQUEST-UNSUPPORTED",e["USER-UNKNOWN"]="USER-UNKNOWN",e["OTHER-MOTIVE"]="OTHER-MOTIVE"}($||($={})),function(e){e.CONTRACT="CONTRACT",e.CONSENT="CONSENT",e["LEGITIMATE-INTEREST"]="LEGITIMATE-INTEREST",e.NECESSARY="NECESSARY",e["NECESSARY.LEGAL-OBLIGATION"]="NECESSARY.LEGAL-OBLIGATION",e["NECESSARY.PUBLIC-INTEREST"]="NECESSARY.PUBLIC-INTEREST",e["NECESSARY.VITAL-INTEREST"]="NECESSARY.VITAL-INTEREST",e["OTHER-LEGAL-BASE"]="OTHER-LEGAL-BASE"}(K||(K={})),function(e){e["NO-LONGER-THAN"]="NO-LONGER-THAN",e["NO-LESS-THAN"]="NO-LESS-THAN"}(Z||(Z={})),function(e){e["CAPTURE-DATE"]="CAPTURE-DATE",e["RELATIONSHIP-START"]="RELATIONSHIP-START",e["RELATIONSHIP-END"]="RELATIONSHIP-END",e["SERVICE-START"]="SERVICE-START",e["SERVICE-END"]="SERVICE-END"}(J||(J={}));class z{constructor(e){this._baseURL=e?"false"===e?z.MOCK_URL:e:z.DEFAULT_URL,this._baseURL=this._baseURL.replace(/\/+$/,"")}get isMocked(){return this._baseURL===z.MOCK_URL}fullURL(e){return`${this._baseURL}${e.replace(/^\/*/,"/")}`}get baseURL(){return this._baseURL}static configure(e,t=!1){return z.instance&&!t?(e!==z.getInstance().baseURL&&e&&"false"!==e&&(console.log("[Computation API] Configuration conflict"),console.log(`[Computation API] configured value: ${z.getInstance().baseURL}`),console.log(`[Computation API] conflicting value: ${e}`)),!1):(z.instance=new z(e),!0)}static getInstance(){if(!z.instance)throw new Error("[Computation API] trying to use the API before configuring it");return z.instance}headers(e=!1,t){return new Headers({"Content-Type":"application/json","Access-Control-Allow-Origin":"*",Authorization:localStorage.getItem("priv_user_id")||"john.doe@example.com",...this.isMocked&&t?{Prefer:this.getMockHeader(t)}:{},...e?{accept:"application/json"}:{}})}getMockHeader(e){if(e.demands.length>1)return"code=200, example=TRANSPARENCY Multi-Response";if(1===e.demands.length){const{action:t}=e.demands[0];return`code=200, example=${t} Response`}return"code=400"}preProcessRequest(e){const t=Object.values(k).filter((e=>e!==k.ALL&&!e.includes(".")));return e.demands.forEach((e=>{if(e.restrictions&&e.restrictions.privacy_scope){const E=e.restrictions.privacy_scope.map((e=>e.dc));if(t.every((e=>E.includes(e)))){delete e.restrictions.privacy_scope}}})),e}async sendPrivacyRequest(e){const t=this.preProcessRequest(e),E=await fetch(this.fullURL("/privacy-request"),{method:"POST",headers:this.headers(!1,e),body:JSON.stringify(t)});if(!E.ok)throw new Error(E.statusText);return E.json()}async getRequestHistory(){const e=await fetch(this.fullURL("/privacy-request/history"),{method:"GET",headers:this.headers(!0)});if(!e.ok)throw new Error(e.statusText);return e.json()}async getRequest(e){const t=`/privacy-request/${e}`,E=await fetch(this.fullURL(t),{method:"GET",headers:this.headers(!0)});if(!E.ok)throw new Error(E.statusText);return E.json()}async cancelDemand(e){const t=`/privacy-request/${e}`,E=this.headers(!0),o=JSON.stringify({demand_id:e}),R=await fetch(this.fullURL(t),{method:"POST",headers:E,body:o});if(!R.ok)throw new Error(R.statusText)}async getPendingDemands(){return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests",{method:"GET",headers:{accept:"application/json"}}).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}async getPendingDemandDetails(e){return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${e}`,{method:"GET",headers:{accept:"application/json"}}).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))}async grantDemand(e,t,E){if(void 0===e)throw TypeError("You must pass an ID of the demand to deny.");t||(t=void 0);const o={id:e,msg:t,lang:E};return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then((e=>{if(!e.ok)throw new Error(e.statusText)}))}async denyDemand(e,t=L.motive.OTHER_MOTIVE,E,o){if(void 0===e)throw TypeError("You must pass an ID of the demand to deny.");const R={id:e,motive:t,msg:E,lang:o};return fetch("https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}).then((e=>{if(!e.ok)throw new Error(e.statusText)}))}static clean(){z.instance=null}}z.instance=null,z.MOCK_URL="https://stoplight.io/mocks/blindnet/product-management:open-api/74767654",z.DEFAULT_URL="https://devkit-pce-staging.azurewebsites.net/v0";class j{static configure(e,t=!0){const E=j.setUp(e,t);return E&&(j._configuration=e),E}static setUp(e,t){let E=!0;return E=E&&z.configure(e.computationBaseUrl,t),E}static get configuration(){return j._configuration}}function q(e){return class extends e{constructor(){super(...arguments),this.computationBaseURL=""}static get properties(){return{...super.properties||{},computationBaseURL:{type:String,attribute:"computation-base-url"}}}connectedCallback(){super.connectedCallback(),j.configure({computationBaseUrl:this.computationBaseURL},!1)}}}function Q(e,t,E,o){var R,n=arguments.length,r=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,E):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,E,o);else for(var A=e.length-1;A>=0;A--)(R=e[A])&&(r=(n<3?R(r):n>3?R(t,E,r):R(t,E))||r);return n>3&&r&&Object.defineProperty(t,E,r),r}(globalThis||window).BlindnetCore=j;const X=e`:host{--color-primary:rgb(var(--bldn-color-primary, 5, 80, 222));--color-primary-rgb:var(--bldn-color-primary, 5, 80, 222);--color-positive:rgb(var(--bldn-color-positive, 9, 185, 70));--color-positive-rgb:var(--bldn-color-positive, 9, 185, 70);--color-negative:rgb(var(--bldn-color-negative, 209, 53, 13));--color-negative-rgb:var(--bldn-color-negative, 209, 53, 13);--color-warning:rgb(var(--bldn-color-warning, 244, 144, 30));--color-warning-rgb:var(--bldn-color-warning, 244, 144, 30);--color-light:rgb(var(--bldn-color-light, 200, 200, 200));--color-light-rgb:var(--bldn-color-light, 200, 200, 200);--color-medium:rgb(var(--bldn-color-medium, 151, 151, 151));--color-medium-rgb:var(--bldn-color-medium, 151, 151, 151);--color-dark:rgb(var(--bldn-color-dark, 91, 91, 91));--color-dark-rgb:var(--bldn-color-dark, 91, 91, 91)}button{font-family:var(
      --bldn-font-family,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif
    )}`,ee=new URL(new URL(new URL("a302f28e.svg",import.meta.url).href,import.meta.url).href,import.meta.url).href,te=new URL(new URL(new URL("b39eb360.svg",import.meta.url).href,import.meta.url).href,import.meta.url).href;let Ee=class extends t{constructor(){super(...arguments),this.header="Expand",this.open=!1,this.includeButtons=!1}render(){return E` ${o(this.header,(()=>E` <button class="header link-btn" @click="${()=>{this.open=!this.open}}"> <span class="medium-font underline">${this.header}</span> ${o(this.open,(()=>E`<img src="${ee}" alt="close arrow">`),(()=>E`<img src="${te}" alt="open arrow">`))} <simple-icon icon="expand-${this.open?"less":"more"}"></simple-icon> </button> `))} <div id="dropdown"> <div id="content-ctr"> <slot name="prompt"></slot> <slot></slot> </div> ${o(this.includeButtons,(()=>E` <div id="close-btn-ctr"> <button class="svg-btn" @click="${()=>{this.open=!this.open}}"> <img src="${ee}" alt="close arrow"> </button> </div> `))} </div> `}};Ee.styles=[X,e`#content-ctr{display:grid;row-gap:50px}#dropdown{display:none;border:var(--bldn-thin-border-width,1px) solid var(--bldn-light-border-color,#c4c4c4);border-radius:10px;padding:40px 40px 20px 40px;margin:20px 0 0 0}:host([open]) #dropdown{display:block}.header{margin:0}#close-btn-ctr{margin:20px 0 0 0;text-align:center}.svg-btn{border:none;padding:0;margin:0;background:0 0}.link-btn{color:#5b5b5b;text-decoration:underline;display:grid;grid-auto-flow:column;font-size:16px;column-gap:7.5px;background:0 0;border:none;width:fit-content;align-items:center;padding:0}`],Q([r({type:String})],Ee.prototype,"header",void 0),Q([r({type:Boolean,reflect:!0})],Ee.prototype,"open",void 0),Q([r({type:Boolean,attribute:"include-buttons"})],Ee.prototype,"includeButtons",void 0),Ee=Q([R("slotted-dropdown")],Ee);let oe=class extends t{render(){return E`Alerts view coming soon!`}};var Re;oe=Q([R("bldn-data-consum-alerts")],oe),function(e){e[e.Respond=0]="Respond",e[e.History=1]="History",e[e.Responded=2]="Responded"}(Re||(Re={}));let ne=class extends t{constructor(){super(...arguments),this._open=!1,this._dropdownUiState=Re.Respond,this._selectedResponseType=void 0,this._message=""}isRecommended(){var e,t;return this._selectedResponseType===(null===(t=null===(e=this._demandDetails)||void 0===e?void 0:e.recommendation)||void 0===t?void 0:t.status)}handleDropdownToggleChange(e){const{newValue:t}=e.detail;this._dropdownUiState="History"===t?Re.History:Re.Respond}handleMessageInput(e){const{value:t}=e.target;this._message=t}handleSubmitClick(){switch(this._selectedResponseType){case G.status.GRANTED:z.getInstance().grantDemand(this.demand.id,this._message).then((()=>{this._dropdownUiState=Re.Responded}));break;case G.status.PARTIALLY_GRANTED:break;case G.status.DENIED:z.getInstance().denyDemand(this.demand.id,G.motive.OTHER_MOTIVE,this._message).then((()=>{this._dropdownUiState=Re.Responded}))}}getRadioSVG(e){return e?E` <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"/> </svg> `:E` <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"/> </svg> `}getArrowSVG(e){return"open"===e?E` <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22.12 20.5469L16 14.4402L9.88 20.5469L8 18.6669L16 10.6669L24 18.6669L22.12 20.5469Z"/> </svg> `:E` <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.88 11.4531L16 17.5598L22.12 11.4531L24 13.3331L16 21.3331L8 13.3331L9.88 11.4531Z"/> </svg> `}willUpdate(e){e.has("demand")&&this.demand&&z.getInstance().getPendingDemandDetails(this.demand.id).then((e=>{var t,E;this._demandDetails=e,(null===(t=this._demandDetails.recommendation)||void 0===t?void 0:t.status)&&(this._selectedResponseType=null===(E=this._demandDetails.recommendation)||void 0===E?void 0:E.status)}))}render(){const e=[{respStatus:G.status.GRANTED,class:"grant",display:C("Grant")},{respStatus:G.status.DENIED,class:"deny",display:C("Deny")}];return E` ${o(void 0!==this.demand,(()=>{var t;return E` <div id="list-item"> <span class="list-item__text">${new Date(this.demand.date).toLocaleDateString("en-gb")}</span> <span class="list-item__text">${null===(t=this.demand.data_subject)||void 0===t?void 0:t.id}</span> <span class="list-item__text">${this.demand.action}</span> <button id="list-item__expand-btn" class="svg-btn" @click="${()=>{this._open=!this._open}}"> ${this.getArrowSVG(this._open?"open":"close")} </button> </div> ${o(this._open,(()=>E` <div id="dropdown"> <bldn-toggle-button left="Respond" right="History" @bldn-toggle-button-change="${this.handleDropdownToggleChange}"></bldn-toggle-button> ${s(this._dropdownUiState,[[Re.Respond,()=>E` <div id="dropdown__response-ctr"> <span id="dropdown__response-heading">${C("Response")} -${o(this.isRecommended(),(()=>E` <span id="dropdown__response-heading--recommended"> ${C("Recommended")} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM5 8.5L2.5 6L3.205 5.295L5 7.085L8.795 3.29L9.5 4L5 8.5Z" fill="currentColor"/> </svg> </span> `),(()=>E` <span id="dropdown__response-heading--not-recommended"> ${C("Not Recommended")} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 1C3.235 1 1 3.235 1 6C1 8.765 3.235 11 6 11C8.765 11 11 8.765 11 6C11 3.235 8.765 1 6 1ZM8.5 7.795L7.795 8.5L6 6.705L4.205 8.5L3.5 7.795L5.295 6L3.5 4.205L4.205 3.5L6 5.295L7.795 3.5L8.5 4.205L6.705 6L8.5 7.795Z" fill="currentColor"/> </svg> </span> `))}</span> <textarea placeholder="${C("Optional Message")}" @input="${this.handleMessageInput}"></textarea> <div id="dropdown__response-btns"> ${i(e,(e=>E` <button class="response-btn response-btn--${e.class} ${this._selectedResponseType===e.respStatus?"response-btn--selected":""}" @click="${()=>{this._selectedResponseType=e.respStatus}}"> ${this.getRadioSVG(this._selectedResponseType===e.respStatus)} <span>${e.display}</span> </button> `))} </div> </div> <bldn-button @click="${this.handleSubmitClick}">${C("Submit")}</bldn-button> `],[Re.History,()=>E`${C("History view coming soon!")}`],[Re.Responded,()=>E`${C("Response Submmitted")} 📨`]])} </div> `))} `}))} `}};ne.styles=[X,e`
      :host {
        textarea {
          font-family: var(
            --bldn-font-family,
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif
          );
        }
      }

      #list-item {
        display: grid;
        grid-template-columns: repeat(3, 2fr) 1fr;
        border: 1px solid var(--color-light);
        border-radius: 5px;
      }

      .list-item__text {
        padding: 20px 0px;
      }

      #list-item__expand-btn {
        border: none;
        border-left: 1px solid var(--color-light);
        border-radius: 0px 5px 5px 0px;
      }

      #list-item__expand-btn svg {
        fill: var(--color-primary);
      }

      #dropdown {
        display: flex;
        margin-top: -5px;
        padding: 2vh 0vw;
        row-gap: 2vh;
        flex-direction: column;
        align-items: center;
        border: 1px solid var(--color-light);
        border-width: 0px 1px 1px 1px;
        border-radius: 0px 0px 20px 20px;
      }

      #dropdown__response-ctr {
        width: 75%;
        text-align: left;
      }

      #dropdown bldn-toggle-button {
        width: 200px;
      }

      #dropdown__response-heading {
        color: var(--color-dark);
        padding: 0px 0px 0px 5px;
        font-size: 14px;
      }

      #dropdown__response-heading--recommended {
        display: inline-flex;
        align-items: center;
        color: var(--color-positive);
        column-gap: 3px;
      }

      #dropdown__response-heading--not-recommended {
        display: inline-flex;
        align-items: center;
        color: var(--color-negative);
        column-gap: 3px;
      }

      #dropdown textarea {
        display: block;
        box-sizing: border-box;
        height: 7.5vh;
        width: 100%;
        margin: 3px 0px 0px 0px;
        padding: 5px;
        border: 1px solid var(--color-light);
        border-bottom: none;
        border-radius: 5px 5px 0px 0px;
        resize: none;
      }

      #dropdown__response-btns {
        width: 100%;
        display: flex;
        width: 100%;
      }

      .response-btn {
        display: flex;
        width: 100%;
        padding: 5px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-light);
        column-gap: 3px;
      }

      .response-btn--grant {
        color: var(--color-positive);
        border-radius: 0px 0px 0px 5px;
      }

      .response-btn--partial {
        color: var(--color-warning);
        border-radius: 0px;
      }

      .response-btn--deny {
        color: var(--color-negative);
        border-radius: 0px 0px 5px 0px;
      }

      .response-btn--selected {
        /* background-color: var(--color-light); */
        border-color: var(--color-primary);
        background: linear-gradient(
            0deg,
            rgba(var(--color-primary-rgb), 0.1),
            rgba(var(--color-primary-rgb), 0.1)
          ),
          #ffffff;
      }
    `],Q([r({type:Object})],ne.prototype,"demand",void 0),Q([A()],ne.prototype,"_demandDetails",void 0),Q([A()],ne.prototype,"_open",void 0),Q([A()],ne.prototype,"_dropdownUiState",void 0),Q([A()],ne.prototype,"_selectedResponseType",void 0),Q([A()],ne.prototype,"_message",void 0),ne=Q([R("bldn-data-consum-demand-list-item")],ne);let re=class extends t{constructor(){super(...arguments),this.demands=[]}render(){return E` ${o(this.demands.length>0,(()=>E` <div id="list__row--heading"> <span class="list__date-col"><b>${C("Created")}</b></span> <span><b>${C("Data Subject")}</b></span> <span><b>${C("Action")}</b></span> </div> <div id="list__items"> ${i(this.demands,(e=>E` <bldn-data-consum-demand-list-item demand="${JSON.stringify(e)}"></bldn-data-consum-demand-list-item> `))} </div> `),(()=>E`${C("No requests to display.")}`))} `}};re.styles=[X,e`:host{color:var(--color-dark)}#list__row--heading{display:grid;grid-template-columns:repeat(3,2fr) 1fr;padding:0 0 5px 0;font-size:14px}#list__items{display:grid;row-gap:10px}`],Q([r({type:Array})],re.prototype,"demands",void 0),re=Q([R("bldn-data-consum-demand-list")],re);let Ae=class extends t{constructor(){super(...arguments),this.demands=[]}render(){return E` <bldn-horizontal-list choices="${JSON.stringify([{id:"all",display:"All"},{id:"pending",display:"Pending",selected:!0},{id:"answered",display:"Answered"},{id:"canceled",display:"Canceled"}])}"></bldn-horizontal-list> <bldn-data-consum-demand-list demands="${JSON.stringify(this.demands)}"></bldn-data-consum-demand-list> `}};Ae.styles=e`bldn-horizontal-list{padding-bottom:4vh}`,Q([r({type:Array})],Ae.prototype,"demands",void 0),Ae=Q([R("bldn-data-consum-requests")],Ae);let Ne=class extends t{constructor(){super(...arguments),this.choices=[],this._selected=0}render(){return E` ${i(this.choices,((e,t)=>E` <button id="${e.id}" class="choice ${t===this._selected?"choice--selected":""}" @click="${()=>{this._selected=t}}"> ${e.display} </button> `))} `}willUpdate(e){e.has("choices")&&(this._selected=this.choices.findIndex((e=>e.selected)),this._selected<0&&(this._selected=0)),e.has("_selected")&&this.dispatchEvent(new CustomEvent("horizontal-list-choice-change",{detail:{selected:this.choices[this._selected]}}))}};Ne.styles=[X,e`:host{display:grid;grid-auto-flow:column;grid-auto-columns:1fr}.choice{padding:5px 20px;border:none;border-bottom:1px solid var(--color-medium)}.choice--selected{color:var(--color-primary);border-bottom:2px solid var(--color-primary)}button{color:var(--color-dark);font-size:16px}`],Q([r({type:Array})],Ne.prototype,"choices",void 0),Q([A()],Ne.prototype,"_selected",void 0),Ne=Q([R("bldn-horizontal-list")],Ne);let se=class extends t{constructor(){super(...arguments),this.left="",this.right="",this.selected="left"}handleClick(e){this.dispatchEvent(new CustomEvent("bldn-toggle-button-change",{detail:{newValue:"left"===e?this.left:this.right}})),this.selected=e}render(){return E` <button id="toggle-button-half__left" class="${"left"===this.selected?"toggle-button-half__selected":""}" @click="${()=>this.handleClick("left")}"> ${this.left} </button> <button id="toggle-button-half__right" class="${"right"===this.selected?"toggle-button-half__selected":""}" @click="${()=>this.handleClick("right")}"> ${this.right} </button> `}};se.styles=[X,e`:host{display:grid;grid-template-columns:repeat(2,1fr)}button{color:var(--color-dark);border:1px solid var(--color-light);padding:10px 20px;font-size:16px}#toggle-button-half__left{border-radius:7.5px 0 0 7.5px;border-right-width:1px;border-right-color:var(--color-primary)}#toggle-button-half__right{border-radius:0 7.5px 7.5px 0;border-left-width:0;border-left-color:var(--color-primary)}.toggle-button-half__selected{border-color:var(--color-primary);background:linear-gradient(0deg,rgba(var(--color-primary-rgb),.1),rgba(var(--color-primary-rgb),.1)),#fff;color:var(--color-primary)}`],Q([r({type:String,attribute:"left"})],se.prototype,"left",void 0),Q([r({type:String,attribute:"right"})],se.prototype,"right",void 0),Q([r({type:String,attribute:"selected"})],se.prototype,"selected",void 0),se=Q([R("bldn-toggle-button")],se);let ie=class extends t{constructor(){super(...arguments),this.type="primary"}render(){return E` <button> <slot></slot> </button> `}};ie.styles=[X,e`button{border:none;border-radius:5px;padding:1vh 2vw;color:#fff;font-size:16px;background:var(--bldn-button-color-primary,var(--color-primary));box-shadow:0 5px 10px rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.2),0 4px 8px rgba(0,0,0,.2),0 8px 16px rgba(0,0,0,.2)}button:not([disabled]):active{transform:translateY(2px);transition:.2s;box-shadow:0 5px 10px 0 rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.2),0 4px 8px rgba(0,0,0,.2),0 8px 16px rgba(0,0,0,.2)}.secondary{background:#fff;color:rgb(var(--bldn-button-color-primary,var(--bldn-color-primary,5,80,222)));border:1px solid rgb(var(--bldn-button-color-primary,var(--bldn-color-primary,5,80,222)))}.positive{background:var(--bldn-button-color-positive,var(--color-positive))}.warning{background:var(--bldn-button-color-warning,var(--color-warning))}.negative{background:var(--bldn-button-color-negative,var(--color-negative))}`],Q([r({type:String})],ie.prototype,"type",void 0),ie=Q([R("bldn-button")],ie);export{y as A,z as C,k as D,H as P,V as T,s as a,x as b,W as c,F as d,r as e,q as f,I as l,C as m,R as n,i as o,T as s,A as t};
