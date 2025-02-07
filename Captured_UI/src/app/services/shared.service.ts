import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cartOpenSubject = new BehaviorSubject<boolean>(false);
  public cartOpen$ = this.cartOpenSubject.asObservable();
  private showHeaderSubject = new BehaviorSubject<boolean>(true);
  public showHeader$ = this.showHeaderSubject.asObservable();

  constructor() { }

  public getCartOpen():boolean{
    return this.cartOpenSubject.value;
  }
  public setCartOpen(cartOpen:boolean):void{
    this.cartOpenSubject.next(cartOpen);
  }
  public getShowHeader():boolean{
    return this.showHeaderSubject.value;
  }
  public setShowHeader(showHeader:boolean):void{
    this.showHeaderSubject.next(showHeader);
  }
}
