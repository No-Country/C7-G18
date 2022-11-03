import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { Dialog } from '../dialog';
import { PetService } from '../../../../commons/services/pet.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';

@Component({
	selector: 'app-dialog-pet',
	templateUrl: './dialog-pet.component.html',
	styleUrls: ['./dialog-pet.component.scss']
})
export class DialogPetComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialog: Dialog,
		public dialogRef: MatDialogRef<DialogPetComponent>,
		private _formBuilder: UntypedFormBuilder,
		private _alertify: AlertifyService,
		private _petService:PetService,
		private _afs: AngularFirestore
	) {
		if(this.dialog.id){
		 this._afs.collection<IProductClass>('products',ref=>ref.where('pet','==', this.dialog.id!)).get().forEach(prod=>this.deleteButton=(prod.size==0))} 
		  
	}

	ngOnInit(): void {
		if (this.dialog.url) {
			this.url = this.dialog.url;
		}
				
	}

	date: Date = new Date();
	url: string;
	disableButton = false
	deleteButton:boolean

	formGroup: UntypedFormGroup = this._formBuilder.group({
		name: [this.dialog.nombre, Validators.required]
	});

	async add() {
		if (this.formGroup.valid) {
			this.disableButton = true;
			const response = {
				name: this.formGroup.value.name,
				created: this.date.toLocaleString('en-GB', { day: 'numeric', month: '2-digit', year: 'numeric' })
			};

			await this._petService
				.addPet(response)
				.then(() => this._alertify.success(`¡Mascota ${response.name} agregada!`))
				.finally(() => this.dialogRef.close());
		}
	}

	async delete() {
		this.disableButton = true;
			await this._petService
			.deletePet(this.dialog.id!)
			.then(() => this._alertify.success(`¡Mascota ${this.dialog.nombre} eliminada!`))
			.finally(() => this.dialogRef.close());		
	}

	async edit() {
		this.disableButton = true;
		const response = {
			name: this.formGroup.value.name
		};
		await this._petService
			.updatePet(this.dialog.id!, response)
			.then(() => this._alertify.success(`¡Mascota ${response.name} editada!`))
			.finally(() => this.dialogRef.close());
	}
}
