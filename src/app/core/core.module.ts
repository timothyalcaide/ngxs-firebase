import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';

export const COMPONENTS = [
  // TODO
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
