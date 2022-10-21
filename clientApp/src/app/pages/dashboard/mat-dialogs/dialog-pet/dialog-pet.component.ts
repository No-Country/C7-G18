import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { Dialog } from '../dialog';
import { PetService } from 'src/app/commons/services/pet.service';

@Component({
	selector: 'app-dialog-pet',
	templateUrl: './dialog-pet.component.html',
	styleUrls: ['./dialog-pet.component.scss']
})
export class DialogPetComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialog: Dialog,
		public dialogRef: MatDialogRef<DialogPetComponent>,
		private _mascotasService: PetService,
		private _formBuilder: FormBuilder,
		private _alertify: AlertifyService
	) {}

	ngOnInit(): void {
		if (this.dialog.url) {
			this.url = this.dialog.url;
		}
	}

	date: Date = new Date();
	url: string;

	formGroup: FormGroup = this._formBuilder.group({
		name: [this.dialog.nombre, Validators.required]
	});

	async add() {
		if (this.formGroup.valid) {
			const response = {
				name: this.formGroup.value.name,
				created: this.date.toLocaleString('en-GB', { day: 'numeric', month: '2-digit', year: 'numeric' })
			};

			await this._mascotasService
				.addPet(response)
				.then(() => this._alertify.success(`¡Mascota ${response.name} agregada!`))
				.finally(() => this.dialogRef.close());
		}
	}

	async delete() {
		await this._mascotasService
			.deletePet(this.dialog.id!)
			.then(() => this._alertify.success(`¡Mascota ${this.dialog.nombre} eliminada!`))
			.finally(() => this.dialogRef.close());
	}

	async edit() {
		const response = {
			name: this.formGroup.value.name
		};
		await this._mascotasService
			.updatePet(this.dialog.id!, response)
			.then(() => this._alertify.success(`¡Mascota ${response.name} editada!`))
			.finally(() => this.dialogRef.close());
	}
}
