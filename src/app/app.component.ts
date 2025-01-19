import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from "./layout/cart/cart.component";
import { SharedService } from './services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, CartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CapturedStyles';
  cartOpen:boolean =  false;

  constructor(public shared:SharedService){ }

  ngOnInit() { 
    this.shared.cartOpen$.subscribe((value) => {
      this.cartOpen = value;
    })
  } 
  

}
