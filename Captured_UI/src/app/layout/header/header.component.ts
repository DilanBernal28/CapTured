import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { share } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  productsInCart: number = 0;
  animationApplied: boolean = false;
  breakpointScroll: number = 65;
  buttonTopValue: string = '24px';
  animationTime: number = 600;

  @ViewChild('headerMenu', { static: true }) headerMenu?: ElementRef;
  @ViewChild('userButton', { static: true }) userButton?: ElementRef;
  @ViewChild('logo', { static: true }) logo?: ElementRef;

  constructor(private sharedService: SharedService, private cartServ:CartService) {
  }

  ngOnInit() {
    this.cartServ.totalInCart$.subscribe((value) => {
      this.productsInCart = value
    })
    if(typeof window !== 'undefined' && this.headerMenu && this.userButton) {
        this.applyAnimatiion(window.pageYOffset, this.headerMenu?.nativeElement, this.userButton?.nativeElement);
    }
  }
  addToCart() {

  }

  interactWithCart(){
    var cartOpen:boolean = !this.sharedService.getCartOpen();
    this.sharedService.setCartOpen(cartOpen);
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.pageYOffset;

    if (this.headerMenu && this.userButton && this.logo) {
      const headerElement = this.headerMenu.nativeElement;
      const userButton = this.userButton.nativeElement;
      this.applyAnimatiion(scrollPosition, headerElement, userButton);
    }
  }

  applyAnimatiion(scrollPosition: number, headerElement: any, userButton: any) {
    if (scrollPosition > this.breakpointScroll && !this.animationApplied) {
      userButton.classList.remove('animation-down');

      headerElement.classList.remove('animation-down');
      headerElement.classList.add('header-fixed', 'animation-top');

      this.animationApplied = true;

      userButton.classList.add('animation-top');
      this.buttonTopValue = '39px';

      setTimeout(() => {
        headerElement.classList.remove('animation-top');
      }, this.animationTime);
    }
    else if (scrollPosition <= this.breakpointScroll && this.animationApplied) {
      headerElement.classList.remove('animation-top', 'header-fixed');
      headerElement.classList.add('animation-down');
      userButton.classList.remove('animation-top');

      userButton.classList.add('animation-down');
      this.buttonTopValue = '24px';
      this.animationApplied = false;
      setTimeout(() => {
        headerElement.classList.remove('animation-down');
      }, this.animationTime);
    }
  }
}
