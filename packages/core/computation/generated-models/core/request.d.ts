import type { ApiRequestOptions } from './ApiRequestOptions.js';
import { CancelablePromise } from './CancelablePromise.js';
import type { OnCancel } from './CancelablePromise.js';
import type { OpenAPIConfig } from './OpenAPI.js';
export declare const sendRequest: (config: OpenAPIConfig, options: ApiRequestOptions, url: string, body: any, formData: FormData | undefined, headers: Headers, onCancel: OnCancel) => Promise<Response>;
/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export declare const request: <T>(config: OpenAPIConfig, options: ApiRequestOptions) => CancelablePromise<T>;
