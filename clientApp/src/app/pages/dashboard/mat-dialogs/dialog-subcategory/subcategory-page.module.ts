import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../../commons/shared/form-shared.module';
import { SubcategoryPageComponent } from './subcategory-page.component';
import {MatChipsModule} from '@angular/material/chips';

export const routes: Routes = [{ path: '', component: SubcategoryPageComponent }];

@NgModule({
    declarations: [SubcategoryPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule, MatChipsModule]
})
export class SubcategoryModule { }