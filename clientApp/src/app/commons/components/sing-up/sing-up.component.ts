import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NewUSer } from '../modelos/newUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'app-sing-up',
	templateUrl: './sing-up.component.html',
	styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {
	constructor(public dialogRef: MatDialogRef<SingUpComponent>, private _matDialog: MatDialog) {}

	user: NewUSer[] = [new NewUSer('Alex', 'Alexand@gmail.com', 1234)];

	name: string;
	email: string;
	password: number;

	hide = true;

	createUser() {
		let newUser = new NewUSer(this.name, this.email, this.password);
		this.user.push(newUser);
	}

	loginUser() {
		this.dialogRef.close();
		console.log('se cerro el modal ');

		this._matDialog.open(LoginComponent, {
			width: '500px',
			maxHeight: '670px'
		});
	}
}
