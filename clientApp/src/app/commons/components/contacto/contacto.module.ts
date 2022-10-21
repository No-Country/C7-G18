import { NgModule } from '@angular/core';
import { ContactoComponent } from './contacto.component';
import { FormSharedModule } from '../../shared/form-shared.module';



@NgModule({
  declarations: [ContactoComponent],
  imports: [
    FormSharedModule
  ],
  exports:[ContactoComponent]

})
export class ContactoModule { }
