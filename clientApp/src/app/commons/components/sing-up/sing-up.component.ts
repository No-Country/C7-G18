import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NewUSer } from '../modelos/newUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'app-sing-up',
	templateUrl: './sing-up.component.html',
	styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<SingUpComponent>, private _matDialog: MatDialog, private _formBuilder: FormBuilder) {
		this._loadFormGroup();
	}

	ngOnInit(): void {
	}

	formGroup!: FormGroup;

	user: NewUSer[] = [new NewUSer('Alex', 'Alexand@gmail.com', 1234)];
	name: string;
	email: string;
	password: number;
	hide = true;

	createUser() {
		let newUser = new NewUSer(this.name, this.email, this.password);
		this.user.push(newUser);
	}

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	loginByPassword() {
		if (this.formGroup.valid) {
			console.log(this.formGroup.value);
		}
	}

	loginUser() {
		this.dialogRef.close();
		console.log('se cerro el modal ');

		
		if (screen.width < 500) {
			this._matDialog.open(LoginComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		}else{			
			this._matDialog.open(LoginComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}
}
