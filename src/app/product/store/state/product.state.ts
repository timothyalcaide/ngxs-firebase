import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { Product } from './../../models/product.model';
import {
  LoadProductList,
  LoadProductListFailure,
  LoadProductListSuccess,
} from './../actions/product.action';

export const arrayToObject = (entries) => {
  return Object.assign({}, entries);
};

export interface ProductsStateModel {
  ids: number[];
  entities: {
    [id: string]: Product;
  };
  selectedProductId: string | null;
  loading: boolean;
  error: string | null;
}

export const productsStateDefaults: ProductsStateModel = {
  ids: [],
  entities: {},
  selectedProductId: null,
  loading: false,
  error: null,
};

@State<ProductsStateModel>({
  name: 'products',
  defaults: productsStateDefaults,
})
@Injectable({
  providedIn: 'root',
})
export class ProductsState {
  constructor(private service: ProductService) {}

  @Selector()
  static getProducts(state: ProductsStateModel) {
    return state.entities['products'];
  }

  @Selector()
  static getEntities(state: ProductsStateModel) {
    return state.entities;
  }

  @Selector()
  static getSelectedId(state: ProductsStateModel) {
    return state.selectedProductId;
  }

  @Selector()
  static getSelectedBook(state: ProductsStateModel) {
    return state.selectedProductId && state.entities[state.selectedProductId];
  }

  @Action(LoadProductList)
  getProductList$(ctx: StateContext<ProductsStateModel>) {
    return this.service.getAll().pipe(
      mergeMap((products) =>
        ctx.dispatch(new LoadProductListSuccess({ products }))
      ),
      catchError(() => ctx.dispatch(new LoadProductListFailure()))
    );
  }

  @Action(LoadProductListSuccess)
  searchComplete(
    { getState, patchState }: StateContext<ProductsStateModel>,
    action: LoadProductListSuccess
  ) {
    const state = getState();
    const ids = action.payload.products.map<number>(
      (product: Product) => +product.id
    );
    const entities = arrayToObject(action.payload);

    patchState({
      ids: [...state.ids, ...ids],
      entities: { ...state.entities, ...entities },
      loading: false,
      error: '',
    });
  }

  @Action(LoadProductListFailure)
  searchError(
    { patchState }: StateContext<ProductsStateModel>,
    action: LoadProductListFailure
  ) {
    patchState({
      loading: false,
      error: action.payload,
    });
  }
}
