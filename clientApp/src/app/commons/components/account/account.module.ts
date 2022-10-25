import { NgModule } from '@angular/core';
import { AccountComponent } from './account.component';
import { FormSharedModule } from '../../shared/form-shared.module';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    FormSharedModule,
    MatTabsModule
  ],
  exports:[
    AccountComponent
  ]
})
export class AccountModule { }
