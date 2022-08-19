import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

let DataConsumerInterface = class DataConsumerInterface extends LitElement {
    render() {
        return html `Hello Data Consumer!`;
    }
};
DataConsumerInterface = __decorate([
    customElement('bldn-data-consum')
], DataConsumerInterface);

export { DataConsumerInterface };
//# sourceMappingURL=DataConsumerInterface.js.map
