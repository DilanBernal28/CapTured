import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  public cartOpen$ = this.cartOpenSubject.asObservable();

  constructor() { }

  public getCartOpen():boolean{
    return this.cartOpenSubject.value;
  }
  public setCartOpen(cartOpen:boolean):void{
    this.cartOpenSubject.next(cartOpen);
  }
}
