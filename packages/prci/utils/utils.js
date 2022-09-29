import { html } from 'lit';
import { ACTION, DATA_CATEGORY, PROCESSING_CATEGORY, PURPOSE, PROVENANCE, TARGET } from '@blindnet/core';
import { PRCI_CONFIG } from './conf.js';
import { DATA_CATEGORY_TITLES, POLICY_TYPE_TITLES, AFTER_TITLES } from './dictionary.js';

function getDefaultActions() {
    return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}
function getDefaultDataCategories() {
    return Object.values(DATA_CATEGORY).filter(dc => !dc.includes('.'));
}
function getDefaultDemand(action) {
    switch (action) {
        case ACTION.ACCESS:
            return {
                action,
                restrictions: {
                    privacy_scope: PRCI_CONFIG['access-allowed-data-categories']
                        .filter(dc => !dc.includes('.') && !dc.includes('*'))
                        .map(dc => ({
                        dc,
                        pc: PROCESSING_CATEGORY.ALL,
                        pp: PURPOSE.ALL,
                    })),
                    provenance: {
                        term: PROVENANCE.ALL,
                        target: TARGET.SYSTEM,
                    },
                    date_range: {},
                },
            };
        case ACTION.DELETE:
            return {
                action,
                restrictions: {
                    privacy_scope: PRCI_CONFIG['delete-allowed-data-categories']
                        .filter(dc => !dc.includes('.') && !dc.includes('*'))
                        .map(dc => ({
                        dc,
                        pc: PROCESSING_CATEGORY.ALL,
                        pp: PURPOSE.ALL,
                    })),
                    provenance: {
                        term: PROVENANCE.ALL,
                        target: TARGET.SYSTEM,
                    },
                    date_range: {},
                },
            };
        case ACTION.REVOKE:
            return {
                action,
            };
        default:
            throw Error(`No default demand for action: ${action}!`);
    }
}
function getDefaultDemands(action) {
    if (action === ACTION.TRANSPARENCY) {
        return Object.values(ACTION)
            .filter(a => a.includes('TRANSPARENCY.'))
            .map(a => ({
            action: a,
            restrictions: {
                provenance: {
                    term: PROVENANCE.ALL,
                },
            },
        }));
    }
    throw Error('Only TRANSPARENCY action should have multiple demands!');
}
/**
 * Get a user friendly string for a retention policy
 * @param dataCategory Data category the policy pertains to
 * @param policy Type of the policy
 * @param duration String quantifying the duration, e.g. 10 months
 * @param after Point after which the data is kept
 * @returns String combining the provided information to represent a retention policy
 */
function getRetentionPolicyString(dataCategory, policyType, duration, after) {
    // FIXME: For our first demo, we assume duration is in months
    return html `<i>${DATA_CATEGORY_TITLES[dataCategory]().toLocaleUpperCase()}</i>
    data is kept <i>${POLICY_TYPE_TITLES[policyType]().toLocaleUpperCase()}</i>
    <i>${duration}</i> months after
    <i>${AFTER_TITLES[after]().toLocaleUpperCase()}</i>`;
}
/**
 * Get a link to the status page for the request denoted by requestId
 * @param requestId ID of the privacy request
 * @returns
 */
function getRequestLink(requestId) {
    const url = new URL(document.URL);
    url.searchParams.set('requestId', requestId);
    return url;
}
/**
 * Remove a query parameter from current window URL without reloading the page
 * @param param string denoting the query parameter
 */
function removeQueryParam(param) {
    const url = new URL(document.URL);
    url.searchParams.delete(param);
    window.history.pushState({}, '', url);
}

export { getDefaultActions, getDefaultDataCategories, getDefaultDemand, getDefaultDemands, getRequestLink, getRetentionPolicyString, removeQueryParam };
//# sourceMappingURL=utils.js.map
