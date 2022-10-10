import { NgModule } from '@angular/core';
import { ResetPassComponent } from './reset-pass.component';
import { FormSharedModule } from '../../shared/form-shared.module';



@NgModule({
  declarations: [ResetPassComponent],
  imports: [
    FormSharedModule
  ],
  exports:[ResetPassComponent]
})
export class ResetPassModule { }
