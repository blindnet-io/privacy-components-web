import { DataSubject } from '@blindnet/prci/src/models/data-subject.js';
import { ACTION } from '@blindnet/prci/src/models/priv-terms.js';
import { Recomendation } from './Recomendation.js';
export interface PendingDemandResponse {
    id: string;
    date: string;
    action: ACTION;
    data_subject: DataSubject;
    recommendation: Recomendation;
}
