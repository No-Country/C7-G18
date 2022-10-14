import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { ProductPageComponent } from './product-page.component';

export const routes: Routes = [{ path: '', component: ProductPageComponent }];

@NgModule({
    declarations: [ProductPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class ProductModule { }