import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IProductClass } from '../../interfaces/front.interface';
import { AlertifyService } from '../../services/alertify.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: IProductClass,
    private _cartService:CartService,
    private _alertify: AlertifyService,
  ) { }

  itemsCart = this._cartService.getItems();
  ngOnInit(): void {
  }

  cartNumber=0

  like(){
    this.product.like=!this.product.like
  }

  
  modifyProducts(dataProduct:IProductClass){
    if(this.itemsCart.length === 0) {
      this._cartService.addToCart(dataProduct);
      } else {
        // agrega el producto si el id es diferente a los agregados
      if(!this.itemsCart.find( (item: any) => item.id === dataProduct.id)) {
        this._cartService.addToCart(dataProduct);
        // si encuentra al id actualiza su cantidad
      } else {
        this._cartService.updateCart(dataProduct,'+');
      }
    }
    this._alertify.success('Se agrego con exito')
    }

}
