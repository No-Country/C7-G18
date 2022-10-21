import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';
import { ResetPassComponent } from '../reset-pass/reset-pass.component';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private _matDialog: MatDialog,
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _alertify: AlertifyService,
	) {
		this._loadFormGroup();
	}

	formGroup!: FormGroup;
	disableButton = false;
	hide = true;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	ngOnInit(): void {}

	loginByPassword() {
		if (this.formGroup.valid) {
			this.disableButton = true;
			this._authService
				.loginByPassword(this.formGroup.value)
				.then((res) => {
					this.dialogRef.close();
				})
				.catch((e) => {
					this._alertify.error(e.code);
				})
				.finally(() => (this.disableButton = false));
		}
	}

	loginWithGoogle(){
		this._authService
			.googleAuth()
			.then((res) => this.dialogRef.close())
			.catch((e) => this._alertify.error(e.code));
	}

	openModalRegister() {
		this.dialogRef.close({ isLogin: false });

		if (screen.width < 500) {
			this._matDialog.open(SingUpComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px'
			});
		} else {
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
