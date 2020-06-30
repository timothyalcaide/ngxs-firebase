export interface Product {
  id: string | number;
  name: string;
  price: number;
}

export function createProduct(params: Partial<Product>) {
  return {
    ...params,
  } as Product;
}
