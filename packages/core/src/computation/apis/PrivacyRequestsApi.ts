/* tslint:disable */
/* eslint-disable */
/**
 * Privacy computation engine
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.5.0-SNAPSHOT
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';
import type {
  CancelDemandPayload,
  CreatePrivacyRequestPayload,
  PrivacyRequestCreatedPayload,
  PrivacyResponsePayload,
  RequestHistoryPayload,
} from '../models';
import {
  CancelDemandPayloadFromJSON,
  CancelDemandPayloadToJSON,
  CreatePrivacyRequestPayloadFromJSON,
  CreatePrivacyRequestPayloadToJSON,
  PrivacyRequestCreatedPayloadFromJSON,
  PrivacyRequestCreatedPayloadToJSON,
  PrivacyResponsePayloadFromJSON,
  PrivacyResponsePayloadToJSON,
  RequestHistoryPayloadFromJSON,
  RequestHistoryPayloadToJSON,
} from '../models';

export interface GetV0PrivacyRequestHistoryRequest {
  authorization: string;
}

export interface GetV0PrivacyRequestRequestidRequest {
  requestId: string;
  authorization: string;
}

export interface PostV0PrivacyRequestRequest {
  createPrivacyRequestPayload: CreatePrivacyRequestPayload;
}

export interface PostV0PrivacyRequestCancelRequest {
  authorization: string;
  cancelDemandPayload: CancelDemandPayload;
}

/**
 *
 */
export class PrivacyRequestsApi extends runtime.BaseAPI {
  /**
   * Get history of privacy requests
   */
  async getV0PrivacyRequestHistoryRaw(
    requestParameters: GetV0PrivacyRequestHistoryRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<RequestHistoryPayload>> {
    if (
      requestParameters.authorization === null ||
      requestParameters.authorization === undefined
    ) {
      throw new runtime.RequiredError(
        'authorization',
        'Required parameter requestParameters.authorization was null or undefined when calling getV0PrivacyRequestHistory.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (
      requestParameters.authorization !== undefined &&
      requestParameters.authorization !== null
    ) {
      headerParameters['Authorization'] = String(
        requestParameters.authorization
      );
    }

    const response = await this.request(
      {
        path: `/v0/privacy-request/history`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      RequestHistoryPayloadFromJSON(jsonValue)
    );
  }

  /**
   * Get history of privacy requests
   */
  async getV0PrivacyRequestHistory(
    requestParameters: GetV0PrivacyRequestHistoryRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<RequestHistoryPayload> {
    const response = await this.getV0PrivacyRequestHistoryRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Get privacy request status
   */
  async getV0PrivacyRequestRequestidRaw(
    requestParameters: GetV0PrivacyRequestRequestidRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Array<PrivacyResponsePayload>>> {
    if (
      requestParameters.requestId === null ||
      requestParameters.requestId === undefined
    ) {
      throw new runtime.RequiredError(
        'requestId',
        'Required parameter requestParameters.requestId was null or undefined when calling getV0PrivacyRequestRequestid.'
      );
    }

    if (
      requestParameters.authorization === null ||
      requestParameters.authorization === undefined
    ) {
      throw new runtime.RequiredError(
        'authorization',
        'Required parameter requestParameters.authorization was null or undefined when calling getV0PrivacyRequestRequestid.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (
      requestParameters.authorization !== undefined &&
      requestParameters.authorization !== null
    ) {
      headerParameters['Authorization'] = String(
        requestParameters.authorization
      );
    }

    const response = await this.request(
      {
        path: `/v0/privacy-request/{requestId}`.replace(
          `{${'requestId'}}`,
          encodeURIComponent(String(requestParameters.requestId))
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      jsonValue.map(PrivacyResponsePayloadFromJSON)
    );
  }

  /**
   * Get privacy request status
   */
  async getV0PrivacyRequestRequestid(
    requestParameters: GetV0PrivacyRequestRequestidRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Array<PrivacyResponsePayload>> {
    const response = await this.getV0PrivacyRequestRequestidRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Create a privacy request
   */
  async postV0PrivacyRequestRaw(
    requestParameters: PostV0PrivacyRequestRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<PrivacyRequestCreatedPayload>> {
    if (
      requestParameters.createPrivacyRequestPayload === null ||
      requestParameters.createPrivacyRequestPayload === undefined
    ) {
      throw new runtime.RequiredError(
        'createPrivacyRequestPayload',
        'Required parameter requestParameters.createPrivacyRequestPayload was null or undefined when calling postV0PrivacyRequest.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request(
      {
        path: `/v0/privacy-request`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CreatePrivacyRequestPayloadToJSON(
          requestParameters.createPrivacyRequestPayload
        ),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, jsonValue =>
      PrivacyRequestCreatedPayloadFromJSON(jsonValue)
    );
  }

  /**
   * Create a privacy request
   */
  async postV0PrivacyRequest(
    requestParameters: PostV0PrivacyRequestRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<PrivacyRequestCreatedPayload> {
    const response = await this.postV0PrivacyRequestRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Cancel a pending demand
   */
  async postV0PrivacyRequestCancelRaw(
    requestParameters: PostV0PrivacyRequestCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.authorization === null ||
      requestParameters.authorization === undefined
    ) {
      throw new runtime.RequiredError(
        'authorization',
        'Required parameter requestParameters.authorization was null or undefined when calling postV0PrivacyRequestCancel.'
      );
    }

    if (
      requestParameters.cancelDemandPayload === null ||
      requestParameters.cancelDemandPayload === undefined
    ) {
      throw new runtime.RequiredError(
        'cancelDemandPayload',
        'Required parameter requestParameters.cancelDemandPayload was null or undefined when calling postV0PrivacyRequestCancel.'
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (
      requestParameters.authorization !== undefined &&
      requestParameters.authorization !== null
    ) {
      headerParameters['Authorization'] = String(
        requestParameters.authorization
      );
    }

    const response = await this.request(
      {
        path: `/v0/privacy-request/cancel`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: CancelDemandPayloadToJSON(requestParameters.cancelDemandPayload),
      },
      initOverrides
    );

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Cancel a pending demand
   */
  async postV0PrivacyRequestCancel(
    requestParameters: PostV0PrivacyRequestCancelRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<void> {
    await this.postV0PrivacyRequestCancelRaw(requestParameters, initOverrides);
  }
}
