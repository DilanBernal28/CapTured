import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';

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
  animationApplied: boolean = false;
  breakpointScroll: number = 65;

  @ViewChild('headerMenu', { static: true }) headerMenu?: ElementRef;

  constructor(public sharedService: SharedService) {
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

    if (this.headerMenu) {
      const headerElement = this.headerMenu.nativeElement;
      if (scrollPosition > this.breakpointScroll && !this.animationApplied) {
        headerElement.classList.remove('animation-down');
        headerElement.classList.add('header-fixed', 'animation-top');
        this.animationApplied = true;
        setTimeout(() => {
          headerElement.classList.remove('animation-top');
        }, 600);
      }
      else if (scrollPosition <= this.breakpointScroll && this.animationApplied) {
        headerElement.classList.remove('animation-top', 'header-fixed');
        headerElement.classList.add('animation-down');
        this.animationApplied = false;
        setTimeout(() => {
          headerElement.classList.remove('animation-down');
        }, 600);
      }
    }
  }
}
