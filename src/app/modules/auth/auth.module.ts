import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AddEditMemberComponent } from './components/add-edit-member/add-edit-member.component';
import { OwnProfileComponent } from './components/own-user-profile/own-profile.component';
import { AuthState } from './state/auth.state';

const declarations = [OwnProfileComponent, AddEditMemberComponent];
const imports = [SharedModule, AuthRoutingModule];

@NgModule({
  declarations,
  imports: [...imports, NgxsModule.forFeature([AuthState])],
  exports: [...declarations, ...imports],
})
export class AuthModule {}
