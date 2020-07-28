import { WebSocketService } from './web-socket.service';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl + "/shopping-carts";

@Injectable()
export class ShoppingCartService {

  messages: Subject<any>;

  constructor(
    private http: Http,
    private wsService: WebSocketService,
    private router: Router)
  {
    if(!localStorage.getItem('cartId')) {
      this.create().subscribe(id => {
        localStorage.setItem('cartId', id);
      });
    }
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  // async getCart(): Promise<Observable<ShoppingCart>> {
    // let cartId = await this.getOrCreateCartId();
    // return this.db.object('/shopping-carts/' + cartId)
    //   .map(x => new ShoppingCart(x.items));
  async getCart(): Promise<Observable<ShoppingCart>> {
    await this.getOrCreateCartId();
    let cartId = localStorage.getItem('cartId');
    return this.http.get(BACKEND_URL + "/" + cartId)
      .map(x => new ShoppingCart(x.json().products));
      // .map(res => {
      //   let products = res.json().products;
      //   return new ShoppingCart(products);
      // });
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    await this.getOrCreateCartId();
    let cartId = localStorage.getItem('cartId');
    // this.db.object('/shopping-carts/' + cartId + '/items').remove();
    this.http.delete(BACKEND_URL + "/" + cartId).subscribe(response => {
    });
  }


  // private create() {
  //   return this.db.list('/shopping-carts').push({
  //     dateCreated: new Date().getTime()
  //   });
  // }
  create() {
    const dateCreated = {dateCreated: new Date()};
    return this.http.post(BACKEND_URL, dateCreated)
    .map(res => {
      const response = res.json();
      return response.shoppingCart.id;
    });
  }

  // private getItem(cartId: string, productId: string) {
  //   return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  // }
  private getItem(cartId: string, productId: string) {
    return this.http.get(BACKEND_URL + "/" + cartId + "/" + productId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return;
    }
    // else {
    //   this.create().subscribe(id => {
    //     localStorage.setItem('cartId', id);
    //   });
    // }
    await this.create().toPromise().then(id => {
      localStorage.setItem('cartId', id);
    });
  }

  // private async updateItem(product: Product, change: number) {
  //   await this.getOrCreateCartId();
  //   let cartId = localStorage.getItem('cartId');
  //   let item$ = this.getItem(cartId, product.$key);
  //   item$.take(1).subscribe(item => {
  //     let quantity = (item.quantity || 0) + change;
  //     if (quantity === 0) item$.remove();
  //     else item$.update({
  //       title: product.title,
  //       imageUrl: product.imageUrl,
  //       price: product.price,
  //       quantity: quantity
  //     });
  //   });
  // }
  private async updateItem(product: Product, change: number) {
    await this.getOrCreateCartId();
    let cartId = localStorage.getItem('cartId');
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      const itemData = item.json();
      let quantity = (itemData.quantity || 0) + change;
      if (quantity === 0) {
        this.http.delete(BACKEND_URL + "/" + cartId + "/" + product.$key)
        .subscribe();
      }
      else {
        // let updatedProduct = {
        //   "product": {
        //     "id": product.$key,
        //     "title": product.title,
        //     "price": product.price,
        //     "category": product.category,
        //     "imageUrl": product.imageUrl,
        //     "quantity": quantity
        //   }
        // }
        let updatedProduct = {
          product: {
            id: product.$key,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            quantity: quantity
          }
        }
        this.http.put(BACKEND_URL + "/" + cartId, updatedProduct)
        .subscribe();
      }
      // item$.update({
      //   title: product.title,
      //   imageUrl: product.imageUrl,
      //   price: product.price,
      //   quantity: quantity
      // });
    });
  }
}
