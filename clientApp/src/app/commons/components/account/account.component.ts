import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from '../../services/alertify.service';
import { UserService } from '../../services/user.service';
import { Iuser } from './user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _storage: Storage,
    private _auth:AngularFireAuth,
    private _userService:UserService,
    private _alertify: AlertifyService,
    private _authService:AuthService,
    public dialogRef: MatDialogRef<AccountComponent>,
   
  ) { 
    this.url=_authService.userPhotoUrl
  }

  url:string
  uid:string

  // ngOnInit(): void {
  //   this._loadFormGroup()
  //   this._auth.authState.subscribe({
  //     next:user=>{
  //       this.formGroup.patchValue({
  //       name:user?.displayName,
  //       photo:user?.photoURL,
  //       phone:user?.phoneNumber
  //     })
  //     this.uid= user?.uid!
  //     },
  //     complete:()=>{}
  //   })        
  // }

  ngOnInit(): void {
    this._loadFormGroup()
    this.uid= this._authService.uidUser
    let userData:Iuser
    this._userService.getUser(this.uid).subscribe({
      next:data=>{userData=data
      console.log(userData,'la data')},
      complete:()=>{
        this.formGroup.patchValue({
      name: userData.name,
      dni:userData.dni,
      phone:userData.phone,
      address:userData.address,
      reference:userData.reference,
      photo:userData.photo 
    })}})   
  }

  formGroup!: FormGroup;


  private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
    name: '',
    dni:'',
    phone:'',
    address:'',
    reference:'',
    photo:''
  });}


  async update(){
    let userData={
      name: this.formGroup.value.name,
    dni:this.formGroup.value.dni,
    phone:this.formGroup.value.phone,
    address:this.formGroup.value.address,
    reference:this.formGroup.value.reference,
    photo:this.url
    }
   await this._userService.updateUser(this.uid,userData)
   .then(()=>this._alertify.success(`!Usuario editado!`))
   .finally(()=>{
    this._authService.changePhotoUrl(this.url)
    this.dialogRef.close()
  });
  }

 



  uploadImage($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this._storage, `users/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async response => {
        const url= await getDownloadURL(imgRef)
        this.url=url
      })
      .catch(error => console.log(error));

  }
}

