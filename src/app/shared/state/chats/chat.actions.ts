import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SearchParams } from '../../abstract/master-grid/table.model';
import { idPayload } from '../../common/models';

export class FetchChatsAction {
  static readonly type = '[CHATS] Fetch';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class SearchChatMembersAction {
  static readonly type = '[CHATS] Search Members to Chat with';

  constructor(public payload: { query: string }) {}
}
export class ForceRefetchChatsAction {
  static readonly type = '[CHATS] Fetch from network';

  constructor(public payload: { searchParams: SearchParams }) {}
}

export class ClearChatMembers {
  static readonly type = '[CHAT] Clear Chat Members';

  constructor() {}
}

export class GetIntoChatAction {
  static readonly type = '[CHAT] Get with Member ID';

  constructor(public payload: idPayload) {}
}
export class GetChatAction {
  static readonly type = '[CHAT] Get';

  constructor(public payload: idPayload) {}
}

export class CreateUpdateChatAction {
  static readonly type = '[CHAT] Create';

  constructor(
    public payload: { form: FormGroup; formDirective: FormGroupDirective }
  ) {}
}

export class ResetChatFormAction {
  static readonly type = '[CHAT] Reset Form';

  constructor() {}
}

export class DeleteChatAction {
  static readonly type = '[CHAT] Delete';

  constructor(public payload: idPayload) {}
}