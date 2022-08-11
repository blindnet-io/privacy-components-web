import { ACTION } from '../models/priv-terms.js';

function getDefaultActions() {
    return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}

export { getDefaultActions };
//# sourceMappingURL=utils.js.map
