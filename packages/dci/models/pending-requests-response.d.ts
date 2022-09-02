import { DataSubject } from '@blindnet/prci/src/models/data-subject.js';
import { ACTION } from '@blindnet/prci/src/models/priv-terms.js';
export interface PendingRequestsResponse {
    id: string;
    date: string;
    action: ACTION;
    data_subject: DataSubject;
}
