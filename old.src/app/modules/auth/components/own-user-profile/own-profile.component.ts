import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { uiroutes } from 'src/app/shared/common/ui-routes';
import {
  resources,
  RESOURCE_ACTIONS,
  User,
} from 'src/app/shared/common/models';
import { AuthorizationService } from 'src/app/shared/api/authorization/authorization.service';
import { AuthState } from '../../state/auth.state';

@Component({
  selector: 'app-own-profile',
  templateUrl: './own-profile.component.html',
  styleUrls: [
    './own-profile.component.scss',
    './../../../../shared/common/shared-styles.css',
  ],
})
export class OwnProfileComponent implements OnInit, OnDestroy {
  resource = resources.OWN_PROFILE;
  resourceActions = RESOURCE_ACTIONS;
  @Select(AuthState.getCurrentMember)
  currentMember$: Observable<User>;
  currentMember: User;

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthorizationService
  ) {
    this.currentMember$.subscribe((val) => {
      this.currentMember = val;
    });
  }

  authorizeResourceMethod(action) {
    return this.auth.authorizeResource(this.resource, action, {
      adminIds: [this.currentMember.id],
    });
  }

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

  editMember() {
    this.router.navigate([uiroutes.MEMBER_FORM_ROUTE.route]);
  }

  ngOnDestroy(): void {}
}
