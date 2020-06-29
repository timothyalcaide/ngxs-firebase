import { Component, Input } from '@angular/core';
import { NavItem } from '../nav-items';

@Component({
  selector: 'app-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>more_vert</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <a *ngFor="let item of items" mat-menu-item [href]="item.link">
        <i>{{ item.icon }}</i>
        <span>{{ item.title }}</span>
      </a>
    </mat-menu>
  `,
  styles: [],
})
export class MenuComponent {
  @Input() items: NavItem[];
}
