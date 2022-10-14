import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { LoginPageComponent } from './login-page.component';

export const routes: Routes = [{ path: '', component: LoginPageComponent }];

@NgModule({
    declarations: [
    LoginPageComponent
  ],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class LoginPageModule { }