import { Product } from '../../models/product.model';

export class LoadProductList {
  static readonly type = '[Product List] Load';
}

export class LoadProductListSuccess {
  static readonly type = '[Product List] Load Success';
  constructor(public payload: { products: Product[] }) {}
}

export class LoadProductListFailure {
  static readonly type = '[Product List] Load Failure';
  constructor(public payload?: any) {}
}
