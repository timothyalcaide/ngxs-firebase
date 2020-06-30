import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { AuthStatusState } from './auth-status.state';
import { LoginPageState } from './login-page.state';

@State({
  name: 'auth',
  children: [AuthStatusState, LoginPageState],
})
@Injectable({
  providedIn: 'root',
})
export class AuthState {}
