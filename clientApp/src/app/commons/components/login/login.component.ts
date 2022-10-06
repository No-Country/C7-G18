import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	constructor(public dialogRef: MatDialogRef<LoginComponent>, private _matDialog: MatDialog, private _formBuilder: FormBuilder, ) {
		this._loadFormGroup()
	}

	formGroup!:FormGroup
	
	// email = new FormControl('', [Validators.required, Validators.email]);
	hide = true;

	login = false;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	


	ngOnInit(): void {}


	loginByPassword(){
		if(this.formGroup.valid){
			console.log(this.formGroup.value)
		}
	}


	// getErrorMessage() {
	// 	if (this.email.hasError('required')) {
	// 		return 'You must enter a value';
	// 	}

	// 	return this.email.hasError('email') ? 'Not a valid email' : '';
	// }

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
