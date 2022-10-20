import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { CategoryService } from 'src/app/commons/services/category.service';
import { Dialog } from '../dialog';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {
  constructor( 
    @Inject(MAT_DIALOG_DATA) public dialog:Dialog,
    public dialogRef: MatDialogRef<DialogCategoryComponent>,
    private _categoryService:CategoryService,
    private _formBuilder: FormBuilder,
    private _alertify: AlertifyService,
   ) { }

  ngOnInit(): void {  }

  date:Date= new Date
  

  formGroup: FormGroup= this._formBuilder.group({
    name: [this.dialog.nombre, Validators.required]
  });

  async add(){
    if(this.formGroup.valid){

      const response={
        name: this.formGroup.value.name,
        created:this.date.toLocaleString("en-GB",{day: "numeric",month: "2-digit",year: "numeric"})
      }
      
      await this._categoryService.addCategory(response)
      .then(()=>this._alertify.success(`Categoría ${response.name} agregada!`))
      .finally(()=>this.dialogRef.close());
      
    }
    
  }

  async delete(){
    await this._categoryService.deleteCategory(this.dialog.id!)
    .then(()=>this._alertify.success(`Categoría ${this.dialog.nombre} eliminada!`))
    .finally(()=>this.dialogRef.close())
  }

  async edit(){
    
    const response={
      name: this.formGroup.value.name
    }
    await this._categoryService.updateCategory(this.dialog.id!,response)
    .then(()=>this._alertify.success(`Categoría ${response.name} editada!`))
    .finally(()=>this.dialogRef.close())
  }

}
