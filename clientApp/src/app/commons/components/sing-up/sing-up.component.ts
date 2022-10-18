import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NewUSer } from '../modelos/newUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';



@Component({
	selector: 'app-sing-up',
	templateUrl: './sing-up.component.html',
	styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
	
	usurio:FormGroup;

	constructor(
		public dialogRef: MatDialogRef<SingUpComponent>, 
		private _matDialog: MatDialog, 
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _alertify: AlertifyService,
		) {
		this._loadFormGroup();

		this.usurio = new FormGroup({
			nombre: new FormControl(),
			email:new FormControl(),
			password:new FormControl()
		})

	}

	ngOnInit(): void {
	}

	formGroup!: FormGroup;
	hide = true;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	createUser() {
		if (this.formGroup.valid) {
			
			console.log(this.usurio.value)

		}
		
	}

	registerWithGoogle(){
		this._authService
			.googleAuth()
			.then((res) => this.dialogRef.close({ isLogin: true }))
			.catch((e) => this._alertify.error(e.code));
	}

	/*setPerfilUser(fullName: string): void {
		this._authService
			.getCurrentUser()
			.then((res) => {
				res?.updateProfile({ displayName: fullName });
				res?.sendEmailVerification();
			})
			.then(() => this.openDialogVerificationEmail())
			.catch((e) => this._toast.error({ detail: 'Error', summary: e.code, duration: 5000 }))
			.finally(() => (this.disableButton = false));
	}*/

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



	onSubmit(){
		console.log(this.usurio.value)
	}

}
