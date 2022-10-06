import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { ContactoComponent } from './contacto/contacto.component';


// componentes materia
import { FormSharedModule } from '../shared/form-shared.module';


@NgModule({
  declarations: [
    LoginComponent, SingUpComponent, ResetPassComponent, ContactoComponent
  ],
  imports: [
    CommonModule,FormSharedModule,
  ],
  exports:[
    
    LoginComponent, SingUpComponent, ResetPassComponent, ContactoComponent,

  ]

})
export class AccessUserMaterialModule { }
