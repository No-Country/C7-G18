import { NgModule } from '@angular/core';
import { DialogProductComponent } from './dialog-product.component';
import { FormSharedModule } from '../../../../commons/shared/form-shared.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    DialogProductComponent
  ],
  imports: [
    FormSharedModule,
    MatSelectModule
  ],
  exports:[DialogProductComponent]
})
export class DialogProductModule { }
