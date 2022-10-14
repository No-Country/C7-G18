import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { PetPageComponent } from './pet-page.component';


export const routes: Routes = [{ path: '', component: PetPageComponent }];

@NgModule({
    declarations: [PetPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class PetModule { }