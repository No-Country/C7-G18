import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/commons/services/cart.service';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent implements OnInit {

  constructor(	public _cartService:CartService,) { }
  itemsCart = this._cartService.getItems();
  ngOnInit(): void {

  }

}
