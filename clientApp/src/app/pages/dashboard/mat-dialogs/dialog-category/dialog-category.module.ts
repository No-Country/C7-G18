import { NgModule } from '@angular/core';
import { DialogCategoryComponent } from './dialog-category.component';
import { FormSharedModule } from '../../../../commons/shared/form-shared.module';



@NgModule({
  declarations: [
    DialogCategoryComponent
  ],
  imports: [
    FormSharedModule
  ],
  exports:[DialogCategoryComponent]
})
export class DialogCategoryModule { }
