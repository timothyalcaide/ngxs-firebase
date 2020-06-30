import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '../material';
import { AuthRoutingModule } from './auth-routing.module';
import { EmailLoginComponent } from './containers/email-login.component';
import { LoginPageComponent } from './containers/login-page.component';
import { AuthService } from './services/auth.service';
import { AuthStates } from './store';

export const COMPONENTS = [LoginPageComponent, EmailLoginComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    NgxsModule.forFeature(AuthStates),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AngularFireAuthGuard],
    };
  }
}
