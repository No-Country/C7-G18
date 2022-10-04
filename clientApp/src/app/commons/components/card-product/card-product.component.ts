import { Component, OnInit, Input  } from '@angular/core';
import { CardProduct } from '../card-product';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {

  constructor() {  }

  ngOnInit(): void {
  }

  @Input() card!:CardProduct

  like(){
    this.card.meGusta=!this.card.meGusta
  }

}
