import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { cartProduct, CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  totalPrice: number = 0;
  textButton: string = 'Ir a comprar';
  cartItems: cartProduct[] = [];
  inCart:boolean = this.cartItems.length > 0;

  ngOnInit() {
    this.cartServ.cartItems$.subscribe((value) => {
      this.cartItems = value;
      this.inCart = this.cartItems.length > 0;
      this.updateTextButton();
    })
    this.cartServ.totalPrice$.subscribe((value) => {
      this.totalPrice = value
    })
  }

  constructor(private shared: SharedService, private cartServ: CartService) { }

  closeCart():void {
    this.shared.setCartOpen(false);
  }

  updateTextButton():void {
    if (this.cartItems.length === 0) this.textButton == 'Ir a comprar';
    else if(this.cartItems.length >= 1) this.textButton == 'Comrar'
  }

  decreaseProduct(item:IProduct){
    const currentItems = this.cartItems;
    const filterItems = currentItems.filter(item => item.cantity == 1);
    filterItems.forEach(element => {
      this.deleteProduct(item)
    });
    this.cartServ.decreaseCartItem(item);
  }

  deleteProduct(item:IProduct):void{
    this.cartServ.deleteCartItem(item);
  }

  clearCart():void{
    this.cartServ.clearCart();
  }

  addProduct(item:IProduct):void{
    this.cartServ.addCartItem(item);
  }

}
