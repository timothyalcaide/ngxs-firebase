import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  LoginWithGoogle,
  LoginWithGoogleFailure,
  LoginWithGoogleSuccess,
} from './../actions/auth.action';
import { Injectable } from '@angular/core';

export interface LoginPageStateModel {
  error: string | null;
  pending: boolean;
}

@State<LoginPageStateModel>({
  name: 'loginPage',
  defaults: {
    error: null,
    pending: false,
  },
})
@Injectable()
export class LoginPageState {
  constructor(private authService: AuthService) {}

  @Selector()
  static getError(state: LoginPageStateModel) {
    return state.error;
  }

  @Selector()
  static getPending(state: LoginPageStateModel) {
    return state.pending;
  }

  @Action(LoginWithGoogle)
  loginWithGoogle({ dispatch, patchState }: StateContext<LoginPageStateModel>) {
    patchState({
      error: null,
      pending: true,
    });
    return this.authService.googleSignin().then(
      (user) => dispatch(new LoginWithGoogleSuccess({ user })),
      catchError((error) => {
        return dispatch(new LoginWithGoogleFailure(error));
      })
    );
  }

  @Action(LoginWithGoogleSuccess)
  loginWithGoogleSuccess({
    dispatch,
    patchState,
  }: StateContext<LoginPageStateModel>) {
    patchState({
      error: null,
      pending: false,
    });

    dispatch(new Navigate(['/']));
  }

  @Action(LoginWithGoogleFailure)
  loginWithGoogleFailure(
    { patchState }: StateContext<LoginPageStateModel>,
    action: LoginWithGoogleFailure
  ) {
    patchState({
      error: action.payload,
      pending: false,
    });
  }
}
