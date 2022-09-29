/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class HealthService {
  /**
   * Is the app running?
   * @returns any
   * @throws ApiError
   */
  public static getV0Health(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/health',
    });
  }
}
