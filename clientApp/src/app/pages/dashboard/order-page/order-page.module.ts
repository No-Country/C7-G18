import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { OrderPageComponent } from './order-page.component';

export const routes: Routes = [{ path: '', component: OrderPageComponent }];

@NgModule({
    declarations: [OrderPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class OrderModule { }