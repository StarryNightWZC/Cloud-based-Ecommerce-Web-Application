import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart> = Observable.of(new ShoppingCart([]));;
  private _cartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this._cartSub = this.shoppingCartService.messages.subscribe(cartItem => {
      this.cart$ = Observable.of(new ShoppingCart(cartItem));
    });
  }

  ngOnDestroy() {
    this._cartSub.unsubscribe();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
