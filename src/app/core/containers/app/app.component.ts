import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { Logout } from 'src/app/auth/store';
import { NavItem, USER_NAV } from '../../nav-items';
import { CloseSidenav, LayoutState, OpenSidenav } from '../../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Select(LayoutState.getShowSidenav) showSidenav$: Observable<boolean>;
  @Select((state) => state.auth.status.loggedIn) loggedIn$: Observable<boolean>;
  @Select((state) => state.auth.status.user) user$: Observable<User>;

  USER_NAV: NavItem[];
  isHandset$: Observable<boolean>;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.USER_NAV = USER_NAV;
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }

  closeSidenav() {
    this.store.dispatch(new CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new Logout());
  }

  settings() {
    this.store.dispatch(new Navigate(['/settings']));
  }
}
