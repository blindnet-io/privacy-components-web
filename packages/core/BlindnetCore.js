import { ComputationAPI } from './computation/computation-api.js';

/**
 * Central utilitary class for the @blindnet/core library.
 */
class BlindnetCore {
    /**
     * Set-up the global configuration for all privacy components in the document.
     *
     * @param force override any preexisting configuration
     * @returns true if the new configuration has been taken into account
     */
    static configure(configuration, force = true) {
        const isConfigUpdated = BlindnetCore.setUp(configuration, force);
        if (isConfigUpdated) {
            BlindnetCore._configuration = configuration;
        }
        return isConfigUpdated;
    }
    /**
     * Use configuration to correctly set up everything internally.
     *
     * @param force override any preexisting configuration
     */
    static setUp(configuration, force) {
        let isConfigUpdated = true;
        isConfigUpdated =
            isConfigUpdated &&
                ComputationAPI.configure(configuration.computationBaseUrl, force);
        return isConfigUpdated;
    }
    /**
     * Get the configuration currently applied to all privacy components in the document.
     */
    static get configuration() {
        return BlindnetCore._configuration;
    }
}
// for debugging and more advanced usage
// eslint-disable-next-line no-undef
(globalThis || window).BlindnetCore = BlindnetCore;

export { BlindnetCore };
//# sourceMappingURL=BlindnetCore.js.map
