import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IProductClass } from '../../interfaces/front.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: IProductClass
  ) { }


  ngOnInit(): void {
  }

  cartNumber=0

  like(){
    this.product.like=!this.product.like
  }

}
