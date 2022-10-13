import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { FormSharedModule } from '../../shared/form-shared.module';



@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    FormSharedModule
  ], 
  exports:[ProductDetailComponent]
})
export class ProductDetailModule { }
