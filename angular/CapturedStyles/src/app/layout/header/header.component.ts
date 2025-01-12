import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { app } from '../../../../server';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cart = [];
  totalAmmount: number = 0;
  productsInCart: number = 0;
  animationApplied: boolean = false;
  breakpointScroll: number = 65;
  buttonTopValue: string = '30px';
  animationTime: number = 300;

  @ViewChild('headerMenu', { static: true }) headerMenu?: ElementRef;
  @ViewChild('userButton', { static: true }) userButton?: ElementRef;
  @ViewChild('logo', { static: true }) logo?: ElementRef;

  constructor(public sharedService: SharedService, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && this.logo && this.userButton && this.headerMenu) {
      const scrollPosition = window.pageYOffset;
      const logoTop = this.logo.nativeElement.getBoundingClientRect().top;
      if (scrollPosition > this.breakpointScroll) {
        this.applyAnimatiion(scrollPosition, this.headerMenu.nativeElement, this.userButton.nativeElement, logoTop);
      }
    }
  }
  addToCart() {

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
      const logoTop = this.logo.nativeElement.getBoundingClientRect().top;
      console.log('Distance from top of viewport to logo:', logoTop);
      const headerElement = this.headerMenu.nativeElement;
      const userButton = this.userButton.nativeElement;
      this.applyAnimatiion(scrollPosition, headerElement, userButton, logoTop);
    }
  }

  applyAnimatiion(scrollPosition: number, headerElement: any, userButton: any, logoTop: number) {
    console.log('Distance:', logoTop);
    if (scrollPosition > this.breakpointScroll && !this.animationApplied) {
      userButton.classList.remove('animation-down');

      headerElement.classList.remove('animation-down');
      headerElement.classList.add('header-fixed', 'animation-top');

      this.animationApplied = true;

      setTimeout(() => {
        userButton.classList.add('animation-top');
        // this.buttonTopValue  = `50px`;
        this.buttonTopValue = `${logoTop+50}px`;
      }, this.animationTime + 100);

      setTimeout(() => {
        headerElement.classList.remove('animation-top');
      }, this.animationTime);
    }
    else if (scrollPosition <= this.breakpointScroll && this.animationApplied) {
      headerElement.classList.remove('animation-top', 'header-fixed');
      headerElement.classList.add('animation-down');
      userButton.classList.remove('animation-top');

      this.animationApplied = false;
      setTimeout(() => {

        userButton.classList.add('animation-down');
        this.buttonTopValue = `${logoTop}`;
      }, this.animationTime);
      setTimeout(() => {
        headerElement.classList.remove('animation-down');
      }, this.animationTime);
    }
  }
}
