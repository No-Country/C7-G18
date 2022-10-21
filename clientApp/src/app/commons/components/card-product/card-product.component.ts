import { Component, OnInit, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../card-product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { IProductClass } from '../../interfaces/front.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {
  
  @Input() card!:IProductClass

  constructor(private _matDialog: MatDialog) {  }

  ngOnInit(): void {
  }


  like(){
    this.card.like=!this.card.like
  }

  openModalDetail() {
		if (screen.width < 500) {
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '750px',
				data: this.card
			});
		}else{			
			this._matDialog.open(ProductDetailComponent, {
				maxWidth: '95%',
				maxHeight: '600px',
				data: this.card
			});
		}
		}

}
