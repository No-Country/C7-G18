import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
	contador: number = 0;

	constructor() {}

	ngOnInit(): void {}

	anadir() {
		this.contador += 1;
	}

	quitar() {
		this.contador -= 1;
	}
}
