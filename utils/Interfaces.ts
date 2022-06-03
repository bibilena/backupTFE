export interface Product {
  name: String;
  price: string;
}

export interface Cart extends Product {
  count: number;
}
