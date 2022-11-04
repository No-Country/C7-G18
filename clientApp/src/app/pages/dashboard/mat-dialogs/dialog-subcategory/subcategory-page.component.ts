import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { CardDashboard } from '../../../../commons/components/card-dashboard/card-dashboard';
import { SubcategoryService } from '../../../../commons/services/subcategory.service';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss']
})
export class SubcategoryPageComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public product: CardDashboard,
    private _subcategoryService:SubcategoryService,
    private _formBuilder: UntypedFormBuilder,
    private _alertify: AlertifyService,
    public dialogRef: MatDialogRef<SubcategoryPageComponent>,
		private _afs: AngularFirestore
  ) { 
    
  }

  subcategories:CardDashboard[]  
	disableButton = false
	deleteButton:boolean

  ngOnInit(): void {
    this._subcategoryService.getSubcategory(this.product.id!).subscribe(data=>this.subcategories=data)
  }

  modeAdd=false
  modeEdit=false
  modeDelete=false

  sub:CardDashboard|null=null


  formGroup: UntypedFormGroup= this._formBuilder.group({
    name: ['', Validators.required]
  });



  add(){this.modeAdd=!this.modeAdd}
  edit(sub:CardDashboard|null){
    this.modeEdit=!this.modeEdit;
    this.sub=sub
    this.formGroup.patchValue({name:sub!.name})
  }
  delete(sub:CardDashboard|null){
    this.modeDelete=!this.modeDelete;
    this.sub=sub
    if(sub!.id){
      this._afs.collection<IProductClass>('products',ref=>ref.where('subcategory','==', sub!.id)).get().forEach(prod=>this.deleteButton=(prod.size==0))} 
  } 


  async addSub(){
    if(this.formGroup.valid){      
			this.disableButton = true;
      const response= {name:this.formGroup.value.name }     
      await this._subcategoryService.addSubcategory(response, this.product.id! )
      .then(()=>this._alertify.success(`¡Subcategoría ${response.name} agregada!`))
      .finally(()=>this.dialogRef.close());      
    }    
  }

  async deleteSub(){    
			this.disableButton = true;
    await this._subcategoryService.deleteSubcategory(this.product.id!, this.sub!.id!)
    .then(()=>this._alertify.success(`¡Subcategoría ${this.sub!.name} eliminada!`))
    .finally(()=>this.dialogRef.close())
  }

  async editSub(){    
			this.disableButton = true;
    const response= {name:this.formGroup.value.name}
    await this._subcategoryService.updateSubcategory(this.product.id!, this.sub!.id!, response)
    .then(()=>this._alertify.success(`¡Subcategoría editada!`))
    .finally(()=>this.dialogRef.close())
  }

}
