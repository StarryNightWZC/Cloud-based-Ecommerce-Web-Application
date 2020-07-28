import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product= {
    title: "",
    price: "",
    category: "",
    imageUrl: ""
  };
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1)
    .subscribe(p => {
      let product = p.json();
      // this.product = {
      //   id: this.id,
      //   ...product
      // };
      this.product = product;
    });
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product).subscribe();
    else this.productService.create(product).subscribe();

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id).subscribe();
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
