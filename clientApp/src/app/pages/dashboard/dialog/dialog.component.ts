import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from './dialog';
import { MascotasService } from 'src/app/commons/services/mascotas.service';
import { Mascotas } from 'src/app/commons/interfaces/mascotas.interface';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	formulario: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) public dialog: Dialog, private _mascotaService: MascotasService) {
		this.formulario = new FormGroup({
			name: new FormControl()
		});
	}

	ngOnInit(): void {}

	async onsubmit() {
		console.log(this.formulario.value);
		const respuesta = await this._mascotaService.addMascota(this.formulario.value);
		console.log(respuesta);
	}






}
