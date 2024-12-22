import { Component, ElementRef, HostListener } from '@angular/core';
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

  headerMenu: ElementRef;

  constructor(private el: ElementRef, public sharedService: SharedService) {
    this.headerMenu = el
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
    if (scrollPosition > 50) {
      this.headerMenu.nativeElement.classList.add('header-fixed');
    } else {
      this.headerMenu.nativeElement.classList.remove('header-fixed');
    }
  }

}
