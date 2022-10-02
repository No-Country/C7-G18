import { Component, OnInit } from '@angular/core';
import { CardProduct } from '../card-product';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
  }

  

  like(i:number){
    this.cards[i].meGusta=!this.cards[i].meGusta
  }

  cards:CardProduct[]=[
    {
      img:'assets/images/image 17.svg',
      nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      precio:19.99,
      meGusta:false
    },
    {
      img:'assets/images/image 65.svg',
      nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      precio:15.99,
      meGusta:false
    },
    {
      img:'assets/images/image 17.svg',
      nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
      precio:9.99,
      meGusta:false
    }
  ]
}
