import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

import { BrandService } from '../../../../commons/services/brand.service';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { Dialog } from '../dialog';

@Component({
  selector: 'app-dialog-brand',
  templateUrl: './dialog-brand.component.html',
  styleUrls: ['./dialog-brand.component.scss']
})
export class DialogBrandComponent implements OnInit {
  constructor( 
    @Inject(MAT_DIALOG_DATA) public dialog:Dialog,
    public dialogRef: MatDialogRef<DialogBrandComponent>,
    private _brandService:BrandService,
    private _formBuilder: FormBuilder,
    private _storage: Storage,
    private _alertify: AlertifyService,
   ) { }

  ngOnInit(): void {
    if(this.dialog.url){this.url=this.dialog.url}
  }

  date:Date= new Date
  url:string
  

  formGroup: FormGroup= this._formBuilder.group({
    name: [this.dialog.nombre, Validators.required]
  });

  async add(){
    if(this.formGroup.valid){

      const response={
        name: this.formGroup.value.name,
        url:this.url,
        created:this.date.toLocaleString("en-GB",{day: "numeric",month: "2-digit",year: "numeric"})
      }
      
      await this._brandService.addBrand(response)
      .then(()=>this._alertify.success(`¡Marca ${response.name} agregada!`))
      .finally(()=>this.dialogRef.close());
      
    }
    
  }

  async delete(){
    await this._brandService.deleteBrand(this.dialog.id!)
    .then(()=>this._alertify.success(`¡Marca ${this.dialog.nombre} eliminada!`))
    .finally(()=>this.dialogRef.close())
  }

  async edit(){
    
    const response={
      name: this.formGroup.value.name,
      url:this.url
    }
    await this._brandService.updateBrand(this.dialog.id!,response)
    .then(()=>this._alertify.success(`¡Marca ${response.name} editada!`))
    .finally(()=>this.dialogRef.close())
  }
 

  uploadImage($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this._storage, `brands/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async response => {
        const url= await getDownloadURL(imgRef)
        this.url=url
      })
      .catch(error => console.log(error));

  }

}
