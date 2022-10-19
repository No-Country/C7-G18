import { NgModule } from '@angular/core';
import { DialogBrandComponent } from './dialog-brand.component';
import { FormSharedModule } from 'src/app/commons/shared/form-shared.module';



@NgModule({
  declarations: [
    DialogBrandComponent
  ],
  imports: [
    FormSharedModule
  ],
  exports:[DialogBrandComponent]
})
export class DialogBrandModule { }
