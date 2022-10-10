import { NgModule } from '@angular/core';
import { SingUpComponent } from './sing-up.component';
import { FormSharedModule } from '../../shared/form-shared.module';



@NgModule({
  declarations: [SingUpComponent],
  imports: [
    FormSharedModule,
  ],
  exports:[SingUpComponent]
})
export class SingUpModule { }
