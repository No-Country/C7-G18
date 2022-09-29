import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { StorePageComponent } from './store-page.component';

export const routes: Routes = [{ path: '', component: StorePageComponent }];

@NgModule({
    declarations: [StorePageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
    
})
export class StoreModule { }
