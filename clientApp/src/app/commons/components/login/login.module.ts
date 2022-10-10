import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormSharedModule } from '../../shared/form-shared.module';



@NgModule({
  declarations: [ LoginComponent],
  imports: [
    FormSharedModule
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
