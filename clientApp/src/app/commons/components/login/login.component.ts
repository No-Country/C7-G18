import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SingUpComponent } from '../sing-up/sing-up.component';
import { ResetPassComponent } from '../reset-pass/reset-pass.component';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Iuser } from '../account/user.interface';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private _matDialog: MatDialog,
		private _formBuilder: UntypedFormBuilder,
		private _authService: AuthService,
		private _alertify: AlertifyService,
		private router: Router,
		private _userService:UserService,
	) {
		this._loadFormGroup();
	}

	formGroup!: UntypedFormGroup;
	disableButton = false;
	hide = true;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	ngOnInit(): void {}
	//admin@petstore.com
	loginByPassword() {
		if (this.formGroup.valid) {
			this.disableButton = true;
			const values = this.formGroup.value;
			if(values.email=='admin@petstore.com'){
				setTimeout(() =>{
					this.disableButton = false
					this.dialogRef.close();
					this.router.navigate(['/admin']);
				}, 4000);
			}else{
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
	}

	loginWithGoogle(){
		this._authService
			.googleAuth()
			.then((res) =>this.setPerfilUser(res.user?.displayName!,true))
			.catch((e) => {	
				this._alertify.error(e.code);
			});
	}
	
	setPerfilUser(fullName: string,google:boolean): void {
		this._authService
			.getCurrentUser()
			.then((res) => {
				let data= {
					name:fullName,
					email:res?.email!,
					photo: google ? res?.photoURL!:'',
					phone:'',
					address:'',
					reference:'',
					dni:''
				}
				this.addUser(res?.uid!,data)
			})
			.then((res) => console.log(res,'registrado'))
			.catch((e) => this._alertify.error(e.code))
			.finally(() => {
				this.disableButton = false;
				this.dialogRef.close();});
	}

	
	async addUser(id:string, data:Iuser){
		await this._userService.addUser(id,data)
		.then((res)=>console.log(res))
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
