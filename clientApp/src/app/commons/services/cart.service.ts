import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataProductsSelectedService {

  constructor() { }
  private arraySeletectProducts: any = [];

  total: number = 0;
  
  getIdSelectProducts(){
    return this.arraySeletectProducts.map((elm: { _id: any; })=>elm._id);
  }
  getDataSelectProducts() {
    console.log(this.arraySeletectProducts, 'aqui servis');
    return this.arraySeletectProducts;
  }

  getTotal() {
    return this.total.toFixed(2);
  }

  cleanOrder() {
    this.arraySeletectProducts = [];
    this.total = 0;
  }
  
   //se encarga de eleminar o agregar productos en el sumary
  updateDataSelectProducts(data: any, action: string) {
    if (action == 'add') {
      this.arraySeletectProducts = [...this.arraySeletectProducts, data];
    } else { //entonces eliminamos el producto de la Tabla
      this.arraySeletectProducts = this.arraySeletectProducts.filter((product: { _id: any; }) => product._id !== data);
    }
  }

  updateTotal() {
    if (this.arraySeletectProducts.length == 0) {
      this.total = 0;
    }else {
      this.total = 0;
      this.arraySeletectProducts.forEach((product: { price: any; quantity: any }) => {
        this.total = this.total + Number(product.price) * Number(product.quantity);
      })
    }
  }

  //donde action puede aumentar la cantidad o disminuir
  updateQuantity(id: string, action: string) {

    const objIndex = this.arraySeletectProducts.findIndex(((obj: { _id: string; }) => obj._id == id));
    const quantityBefore = this.arraySeletectProducts[objIndex].quantity;
    const price = this.arraySeletectProducts[objIndex].price;

    let newQuantity = Number(quantityBefore);
    
    if (action == 'add') {
      newQuantity = newQuantity + 1;
    } else {
      if (quantityBefore > 1) {
        newQuantity = newQuantity - 1;
      }
    }
    const newSubTotal=newQuantity*Number(price)
    this.arraySeletectProducts[objIndex].quantity = newQuantity;
    this.arraySeletectProducts[objIndex].subTotal =  newSubTotal.toFixed(2);
  }

}