import type { DemandResolution } from './DemandResolution.js';
export type DemandResolutionStrategy = {
    transparency: DemandResolution;
    access: DemandResolution;
    delete: DemandResolution;
    consents: DemandResolution;
};
