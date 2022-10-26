import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BuyPageComponent } from './buy-page.component';
import { NgxPayPalModule } from 'ngx-paypal';
export const routes: Routes = [{ path: '', component: BuyPageComponent }];

@NgModule({
    declarations: [BuyPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule,  NgxPayPalModule]
})

export class BuyModule { }
