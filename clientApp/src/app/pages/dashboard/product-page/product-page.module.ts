import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { ProductPageComponent } from './product-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogProductModule } from '../mat-dialogs/dialog-product/dialog-product.module';

export const routes: Routes = [{ path: '', component: ProductPageComponent }];

@NgModule({
    declarations: [ProductPageComponent],
    imports: [RouterModule.forChild(routes), 
              FormSharedModule, 
              MatTableModule, 
              MatPaginatorModule,
            DialogProductModule]
})
export class ProductModule { }