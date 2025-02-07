import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
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
  showHeader:boolean = true;

  constructor(public shared:SharedService, private router: Router){
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        const excludesRoutes = [/^\/login/, /^\/register/];
        this.showHeader = !excludesRoutes.some((route) => route.test(event.url));
      }
    })
  }

  ngOnInit() { 
    this.shared.cartOpen$.subscribe((value) => {
      this.cartOpen = value;
    })
    this.shared.showHeader$.subscribe((value) => {
      this.showHeader = value;
    })
  } 
  

}
