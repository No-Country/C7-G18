import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BuyPageComponent } from './buy-page.component';

export const routes: Routes = [{ path: '', component: BuyPageComponent }];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class BuyModule { }
