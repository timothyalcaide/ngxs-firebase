import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthStatusState, Logout } from '../../auth/store';

@Component({
  selector: 'app-settings',
  template: `
    <div *ngIf="user$ | async as user" class="logout">
      <h3>Howdy, {{ user.displayName }}</h3>
      <img [src]="user.photoURL" />
      <p>UID: {{ user.uid }}</p>
      <p>Email: {{ user.email }}</p>
      <button (click)="onSignOut()">Logout</button>
    </div>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }

      button {
        cursor: pointer;
        padding: 5px 10px 5px 10px;
        vertical-align: baseline;
      }

      img {
        width: 2em;
      }

      .logout {
        padding-top: 5em;
      }
    `,
  ],
})
export class SettingsComponent {
  @Select(AuthStatusState.getLoggedIn) IsLoggedIn$: Observable<boolean>;
  @Select(AuthStatusState.getUser) user$: Observable<User>;

  constructor(private store: Store) {}

  onSignOut() {
    this.store.dispatch(new Logout());
  }
}
