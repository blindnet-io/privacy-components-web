import type { LitElement } from 'lit';
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
export declare function CoreConfigurationMixin<SuperClass extends Constructor<LitElement>>(superClass: SuperClass): SuperClass & Constructor<CoreConfigurationMixinInterface>;
export {};
