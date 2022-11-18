export interface CoreConfiguration {
    /**
     * base URL of the computation API
     * if "false", then a mocked endpoint will be used
     * if empty, then the blindnet staging endpoint will be used
     *
     * @example 'https://localhost:9000/v0
     */
    computationBaseUrl?: string;
    /**
     * Auth token or user ID to use in the authorization header of API requests.
     * if empty, a default value 'john.doe@example.com' will be used.
     */
    apiToken?: string;
    adminToken?: string;
}
/**
 * Central utilitary class for the @blindnet/core library.
 */
export declare abstract class BlindnetCore {
    private static _configuration;
    /**
     * Set-up the global configuration for all privacy components in the document.
     *
     * @param force override any preexisting configuration
     * @returns true if the new configuration has been taken into account
     */
    static configure(configuration: CoreConfiguration, force?: boolean): boolean;
    static setToken(apiToken: string): void;
    static setAdminToken(adminToken: string): void;
    /**
     * Use configuration to correctly set up everything internally.
     *
     * @param force override any preexisting configuration
     */
    private static setUp;
    /**
     * Get the configuration currently applied to all privacy components in the document.
     */
    static get configuration(): CoreConfiguration;
}
declare global {
    var BlindnetCore: BlindnetCore;
}