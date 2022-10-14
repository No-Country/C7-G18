import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { CategoryPageComponent } from './category-page.component';

export const routes: Routes = [{ path: '', component: CategoryPageComponent }];

@NgModule({
    declarations: [CategoryPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class CategoryModule { }