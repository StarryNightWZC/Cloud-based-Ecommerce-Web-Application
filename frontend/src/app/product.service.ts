import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from "./models/product";
import { Subject } from "rxjs";
import 'rxjs/operator/map';

import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl + "/products";

@Injectable()
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

  constructor(
    private http: Http,
    private router: Router) { }

  getAll() {
    return this.http
      .get(BACKEND_URL)
      .map(response => {
        const productData = response.json();
        return productData.products.map(product => {
          return {
            $key: product._id,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl
          };
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  get(id: string) {
    return this.http.get(BACKEND_URL + "/" + id);
  }

  create(product) {
    return this.http.post(BACKEND_URL, product);
  }

  update(productId, product) {
    return this.http.put(BACKEND_URL + "/" + productId, product);
  }

  delete(productId) {
    return this.http.delete(BACKEND_URL + "/" + productId);
  }
}
