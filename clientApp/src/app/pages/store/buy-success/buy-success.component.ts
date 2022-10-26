import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/commons/services/cart.service';

@Component({
  selector: 'app-buy-success',
  templateUrl: './buy-success.component.html',
  styleUrls: ['./buy-success.component.scss']
})
export class BuySuccessComponent implements OnInit {

  constructor( public _cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this._cartService.clearCart()
  }

  goTienda(){
    this.router.navigateByUrl('/')
  }

}
