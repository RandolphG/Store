import { Product } from "./productTypes";

export interface CartState {
  cart: Product[];
  totalItems: number;
}
