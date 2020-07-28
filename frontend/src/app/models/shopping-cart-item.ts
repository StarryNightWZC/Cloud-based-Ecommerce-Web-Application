import { Product } from './product';

export class ShoppingCartItem {
  key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() { return this.price * this.quantity; }

  toProduct() {
    return {
      $key: this.key,
      title: this.title,
      price: this.price,
      category: this.category,
      imageUrl: this.imageUrl
    };
  }
}
