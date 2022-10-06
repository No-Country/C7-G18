import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	email = new FormControl('', [Validators.required, Validators.email]);
	hide = true;

	login = false;

	constructor(public dialogRef: MatDialogRef<LoginComponent>, private _matDialog: MatDialog) {}

	ngOnInit(): void {}

	getErrorMessage() {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}

		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	openModalRegister() {
		this.dialogRef.close();
		console.log('se cerro el modal ');

		this._matDialog.open(SingUpComponent, {
			// maxWidth: '700vw',
			width: '500px',
			maxHeight: '670px'
		});
	}
}
