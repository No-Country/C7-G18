import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { FormSharedModule } from 'src/app/commons/shared/form-shared.module';



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    FormSharedModule
  ],
  exports:[DialogComponent]
})
export class DialogModule { }
