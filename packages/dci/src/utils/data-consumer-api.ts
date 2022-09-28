// import { MOTIVE } from '@blindnet/core';
// import { PendingDemandResponse } from '../models/pending-demand-response.js';
// import { PendingRequestsResponse } from '../models/pending-requests-response.js';

// /**
//  * Gets a list of all demands which are pending a response
//  * @returns {PendingRequestsResponse[]}
//  */
// export async function getPendingDemands() {
//   return fetch(
//     `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`,
//     {
//       method: 'GET',
//       headers: { accept: 'application/json' },
//     }
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json() as Promise<PendingRequestsResponse[]>;
//   });
// }

// /**
//  * Get the info and recomendation for a specific demand
//  * @param {string} id uuid of the demand
//  * @returns {PendingDemandResponse}
//  */
// export async function getPendingDemand(id: string) {
//   return fetch(
//     `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${id}`,
//     {
//       method: 'GET',
//       headers: { accept: 'application/json' },
//     }
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json() as Promise<PendingDemandResponse>;
//   });
// }

// /**
//  * Approve a demand
//  * @param id uuid of the demand to approve
//  * @param msg optional message explaining the approval
//  * @param lang language of the message
//  * @returns
//  */
// export async function approveDemand(
//   id: string,
//   msg: string,
//   lang: string = 'en'
// ) {
//   if (id === undefined) {
//     throw TypeError('You must pass an ID of the demand to deny.');
//   }

//   return fetch(
//     `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, msg, lang }),
//     }
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//   });
// }

// /**
//  * Deny a demand
//  * @param id uuid of the demand to deny
//  * @param msg optional message explaining the denial
//  * @param motive motive for the denial. for the DCI, we are in the situation where demands
//  * are being manually processed, so we assume the motive will be explained in msg and default to
//  * 'OTHER-MOTIVE'.
//  * @param lang language of the message
//  * @returns
//  */
// export async function denyDemand(
//   id: string,
//   msg: string,
//   motive: MOTIVE = MOTIVE['OTHER-MOTIVE'],
//   lang: string = 'en'
// ) {
//   if (id === undefined) {
//     throw TypeError('You must pass an ID of the demand to deny.');
//   }

//   return fetch(
//     `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id, motive, msg, lang }),
//     }
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//   });
// }
