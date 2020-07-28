import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  cart$: Observable<ShoppingCart> = Observable.of(new ShoppingCart([]));;
  private _cartSub: Subscription;
  private loadCartFlag = false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this._cartSub = this.shoppingCartService.messages.subscribe(cartItem => {
      this.cart$ = Observable.of(new ShoppingCart(cartItem));
    });
  }

  ngOnDestroy() {
    this._cartSub.unsubscribe();
  }
}
