import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import {
  LoginRedirect,
  LoginWithGoogleSuccess,
  Logout,
} from '../actions/auth.action';

export interface AuthStatusStateModel {
  loggedIn: boolean;
  user: User | null;
}

const authStatusStateDefauts: AuthStatusStateModel = {
  loggedIn: false,
  user: null,
};

@State<AuthStatusStateModel>({
  name: 'status',
  defaults: authStatusStateDefauts,
})
@Injectable()
export class AuthStatusState {
  constructor(private authService: AuthService) {}

  @Selector()
  static getLoggedIn(state: AuthStatusStateModel) {
    return state.loggedIn;
  }

  @Selector()
  static getUser(state: AuthStatusStateModel) {
    return state.user;
  }

  @Action(LoginWithGoogleSuccess)
  loginSuccess(
    { patchState }: StateContext<AuthStatusStateModel>,
    action: LoginWithGoogleSuccess
  ) {
    patchState({
      loggedIn: true,
      user: action.payload.user,
    });
  }

  @Action([Logout, LoginRedirect])
  logout({ dispatch, setState }: StateContext<AuthStatusStateModel>) {
    setState(authStatusStateDefauts);
    this.authService.signOut().then(() => dispatch(new Navigate(['/login'])));
  }
}
