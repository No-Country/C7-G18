import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/commons/components/login/login.component';
import { ContactoComponent } from 'src/app/commons/components/contacto/contacto.component';
import { ShoppingCartComponent } from '../../../../components/shopping-cart/shopping-cart.component';
import { AuthService } from 'src/app/commons/services/auth.service';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { CartService } from 'src/app/commons/services/cart.service';
import { AccountComponent } from 'src/app/commons/components/account/account.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	constructor(
		private _matDialog: MatDialog,  
		public _authService: AuthService,
		private _alertify: AlertifyService,
		public _cartService:CartService
		) {}

	panelOpenState: boolean = false;
	
	ngOnInit() {
	}

	togglePanel() {
		this.panelOpenState = !this.panelOpenState;
	}

	openModalLogin() {
		if (screen.width < 500) {
			this._matDialog.open(LoginComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		} else {
			this._matDialog.open(LoginComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}

	escribenos() {
		if (screen.width < 500) {
			this._matDialog.open(ContactoComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		} else {
			this._matDialog.open(ContactoComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}

	openModalShoppingCart() {
		if (screen.width < 500) {
			this._matDialog.open(ShoppingCartComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		} else {
			this._matDialog.open(ShoppingCartComponent, {
				width: '400px',
				height: '100vh',
				position: {
					top: '0px',
					right: '0px'
				}
			});
		}
	}

	logout(): void {
		this._authService
			.signOut()
			.then(() => {
				localStorage.removeItem('userLogin');
			})
			.catch(() =>
				this._alertify.error('Error al Salir')
			);
	}

	esMas850: boolean = false;

	openModalAc(){
		if (screen.width < 500) {
			this._matDialog.open(AccountComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		} else {
			this._matDialog.open(AccountComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}
}
