import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LoginComponent } from '../login/login.component'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  constructor(private _formBuilder: UntypedFormBuilder, public dialogRef: MatDialogRef<ResetPassComponent>, private _matDialog: MatDialog,) {
    this._loadFormGroup();
   }

   formGroup!: UntypedFormGroup;
   
   private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

  ngOnInit(): void {
  }

  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  hide = true;


  loginUser() {
		this.dialogRef.close();
		alert('Por favor revise su correo electronico.');

		this._matDialog.open(LoginComponent, {
			width: '500px',
			maxHeight: '670px'
		});
	}


  
}
