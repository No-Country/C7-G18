import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';
import { ResetPassComponent } from '../reset-pass/reset-pass.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(public dialogRef: MatDialogRef<LoginComponent>, private _matDialog: MatDialog, private _formBuilder: FormBuilder) {
		this._loadFormGroup();
	}

	formGroup!: FormGroup;
	hide = true;
	login = false;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	ngOnInit(): void {
	}

	loginByPassword() {
		if (this.formGroup.valid) {
			console.log(this.formGroup.value);
		}
	}

	openModalRegister() {
		this.dialogRef.close();

		if (screen.width < 500) {
			this._matDialog.open(SingUpComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		}else{			
			this._matDialog.open(SingUpComponent, {
				width: '500px',
				maxHeight: '670px'
			});
		}
	}

	openModalResetPass() {
		this.dialogRef.close();

		this._matDialog.open(ResetPassComponent, {
			width: '500px',
			maxHeight: '670px'
		});
	}
}
