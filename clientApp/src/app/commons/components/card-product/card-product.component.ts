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
				height: '600px',
				data: {
					img: this.card.img,
					description: this.card.description,
					name: this.card.name,
					brand:this.card.brand,
					price:this.card.price,
					category:this.card.category,
					subcategory:this.card.subcategory,
					pet:this.card.pet,
					like:this.card.meGusta,
					discount:this.card.discount
				  }
			});
		}else{			
			this._matDialog.open(ProductDetailComponent, {
				width: '850px',
				height: '600px',
				data: {
					img: this.card.img,
					description: this.card.description,
					name: this.card.name,
					brand:this.card.brand,
					price:this.card.price,
					category:this.card.category,
					subcategory:this.card.subcategory,
					pet:this.card.pet,
					like:this.card.meGusta,
					discount:this.card.discount
				  }
			});
		}
		}

}
