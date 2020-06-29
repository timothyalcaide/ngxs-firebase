import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  template: `
    <div *ngIf="!(auth.user$ | async)">
      <h1>Login</h1>
      <button mat-raised-button (click)="onLoginWithGoogle()">
        <img src="/assets/google-logo.svg" /> Login with Google
      </button>
      <h5>OR</h5>
      <app-email-login></app-email-login>
    </div>

    <div *ngIf="auth.user$ | async as user" class="logout">
      <h3>Howdy, {{ user.displayName }}</h3>
      <img [src]="user.photoURL" />
      <p>UID: {{ user.uid }}</p>
      <p>Email: {{ user.email }}</p>
      <button (click)="onSignOut()">Logout</button>
    </div>
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

      .logout {
        padding-top: 5em;
      }
    `,
  ],
})
export class LoginPageComponent implements OnInit {
  user$: Observable<User>;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
  }

  onLoginWithGoogle() {
    this.auth.googleSignin();
  }

  onSignOut() {
    this.auth.signOut();
  }
}
