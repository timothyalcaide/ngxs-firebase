import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { AuthRoutingModule } from './auth-routing.module';
import { EmailLoginComponent } from './containers/email-login.component';
import { LoginPageComponent } from './containers/login-page.component';

export const COMPONENTS = [LoginPageComponent, EmailLoginComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule {}