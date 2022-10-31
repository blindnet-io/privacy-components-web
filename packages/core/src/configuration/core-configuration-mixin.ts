import type { LitElement, PropertyValueMap } from 'lit';
import { BlindnetCore } from '../BlindnetCore.js';

declare type Constructor<T = {}> = new (...args: any[]) => T;

export interface CoreConfigurationMixinInterface {
  computationBaseURL: string;
  apiToken: string;
  adminToken: string;
}

/**
 * Add BlindnetCore configuration parameters to a component as properties
 *
 * All PC4W in the same document needs to use the same configuration.
 * Favor using BlindnetCore.configure when using more than one PC4W in the same document.
 */
export function CoreConfigurationMixin<
  SuperClass extends Constructor<LitElement>
>(
  superClass: SuperClass
): SuperClass & Constructor<CoreConfigurationMixinInterface> {
  return class CoreConfiguratorElement extends superClass {
    static get properties() {
      // @ts-ignore
      const superProps = super.properties || {};
      return {
        ...superProps,
        computationBaseURL: { type: String, attribute: 'computation-base-url' },
        apiToken: { type: String, attribute: 'api-token', reflect: true },
        adminToken: { type: String, attribute: 'admin-token', reflect: true },
      };
    }

    /**
     * base URL of the computation API
     * if "false", then a mocked endpoint will be used
     * if empty, then the blindnet staging endpoint will be used
     *
     * @example 'https://localhost:9000/v0
     */
    computationBaseURL = '';

    /**
     * Auth token or user ID to use in the authorization header of API requests.
     * if empty, no authorization header will be passed.
     */
    apiToken = '';

    adminToken = '';

    connectedCallback() {
      super.connectedCallback();

      BlindnetCore.configure(
        {
          computationBaseUrl: this.computationBaseURL,
          apiToken: this.apiToken,
          adminToken: this.adminToken,
        },
        false
      );
    }

    protected willUpdate(
      _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
    ): void {
      if (_changedProperties.has('apiToken')) {
        BlindnetCore.setToken(this.apiToken);
      }
      if (_changedProperties.has('adminToken')) {
        BlindnetCore.setAdminToken(this.adminToken);
      }
    }
  };
}
