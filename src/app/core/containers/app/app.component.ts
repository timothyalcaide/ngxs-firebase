import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CloseSidenav, LayoutState, OpenSidenav } from '../../store';
import { FIRST, NavItem, SECOND } from '../../nav-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Select(LayoutState.getShowSidenav) showSidenav$: Observable<boolean>;
  // TODO
  loggedIn$: Observable<boolean> = of(false);
  firstNavList: NavItem[];
  secondNavList: NavItem[];
  isHandset$: Observable<boolean>;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.firstNavList = FIRST;
    this.secondNavList = SECOND;
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
    // TODO
  }
}
