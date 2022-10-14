import { NgModule } from '@angular/core';
import { DashboardLayoutModule } from '../../commons/layouts/dashboard-layout/dashboard-layout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
	imports: [DashboardLayoutModule, DashboardRoutingModule]
})
export class DashboardModule {}
