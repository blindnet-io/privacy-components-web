/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RecommendationPayload } from './RecommendationPayload.js';

export type ChangeRecommendationPayload = {
  demand_id: string;
  recommendation: RecommendationPayload;
};
