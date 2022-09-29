import { Demand } from './demand.js';
import { DataSubject } from './data-subject.js';
import { TARGET, TARGET_DIRECTION } from './priv-terms.js';
export interface PrivacyRequest {
    demands: Demand[];
    data_subject: DataSubject[];
    email: string;
    target: TARGET | TARGET_DIRECTION;
}
