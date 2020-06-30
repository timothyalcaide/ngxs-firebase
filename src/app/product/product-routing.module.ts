import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './containers/product-details.component';
import { ProductListComponent } from './containers/product-list.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: ':id',
    component: ProductDetailsComponent,
    // canActivate: [BookExistsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
