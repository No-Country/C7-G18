import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ], 
  exports:[ProductDetailComponent]
})
export class ProductDetailModule { }
