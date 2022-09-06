import { MOTIVE } from '@blindnet/prci/dist/models/priv-terms.js';

/**
 * Gets a list of all demands which are pending a response
 * @returns {PendingRequestsResponse[]}
 */
async function getPendingDemands() {
    return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests`, {
        method: 'GET',
        headers: { accept: 'application/json' },
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
/**
 * Get the info and recomendation for a specific demand
 * @param {string} id uuid of the demand
 * @returns {PendingDemandResponse}
 */
async function getPendingDemand(id) {
    return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${id}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
/**
 * Approve a demand
 * @param id uuid of the demand to approve
 * @param msg optional message explaining the approval
 * @param lang language of the message
 * @returns
 */
async function approveDemand(id, msg, lang = 'en') {
    if (id === undefined) {
        throw TypeError('You must pass an ID of the demand to deny.');
    }
    return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, msg, lang }),
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    });
}
/**
 * Deny a demand
 * @param id uuid of the demand to deny
 * @param msg optional message explaining the denial
 * @param motive motive for the denial. for the DCI, we are in the situation where demands
 * are being manually processed, so we assume the motive will be explained in msg and default to
 * 'OTHER-MOTIVE'.
 * @param lang language of the message
 * @returns
 */
async function denyDemand(id, msg, motive = MOTIVE['OTHER-MOTIVE'], lang = 'en') {
    if (id === undefined) {
        throw TypeError('You must pass an ID of the demand to deny.');
    }
    return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, motive, msg, lang }),
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    });
}

export { approveDemand, denyDemand, getPendingDemand, getPendingDemands };
//# sourceMappingURL=data-consumer-api.js.map
