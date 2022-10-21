import { Component, OnInit, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../card-product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  
  @Input() card!:Product

  constructor(private _matDialog: MatDialog) {  }

  ngOnInit(): void {
  }


  like(){
    this.card.meGusta=!this.card.meGusta
  }

  openModalDetail() {
		if (screen.width < 500) {
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '100vw',
				width: '95%',
				height: '750px',
				data: this.card
			});
		}else{			
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '95%',
				height: '600px',
				data: this.card
			});
		}
		}

}
