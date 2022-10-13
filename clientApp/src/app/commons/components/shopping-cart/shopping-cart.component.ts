import { Component, OnInit } from '@angular/core';
import { PagoComponent } from '../pago/pago.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
	contador: number = 0;

	constructor(public dialogRef: MatDialogRef<ShoppingCartComponent>, private _matDialog: MatDialog) {}

	ngOnInit(): void {}

	anadir() {
		this.contador += 1;
	}

	quitar() {
		this.contador -= 1;
	}

	abrirCarrito() {
		this.dialogRef.close();

		this._matDialog.open(PagoComponent, {
			maxWidth: '800px',
			maxHeight: '500px'
		});
	}
}
