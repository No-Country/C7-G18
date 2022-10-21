import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailModule } from '../product-detail/product-detail.module';




@NgModule({
  declarations: [CardProductComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ProductDetailModule
  ],
  exports:[CardProductComponent]
})
export class CardProductModule { }
