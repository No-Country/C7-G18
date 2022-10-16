import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDashboardComponent } from './card-dashboard.component';
import { FormSharedModule } from '../../shared/form-shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CardDashboardComponent
  ],
  imports: [
    CommonModule,
    FormSharedModule,
    MatTooltipModule
  ],
  exports:[CardDashboardComponent]
})
export class CardDashboardModule { }
