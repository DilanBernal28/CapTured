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

      // Si el scroll es mayor a 100 y no se ha aplicado la animación de fijado
      if (scrollPosition > 100 && !this.animationApplied) {
        // Limpia cualquier clase previa
        headerElement.classList.remove('animation-down');

        // Agregar clase para deslizar de abajo hacia arriba
        headerElement.classList.add('header-fixed', 'animation-top');
        this.animationApplied = true;

        // Eliminar la clase de animación después de completarse
        setTimeout(() => {
          headerElement.classList.remove('animation-top');
        }, 600);
      }

      // Si el scroll es menor a 100 y está aplicada la animación de fijado
      else if (scrollPosition <= 100 && this.animationApplied) {
        // Limpia cualquier clase previa
        headerElement.classList.remove('animation-top', 'header-fixed');

        // Agregar clase para deslizar de arriba hacia abajo
        headerElement.classList.add('animation-down');
        this.animationApplied = false;

        // Eliminar la clase de animación después de completarse
        setTimeout(() => {
          headerElement.classList.remove('animation-down');
        }, 600);
      }
    }
  }
}
