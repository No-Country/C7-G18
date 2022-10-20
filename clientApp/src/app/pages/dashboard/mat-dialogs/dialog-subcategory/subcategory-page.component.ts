import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private _formBuilder: FormBuilder,
    private _alertify: AlertifyService,
    public dialogRef: MatDialogRef<SubcategoryPageComponent>
  ) { }

  ngOnInit(): void {
  }

  modeAdd=false
  modeEdit=false
  modeDelete=false

  thisSub:string=''


  formGroup: FormGroup= this._formBuilder.group({
    name: [this.thisSub, Validators.required]
  });



  add(){this.modeAdd=!this.modeAdd}

  edit(s:string){
    this.thisSub=s
    this.modeEdit=!this.modeEdit;
  }
  delete(s:string){
    this.thisSub=s
    this.modeDelete=!this.modeDelete;
  }


  async addSub(){
    if(this.formGroup.valid){
      const response= this.formGroup.value.name      
      await this._subcategoryService.addSubcategory(this.product.id!, response)
      .then(()=>this._alertify.success(`¡Subcategoría ${response} agregada!`))
      .finally(()=>this.dialogRef.close());      
    }    
  }

  async deleteSub(){
    await this._subcategoryService.deleteSubcategory(this.product.id!, this.thisSub!)
    .then(()=>this._alertify.success(`¡Subcategoría ${this.thisSub} eliminada!`))
    .finally(()=>this.dialogRef.close())
  }

  async editSub(){
    const response= this.formGroup.value.name
    await this._subcategoryService.editSubcategory(this.product.id!, this.thisSub!, response)
    .then(()=>this._alertify.success(`¡Subcategoría editada!`))
    .finally(()=>this.dialogRef.close())
  }

}
