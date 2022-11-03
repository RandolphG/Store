/* STATE TYPES */
import { Product } from "./productTypes";

export interface ProductsDetailsState {
  detail: Product;
}

export interface ProductsState {
  products: Product[];
}
