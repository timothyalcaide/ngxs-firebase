import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { MenuComponent } from './components/menu.component';
import { NavItemComponent } from './components/nav-item.component';
import { ToolbarComponent } from './components/toolbar.component';
import { AppComponent } from './containers/app/app.component';

export const COMPONENTS = [
  AppComponent,
  MenuComponent,
  ToolbarComponent,
  NavItemComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
