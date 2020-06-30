import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from '../material';
import { ProductDetailsComponent } from './containers/product-details.component';
import { ProductListComponent } from './containers/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsStates } from './store';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    NgxsModule.forFeature(ProductsStates),
  ],
})
export class ProductModule {}
