import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { PetPageComponent } from './pet-page.component';
import { CardDashboardModule } from '../../../commons/components/card-dashboard/card-dashboard.module';
import { DialogModule } from '../dialog/dialog.module';


export const routes: Routes = [{ path: '', component: PetPageComponent }];

@NgModule({
    declarations: [PetPageComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule, CardDashboardModule,DialogModule]
})
export class PetModule { }