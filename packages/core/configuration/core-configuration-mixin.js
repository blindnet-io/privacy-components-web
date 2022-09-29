import { BlindnetCore } from '../BlindnetCore.js';

/**
 * Add BlindnetCore configuration parameters to a component as properties
 *
 * All PC4W in the same document needs to use the same configuration.
 * Favor using BlindnetCore.configure when using more than one PC4W in the same document.
 */
function CoreConfigurationMixin(superClass) {
    return class CoreConfiguratorElement extends superClass {
        constructor() {
            super(...arguments);
            /**
             * base URL of the computation API
             * if "false", then a mocked endpoint will be used
             * if empty, then the blindnet staging endpoint will be used
             *
             * @example 'https://localhost:9000/v0
             */
            this.computationBaseURL = '';
        }
        static get properties() {
            // @ts-ignore
            const superProps = super.properties || {};
            return {
                ...superProps,
                computationBaseURL: { type: String, attribute: 'computation-base-url' },
            };
        }
        connectedCallback() {
            super.connectedCallback();
            BlindnetCore.configure({
                computationBaseUrl: this.computationBaseURL,
            }, false);
        }
    };
}

export { CoreConfigurationMixin };
//# sourceMappingURL=core-configuration-mixin.js.map
