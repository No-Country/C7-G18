import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IProductClass } from '../../interfaces/front.interface';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
	contador: number = 0;

	constructor(
		public _cartService:CartService,
		private router: Router,
		public authService: AuthService,
		private _alertify: AlertifyService,
	) {}
	
	ngOnInit(): void {}

	modifyProducts(dataProduct:IProductClass){
		const itemsCart = this._cartService.getItems();
		if(itemsCart.length === 0) {
			this._cartService.addToCart(dataProduct);
		  } else {
			  // agrega el producto si el id es diferente a los agregados
			if(!itemsCart.find( (item: any) => item.id === dataProduct.id)) {
			  this._cartService.addToCart(dataProduct);
			  // si encuentra al id actualiza su cantidad
			} else {
			  this._cartService.updateCart(dataProduct,'+');
			}
		}
	}
	 

	add(product:IProductClass){
		this._cartService.updateCart(product,'+')
	}

	minus(product:IProductClass){
		this._cartService.updateCart(product,'-')
	}

	delete(product:IProductClass){
		this._cartService.deleteItem(product)
	}

	goBuy(){
		if (this.authService.isLoggedIn !== true) {
			this._alertify.error('Para pagar es necesario, iniciar sesion');
		}else{
			this.router.navigate(['/buy']);
		}
	}
}
