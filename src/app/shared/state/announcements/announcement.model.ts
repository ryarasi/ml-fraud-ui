import {
  FetchPolicy,
  Announcement,
  FetchParams,
  startingFetchParams,
} from '../../common/models';

export const emptyAnnouncementFormRecord: Announcement = {
  id: null,
  title: null,
  author: null,
  message: null,
  institution: null,
  groups: [],
};
export interface AnnouncementStateModel {
  announcements: Announcement[];
  lastPage: number;
  announcementsSubscribed: boolean;
  fetchPolicy: FetchPolicy;
  fetchParamss: FetchParams[];
  announcementFormId: number;
  announcementFormRecord: Announcement;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultAnnouncementState: AnnouncementStateModel = {
  announcements: [],
  lastPage: null,
  announcementsSubscribed: false,
  fetchPolicy: null,
  fetchParamss: [],
  announcementFormId: null,
  announcementFormRecord: emptyAnnouncementFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};

export const AnnouncementFormCloseURL =
  'dashboard?adminSection=Institutions&tab=Announcements';
