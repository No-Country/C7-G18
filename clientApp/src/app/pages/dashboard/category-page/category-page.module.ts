import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { CategoryPageComponent } from './category-page.component';
import { CardDashboardModule } from '../../../commons/components/card-dashboard/card-dashboard.module';
import { DialogCategoryModule } from '../mat-dialogs/dialog-category/dialog-category.module';
import { MatPaginatorModule } from '@angular/material/paginator';

export const routes: Routes = [{ path: '', component: CategoryPageComponent }];

@NgModule({
    declarations: [CategoryPageComponent],
    imports: [
        RouterModule.forChild(routes), 
        FormSharedModule, 
        CardDashboardModule,
        DialogCategoryModule,
        MatPaginatorModule
    ]
})
export class CategoryModule { }