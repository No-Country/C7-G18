import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BrandPageComponent } from './brand-page.component';
import { CardDashboardModule } from '../../../commons/components/card-dashboard/card-dashboard.module';
import { DialogBrandModule } from '../mat-dialogs/dialog-brand/dialog-brand.module';
import { MatPaginatorModule } from '@angular/material/paginator';

export const routes: Routes = [{ path: '', component: BrandPageComponent }];

@NgModule({
    declarations: [BrandPageComponent],
    imports: [
        RouterModule.forChild(routes), 
        FormSharedModule, 
        CardDashboardModule, 
        DialogBrandModule,
        MatPaginatorModule
    ],
    exports:[BrandPageComponent]
})
export class BrandModule { }