import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { localized } from '@lit/localize';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setLocale } from './localization.js';

let DataConsumerAlerts = class DataConsumerAlerts extends LitElement {
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
DataConsumerAlerts = __decorate([
    localized(),
    customElement('bldn-data-consum-alerts')
], DataConsumerAlerts);

export { DataConsumerAlerts };
//# sourceMappingURL=bldn-data-consum-alerts.js.map
