import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { BrandPageComponent } from './brand-page.component';

export const routes: Routes = [{ path: '', component: BrandPageComponent }];

@NgModule({
    declarations: [BrandPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class BrandModule { }