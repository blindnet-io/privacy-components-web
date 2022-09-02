import { ACTION, DATA_CATEGORY, PROCESSING_CATEGORY, PURPOSE, PROVENANCE, TARGET } from '../models/priv-terms.js';

function getDefaultActions() {
    return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}
function getDefaultDemand(action) {
    switch (action) {
        case ACTION.ACCESS:
            return {
                action,
                restrictions: {
                    privacy_scope: Object.values(DATA_CATEGORY)
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
                    privacy_scope: Object.values(DATA_CATEGORY)
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

export { getDefaultActions, getDefaultDemand, getDefaultDemands };
//# sourceMappingURL=utils.js.map
