import { PendingDemandResponse } from '../models/pending-demand-response.js';
import { PendingRequestsResponse } from '../models/pending-requests-response.js';

export async function getPendingDemands() {
  return fetch(
    `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<PendingRequestsResponse[]>;
  });
}

export async function getPendingDemand(demandId: string) {
  return fetch(
    `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${demandId}`,
    {
      method: 'GET',
      headers: { accept: 'application/json' },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<PendingDemandResponse>;
  });
}

export async function approveDemand(
  id: string,
  msg: string,
  lang: string = 'en'
) {
  return fetch(
    `https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, msg, lang }),
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<any>;
  });
}
