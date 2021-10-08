import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ChapterState } from 'src/app/modules/dashboard/modules/course/state/chapters/chapter.state';
import {
  Chapter,
  ChapterStatusOptions,
  resources,
  RESOURCE_ACTIONS,
} from 'src/app/shared/common/models';
import {
  GetChapterAction,
  ResetChapterFormAction,
} from 'src/app/modules/dashboard/modules/course/state/chapters/chapter.actions';
import { AuthorizationService } from 'src/app/shared/api/authorization/authorization.service';
import { ActivatedRoute } from '@angular/router';
import { ResetExerciseStateAction } from '../../../state/exercises/exercise.actions';
import { ResetExerciseSubmissionFormAction } from '../../../state/exerciseSubmissions/exerciseSubmission.actions';

type previewImage = {
  url: string;
  file: any;
};

@Component({
  selector: 'app-chapter-profile',
  templateUrl: './chapter-profile.component.html',
  styleUrls: [
    './chapter-profile.component.scss',
    './../../../../../../../shared/common/shared-styles.css',
  ],
})
export class ChapterProfileComponent implements OnDestroy {
  resource = resources.CHAPTER;
  resourceActions = RESOURCE_ACTIONS;
  chapterStatusOptions = ChapterStatusOptions;
  @Select(ChapterState.getChapterFormRecord)
  chapter$: Observable<Chapter>;
  chapter: Chapter;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private auth: AuthorizationService
  ) {
    this.chapter$.subscribe((val) => {
      this.chapter = val;
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const chapterId = params['id'];
      if (chapterId) {
        this.store.dispatch(new GetChapterAction({ id: chapterId }));
      }
    });
  }
  showDraft() {
    return (
      this.chapter.status == this.chapterStatusOptions.draft &&
      this.authorizeResourceMethod(this.resourceActions.CREATE)
    );
  }
  authorizeResourceMethod(action) {
    return this.auth.authorizeResource(this.resource, action);
  }
  ngOnDestroy(): void {
    this.store.dispatch(new ResetExerciseStateAction());
    this.store.dispatch(new ResetChapterFormAction());
    this.store.dispatch(new ResetExerciseSubmissionFormAction());
  }
}