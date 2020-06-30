import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { LoadProductList } from '../store';

@Component({
  selector: 'app-product-list',
  template: `
    <div *ngFor="let product of products$ | async">
      {{ product.id }}
      {{ product.name }}
      {{ product.price }}
    </div>
  `,
  styles: [],
})
export class ProductListComponent implements OnInit {
  constructor(private service: ProductService, private store: Store) {}

  @Select((state) => state.products.entities['products']) products$: Observable<
    Product[]
  >;

  ngOnInit(): void {
    this.store.dispatch(new LoadProductList());
    this.service.deleteAll();
  }
}
