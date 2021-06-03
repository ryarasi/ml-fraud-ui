import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginModalComponent } from 'src/app/pages/modals/login/login-modal.component';
import { CurrentMember } from '../../common/models';
import { uiroutes } from '../../common/ui-routes';
import {
  LoginAction,
  LogoutAction,
  OpenLoginFormAction,
} from '../../state/auth/auth.actions';
import { AuthStateModel } from '../../state/auth/auth.model';
import { AuthState } from '../../state/auth/auth.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  dashboardRoute: string = uiroutes.DASHBOARD_ROUTE;
  profileRoute: string = uiroutes.MEMBER_PROFILE_ROUTE;
  accountRoute: string = uiroutes.ACCOUNT_ROUTE;
  supportRoute: string = uiroutes.SUPPORT_ROUTE;
  @Select(AuthState)
  authState$: Observable<AuthStateModel>;
  authState: AuthStateModel;
  currentMember: CurrentMember;
  isLoggedIn: boolean;
  isFullyAuthenticated: Boolean;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.authState$.subscribe((val) => {
      this.authState = val;
      this.isLoggedIn = this.authState.isLoggedIn;
      this.isFullyAuthenticated = this.authState.isFullyAuthenticated;
      this.currentMember = this.authState.currentMember;
    });
  }

  onAvatarClick() {
    this.router.navigateByUrl(uiroutes.MEMBER_PROFILE_ROUTE);
  }

  login() {
    this.store.dispatch(new OpenLoginFormAction());
    const dialogRef = this.dialog.open(LoginModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
  ngOnInit(): void {}
}
