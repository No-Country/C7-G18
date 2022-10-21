import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPetComponent } from './dialog-pet.component';
import { FormSharedModule } from './../../../../commons/shared/form-shared.module';



@NgModule({
	declarations: [DialogPetComponent],
	imports: [CommonModule, FormSharedModule],
	exports: [DialogPetComponent]
})
export class DialogPetModule {}
