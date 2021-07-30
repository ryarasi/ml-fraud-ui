import {
  FetchPolicy,
  Report,
  FetchParams,
  startingFetchParams,
} from '../../common/models';

export const emptyReportFormRecord: Report = {
  id: null,
  participant: null,
  course: null,
  institution: null,
  completed: null,
  score: null,
};
export interface ReportStateModel {
  reports: Report[];
  lastPage: number;
  reportsSubscribed: boolean;
  fetchPolicy: FetchPolicy;
  fetchParamObjects: FetchParams[];
  reportFormId: number;
  reportFormRecord: Report;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultReportState: ReportStateModel = {
  reports: [],
  lastPage: null,
  reportsSubscribed: false,
  fetchPolicy: null,
  fetchParamObjects: [],
  reportFormId: null,
  reportFormRecord: emptyReportFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};

export const ReportFormCloseURL =
  'dashboard?adminSection=Institutions&tab=Reports';