import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './containers/product-list.component';
import { ProductDetailsComponent } from './containers/product-details.component';

@NgModule({
  declarations: [ProductListComponent, ProductDetailsComponent],
  imports: [CommonModule, ProductRoutingModule, MaterialModule],
})
export class ProductModule {}
