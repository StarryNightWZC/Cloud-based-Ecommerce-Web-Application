import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  private itemsMap = new Map<string, ShoppingCartItem>();

  constructor(products: ShoppingCartItem[]) {
    products.forEach(product => {
      this.items.push(new ShoppingCartItem(product));
      this.itemsMap.set(product.key, product);
    })
    Object.assign(this, products);
  }

  getQuantity(product: Product) {
    let item = this.itemsMap.get(product.$key);
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }
}
