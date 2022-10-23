import { Component, OnInit, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../card-product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { IProductClass } from '../../interfaces/front.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  
  @Input() card!:IProductClass
  constructor(private _matDialog: MatDialog, private _cartService:CartService) {  }
  itemsCart = this._cartService.getItems();

  ngOnInit(): void {
  }


  like(){
    this.card.like=!this.card.like
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
	console.log('veamos todos', this._cartService.getItems())
  }
 

  openModalDetail() {
		if (screen.width < 500) {
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '750px',
				data: this.card
			});
		}else{			
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '95%',
				maxHeight: '600px',
				data: this.card
			});
		}
		}

}
