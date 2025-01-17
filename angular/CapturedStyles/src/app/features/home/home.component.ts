import { Component } from '@angular/core';
import { WeComponent } from "./we/we.component";
import { CategoriesComponent } from "./categories/categories.component";
import { ProductsComponent } from "./products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeComponent, CategoriesComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
