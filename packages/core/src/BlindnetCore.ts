import { ComputationAPI } from './computation/computation-api.js';

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
}

/**
 * Central utilitary class for the @blindnet/core library.
 */
export abstract class BlindnetCore {
  private static _configuration: CoreConfiguration;

  /**
   * Set-up the global configuration for all privacy components in the document.
   *
   * @param force override any preexisting configuration
   * @returns true if the new configuration has been taken into account
   */
  static configure(configuration: CoreConfiguration, force = true): boolean {
    const isConfigUpdated = BlindnetCore.setUp(configuration, force);
    if (isConfigUpdated) {
      BlindnetCore._configuration = configuration;
    }
    return isConfigUpdated;
  }

  static setToken(apiToken: string) {
    BlindnetCore._configuration.apiToken = apiToken;
    ComputationAPI.getInstance().setToken(apiToken);
  }

  /**
   * Use configuration to correctly set up everything internally.
   *
   * @param force override any preexisting configuration
   */
  private static setUp(
    configuration: CoreConfiguration,
    force: boolean
  ): boolean {
    let isConfigUpdated = true;
    isConfigUpdated =
      isConfigUpdated &&
      ComputationAPI.configure(
        configuration.computationBaseUrl,
        configuration.apiToken,
        force
      );
    return isConfigUpdated;
  }

  /**
   * Get the configuration currently applied to all privacy components in the document.
   */
  static get configuration() {
    return BlindnetCore._configuration;
  }
}

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var BlindnetCore: BlindnetCore;
}

// for debugging and more advanced usage
// eslint-disable-next-line no-undef
(globalThis || window).BlindnetCore = BlindnetCore;
