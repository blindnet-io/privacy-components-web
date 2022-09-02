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
async function getPendingDemand(demandId) {
    return fetch(`https://devkit-pce-staging.azurewebsites.net/v0/consumer-interface/pending-requests/${demandId}`, {
        method: 'GET',
        headers: { accept: 'application/json' },
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
async function approveDemand(id, msg, lang = 'en') {
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

export { approveDemand, getPendingDemand, getPendingDemands };
//# sourceMappingURL=data-consumer-api.js.map
