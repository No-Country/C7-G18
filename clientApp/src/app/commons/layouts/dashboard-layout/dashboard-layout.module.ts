import { NgModule } from '@angular/core';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormSharedModule } from '../../shared/form-shared.module';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [RouterModule, MatSidenavModule, FormSharedModule,MatListModule,MatMenuModule,MatToolbarModule],
    exports: [],
    declarations: [
    DashboardLayoutComponent
  ],
    providers: [],
})
export class DashboardLayoutModule {

 }
