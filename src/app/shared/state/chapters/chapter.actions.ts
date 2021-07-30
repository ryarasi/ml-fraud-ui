import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SearchParams } from '../../abstract/master-grid/table.model';
import { idPayload } from '../../common/models';

export class FetchChaptersAction {
  static readonly type = '[CHAPTERS] Fetch';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class FetchNextChaptersAction {
  static readonly type = '[CHAPTERS] Fetch Next';

  constructor() {}
}
export class ChapterSubscriptionAction {
  static readonly type = '[CHAPTERS] Subscribe';

  constructor() {}
}

export class ForceRefetchChaptersAction {
  static readonly type = '[CHAPTERS] Fetch from network';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class GetChapterAction {
  static readonly type = '[CHAPTER] Get';

  constructor(public payload: idPayload) {}
}

export class CreateUpdateChapterAction {
  static readonly type = '[CHAPTER] Create';

  constructor(
    public payload: {
      form: FormGroup;
      formDirective: FormGroupDirective;
    }
  ) {}
}

export class ResetChapterFormAction {
  static readonly type = '[CHAPTER] Reset Form';

  constructor() {}
}

export class DeleteChapterAction {
  static readonly type = '[CHAPTER] Delete';

  constructor(public payload: idPayload) {}
}