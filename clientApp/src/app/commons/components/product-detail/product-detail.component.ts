import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '../card-product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }


  ngOnInit(): void {
  }

  cartNumber=0

  like(){
    this.product.meGusta=!this.product.meGusta
  }

}
