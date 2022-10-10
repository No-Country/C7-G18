import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './card-product.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CardProductComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports:[CardProductComponent]
})
export class CardProductModule { }
