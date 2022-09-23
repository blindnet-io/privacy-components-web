/* eslint-disable max-classes-per-file */
import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ComputationAPI } from '../utils/computation-api.js';

type Constructor<T> = new (...args: any[]) => T;

export declare class WithComputationApiInterface {
  computationApi: ComputationAPI;

  computationBaseURL: string;
}

export const WithComputationApi = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  class WithComputationApiElement extends superClass {
    computationApi!: ComputationAPI;

    /**
     * base URL of the computation API
     * @example 'https://localhost:9000/v0
     */
    @property({ type: String, attribute: "computation-base-url" }) computationBaseURL = '';

    connectedCallback() {
      super.connectedCallback();

      this.computationApi = new ComputationAPI(this.computationBaseURL, false);
    }
  }

  return WithComputationApiElement as Constructor<WithComputationApiInterface> &
    T;
};
