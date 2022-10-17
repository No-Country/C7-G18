import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BrandPageComponent } from './brand-page.component';
import { CardDashboardModule } from '../../../commons/components/card-dashboard/card-dashboard.module';

export const routes: Routes = [{ path: '', component: BrandPageComponent }];

@NgModule({
    declarations: [BrandPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule, CardDashboardModule]
})
export class BrandModule { }