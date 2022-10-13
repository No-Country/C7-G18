import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoComponent } from './pago.component';
import { FormSharedModule } from '../../shared/form-shared.module';

@NgModule({
	declarations: [PagoComponent],
	imports: [CommonModule, FormSharedModule],
	exports: [PagoComponent]
})
export class PagoModule {}
