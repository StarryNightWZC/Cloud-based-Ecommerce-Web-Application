import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from "../environments/environment";

const BACKEND_URL = environment.apiUrl + "/categories";

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(BACKEND_URL)
    .map(response => {
      const categoryData = response.json();
      return categoryData.categories.map(category => {
        return {
          $key: category.category,
          name: category.name
        };
      });
    });
  }
}
