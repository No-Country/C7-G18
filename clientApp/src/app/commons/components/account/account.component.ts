import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _storage: Storage,
    private _auth:AngularFireAuth
  ) { 
    

  }

  url:string
  userName:any=''

  ngOnInit(): void {
    this._loadFormGroup()
    this._auth.authState.subscribe({
      next:user=>{
        this.formGroup.patchValue({
        name:user?.displayName,
        photo:user?.photoURL,
        phone:user?.phoneNumber
      })
      console.log(user?.uid)
      },
      complete:()=>{}
    })
        
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


  add(){
    console.log(this.formGroup.value.name)
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

