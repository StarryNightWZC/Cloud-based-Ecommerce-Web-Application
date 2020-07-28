import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from "rxjs";
import { FUser } from './../models/f-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  user: FUser;
  cart$: Observable<ShoppingCart> = Observable.of(new ShoppingCart([]));;
  userIsAuthenticated = false;
  isAdmin = this.auth.getIsAdmin();
  private authListenerSubs: Subscription;
  private _cartSub: Subscription;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth();
    this.authListenerSubs = this.auth
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.cart$ = await this.shoppingCartService.getCart();
    this._cartSub = this.shoppingCartService.messages.subscribe(cartItem => {
      this.cart$ = Observable.of(new ShoppingCart(cartItem));
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this._cartSub.unsubscribe();
  }

}
