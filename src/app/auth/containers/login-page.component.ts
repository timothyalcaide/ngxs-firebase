import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { LoginWithGoogle, Logout } from '../store';
import { AuthStatusState } from './../store/states/auth-status.state';
import { LoginPageState } from './../store/states/login-page.state';

@Component({
  selector: 'app-login-page',
  template: `
    <div *ngIf="!(user$ | async)">
      <h1>Login</h1>
      <button
        mat-raised-button
        (click)="onLoginWithGoogle()"
        *ngIf="!(pending$ | async); else spinner"
      >
        <img src="/assets/google-logo.svg" /> Login with Google
      </button>
      <ng-template #spinner>
        <mat-spinner class="center"></mat-spinner>
      </ng-template>
    </div>
    <p *ngIf="error$ | async as error">{{ error }}</p>
  `,
  styles: [
    `
      button {
        cursor: pointer;
        padding: 5px 10px 5px 10px;
        vertical-align: baseline;
      }

      img {
        width: 1.25em;
      }

      :host {
        text-align: center;
      }

      .center {
        margin: 0 auto;
        margin-top: 20px;
      }
    `,
  ],
})
export class LoginPageComponent {
  @Select(LoginPageState.getPending) pending$: Observable<boolean>;
  @Select(LoginPageState.getError) error$: Observable<string>;
  @Select(AuthStatusState.getLoggedIn) IsLoggedIn$: Observable<boolean>;
  @Select(AuthStatusState.getUser) user$: Observable<User>;

  constructor(private store: Store) {}

  onLoginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }

  onSignOut() {
    this.store.dispatch(new Logout());
  }
}
