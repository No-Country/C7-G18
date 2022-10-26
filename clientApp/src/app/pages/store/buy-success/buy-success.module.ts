import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BuySuccessComponent } from './buy-success.component';
export const routes: Routes = [{ path: '', component:  BuySuccessComponent }];

@NgModule({
    declarations: [
    BuySuccessComponent
    ],
    imports: [RouterModule.forChild(routes),FormSharedModule]
})

export class BuySuccessModule { }
