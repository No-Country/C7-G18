import { Injectable } from '@angular/core';
import { IProductClass } from '../interfaces/front.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemsCart: any[] = []; //para carrito

  constructor() { 
    this.getItems(); 
  }

  /****************Funciones*************** */

  //agregar a carrito (sale de templates-products)
  addToCart(product: any) {
    product.quantity = 1;
    product.subtotal = product.price;
    this.itemsCart.push(product);
    //this.saveDataLocal();
  }

  // actualiza contenido del carrito
  updateCart(product: any, operator: string) {
    for (let j = 0; j < this.itemsCart.length; j++) {
      if(this.itemsCart[j].id === product.id) {
        switch(operator) {
          case '+':
            this.itemsCart[j].quantity++;
            this.itemsCart[j].subtotal =  Number(this.itemsCart[j].subtotal) + Number(product.price);
          break;
          case '-':
            if(this.itemsCart[j].quantity>1){
              this.itemsCart[j].quantity--;
              this.itemsCart[j].subtotal =  Number(this.itemsCart[j].subtotal) - Number(product.price);
            }
          break;
        }
        break;
      }
    }
    //this.saveDataLocal();
  }

  // elimina contenido del carrito
  deleteItem(product: any) {
    const index = this.itemsCart.findIndex((x: any) => x.id === product.id);
    console.log(index)
    if(index > -1) {
      this.itemsCart.splice(index, 1);
      //this.saveDataLocal()
    }
  }

  //Calcula el total de totales
  getTotal() {
    let total = 0;
    this.itemsCart.forEach( item => {
        total = total + Number(item.subtotal);
    });
    return total;
  }

  //obtener items de carrito
  getItems() {
    //this.itemsCart = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    return this.itemsCart;
  }

  //limpiar el carrito
  clearCart() {
    this.itemsCart = [];
    //this.saveDataLocal();
  }

  saveDataLocal(){
    localStorage.setItem('cart_items', JSON.stringify(this.itemsCart));
  }

}