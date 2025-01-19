import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface cartProduct extends IProduct {
  cantity: number
}

@Injectable({
  providedIn: 'root'
})


export class CartService {
  private cartItemsSubject = new BehaviorSubject<cartProduct[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  private totalInCartSubject = new BehaviorSubject<number>(0);
  public totalInCart$ = this.totalInCartSubject.asObservable();
  private totalPriceSubject = new BehaviorSubject<number>(0.00);
  public totalPrice$ = this.totalPriceSubject.asObservable();

  public addCartItem(product: IProduct): void {
    const currentItems = this.cartItemsSubject.value;
    const productExists = currentItems.some(item => item.idProducto == product.idProducto)
    const updatedItems = productExists
      ? currentItems.map((item) =>
        item.idProducto == product.idProducto
          ? { ...product, cantity: item.cantity + 1 }
          : item
      )
      : [...currentItems, { ...product, cantity: 1 }];
    this.updateVariables(updatedItems)
  }

  public decreaseCartItem(product: IProduct):void {
    const currentItems = this.cartItemsSubject.value;
    const productExists = currentItems.some(item => item.idProducto == product.idProducto && item.cantity > 0)
    const updatedItems = productExists
      ? currentItems.map((item) =>
        item.idProducto == product.idProducto
          ? { ...product, cantity: item.cantity - 1 }
          : item
      )
      : [...currentItems];
    this.updateVariables(updatedItems);
  }

  public deleteCartItem(product: IProduct):void {
    const currentItems = this.cartItemsSubject.value;
    const productExists = currentItems.some(item => item.idProducto == product.idProducto && item.cantity >= 0);
    if (!productExists) return;
    const updatedItems = currentItems.filter(item => item.idProducto !== product.idProducto);
    this.updateVariables(updatedItems);
  }

  public clearCart():void{
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.prodCategory == "xd");
    this.updateVariables(updatedItems);
  }

  private getTotalItems(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.cantity, 0)
  }

  private getTotalPrice(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => (total + item.prodPrecio) * item.cantity, 0)
  }

  private updateVariables(items: any) {
    this.cartItemsSubject.next(items);
    this.totalInCartSubject.next(this.getTotalItems());
    this.totalPriceSubject.next(this.getTotalPrice());
  }
}
