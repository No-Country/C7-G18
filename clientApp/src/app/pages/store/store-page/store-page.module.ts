import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { StorePageComponent } from './store-page.component';
import { CardProductModule } from 'src/app/commons/components/card-product/card-product.module';


export const routes: Routes = [{ path: '', component: StorePageComponent }];

@NgModule({
    declarations: [StorePageComponent],
    imports: [
        RouterModule.forChild(routes), 
        FormSharedModule, 
        MatExpansionModule, 
        MatSliderModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        CardProductModule,
        MatTableModule
    ]
    
})
export class StoreModule { }
