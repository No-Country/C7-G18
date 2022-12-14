import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NewUSer } from '../modelos/newUser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { customPasswordValidator } from '../../validators/password.validators';
import { UserService } from '../../services/user.service';
import { Iuser } from '../account/user.interface';



@Component({
	selector: 'app-sing-up',
	templateUrl: './sing-up.component.html',
	styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
	
	usurio:UntypedFormGroup;

	constructor(
		public dialogRef: MatDialogRef<SingUpComponent>, 
		private _matDialog: MatDialog, 
		private _formBuilder: UntypedFormBuilder,
		private _authService: AuthService,
		private _alertify: AlertifyService,
		private _userService:UserService,
		) {
		this._loadFormGroup();

		this.usurio = new UntypedFormGroup({
			nombre: new UntypedFormControl(),
			email:new UntypedFormControl(),
			password:new UntypedFormControl()
		})

	}

	ngOnInit(): void {
	}

	formGroup!: UntypedFormGroup;
	hide = true;
	disableButton = false;

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			name:['', Validators.required],
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required,customPasswordValidator]]
		});
	}

	createUser() {
		if (this.formGroup.valid) {
			this.disableButton = true;
			const data=this.formGroup.value
			this._authService.registerWithEmail(data)
			.then(()=>{this.setPerfilUser(data.name,false)})
			.catch((e) => {
				this._alertify.error(e.code);
				this.disableButton = false;
			});

		}
		
	}

	registerWithGoogle(){
		this._authService
			.googleAuth()
			.then((res) =>this.setPerfilUser(res.user?.displayName!,true))
			.catch((e) => {	
				this.disableButton = false;
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
				this.disableButton = false
				this._alertify.success('??Cuenta creada!')
				this.dialogRef.close();});
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



	onSubmit(){
		console.log(this.usurio.value)
	}

async addUser(id:string, data:Iuser){
		await this._userService.addUser(id,data)
		.then((res)=>console.log(res))
	}

}
