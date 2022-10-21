import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartComponent } from './shopping-cart.component';
import { FormSharedModule } from '../../shared/form-shared.module';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    FormSharedModule
  ],
  exports:[ ShoppingCartComponent]
})
export class ShoppingCartModule { }
