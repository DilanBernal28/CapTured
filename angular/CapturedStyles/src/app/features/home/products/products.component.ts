import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../interfaces/product.interface';
import { IApiResponse } from '../../../interfaces/apiResponse.interface';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:IProduct[] = []

  constructor(private prodServ:ProductService){}

  ngOnInit(){
    try {
      this.prodServ.getProductos().subscribe(
        (response:IApiResponse<IProduct>) => {
          this.products = response.body
        }
      )
      console.log(this.products)
    } catch (error) {
      
    }
  }
}
