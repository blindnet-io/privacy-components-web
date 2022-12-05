import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setLocale } from './localization.js';

let BldnBridgeAlerts = class BldnBridgeAlerts extends LitElement {
    constructor() {
        super();
        // Set locale if current one is supported
        try {
            setLocale(navigator.language);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.log(`Could not set locale to ${navigator.language}.`);
        }
    }
    render() {
        return html `Alerts view coming soon!`;
    }
};
BldnBridgeAlerts = __decorate([
    localized(),
    customElement('bldn-bridge-alerts')
], BldnBridgeAlerts);

export { BldnBridgeAlerts };
//# sourceMappingURL=bldn-bridge-alerts.js.map
