import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { uiroutes } from './../../shared/common/ui-routes';
import { HomeComponent } from './components/pages/home/home.component';
import { PasswordResetComponent } from './components/pages/password-reset/password-reset.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';

/**
 * Public routes
 *  ***NOTE*** - In order for routes to be available without logging in,
 * special provisions need to be made on public.component.html and the corresponding .ts file.
 * Without making these changes the route would not show.
 */
const routes: Routes = [
  {
    path: uiroutes.PRIVACY_ROUTE.route,
    component: PrivacyComponent,
    pathMatch: 'full',
  },
  {
    path: `${uiroutes.ACTIVATE_ACCOUNT_ROUTE.route}/:token`,
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: `${uiroutes.PASSWORD_RESET_ROUTE.route}/:token`,
    component: PasswordResetComponent,
    pathMatch: 'full',
  },
  {
    path: `${uiroutes.REGISTER_ROUTE.route}`,
    component: HomeComponent,
    pathMatch: 'full',
  },
  { path: '', component: HomeComponent },
  // End of public routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
