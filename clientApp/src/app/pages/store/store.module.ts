import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';
import { StoreLayoutModule } from '../../commons/layouts/store-layout/store-layout.module';


@NgModule({
	imports: [StoreRoutingModule,  StoreLayoutModule],
})
export class StoreModule {}
