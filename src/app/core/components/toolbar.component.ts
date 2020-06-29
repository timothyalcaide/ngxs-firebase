import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '../nav-items';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="openMenu.emit()"
        *ngIf="show"
      >
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
      <span class="logo" routerLink="/">🔥 Ngxs</span>

      <span class="fill-space"></span>
      <div *ngIf="!show">
        <a *ngFor="let item of items" mat-button [routerLink]="item.link"
          ><span *ngIf="item.icon">{{ item.icon }}</span
          >{{ item.title }}</a
        >
      </div>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  @Input() show: boolean;
  @Output() openMenu = new EventEmitter();
  @Input() items: NavItem[];
}
