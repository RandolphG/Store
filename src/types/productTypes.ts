/* PRODUCT DETAILS TYPES */
export type Products = Product[];

export interface Product {
  productId: string;
  title: string;
  images: Image[];
  about: string;
  details: string[];
  options: Option[];
}

export interface Image {
  url: string;
  alt: string;
}

export interface Option {
  name: string;
  style: string;
  values: Value[];
}

export interface Value {
  value: string;
}
