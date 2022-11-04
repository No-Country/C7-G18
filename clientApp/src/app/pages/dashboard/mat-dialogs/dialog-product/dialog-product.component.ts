import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '../dialog';
import { CardDashboard } from '../../../../commons/components/card-dashboard/card-dashboard';
import { SubcategoryService } from '../../../../commons/services/subcategory.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ProductService } from '../../../../commons/services/product.service';
import { AlertifyService } from 'src/app/commons/services/alertify.service';
import { IProductClass } from '../../../../commons/interfaces/front.interface';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog:Dialog,    
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private _formBuilder: UntypedFormBuilder,
    private _subcategoryService:SubcategoryService,
    private _productService:ProductService,
    private _storage: Storage,
    private _alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.formGroup.get('category')?.valueChanges
    .subscribe(selectedValue=>this.subsC(selectedValue))
    
    if(this.dialog.product!.img){this.url=this.dialog.product!.img}
    
      if(this.dialog.modo=='edit'){
        const {name, category, subcategory, pet, brand, price, description, percent} = this.dialog.product!
        this.formGroup.patchValue({name, category, subcategory, pet, brand, price, description, percent})
      }
      if(this.dialog.modo=='stock'){
        this.formGroup.patchValue({stock:this.dialog.product?.stock})
      }
  }

  formGroup= this._formBuilder.group({
    name: ['', Validators.required],
    category:[, Validators.required],
    subcategory: '',
    pet:['', Validators.required],
    brand: ['', Validators.required],
    stock:'',
    price: ['', Validators.required],
    description:['', Validators.required],
    percent:0
  });

  subs:CardDashboard[]
  url:string
  date:Date= new Date
  disableButton = false;

  subsC(id:string){
    this._subcategoryService.getSubcategory(id).subscribe(data=>this.subs=data)
  }

  async add(){
    if(this.formGroup.valid){
      this.disableButton = true;
      const {name, category, subcategory, pet, brand, stock, price, description } = this.formGroup.value
      const response={
        name, stock, price, description, category,subcategory,pet,brand,
        percent:this.formGroup.value.percent || 0,
        nameCategory:this.dialog.categories?.find(cat=>cat.id==category)?.name,        
        nameSubcategory:this.subs.find(sub=>sub.id==subcategory)?.name||'',        
        namePet:this.dialog.pets?.find(pet1=>pet1.id==pet)?.name,        
        nameBrand:this.dialog.brands?.find(brand1=>brand1.id==brand)?.name,
        discount: (price * (100 - this.formGroup.value.percent) /100),
        img:this.url,
        created:this.date.toLocaleString("en-GB",{day: "numeric",month: "2-digit",year: "numeric"})
      }
      
      await this._productService.addProds(response)
      .then(()=>this._alertify.success(`Producto ${response.name} agregado!`))
      .finally(()=>this.dialogRef.close());
      
    }
  }

  async edit(){ 
    this.disableButton = true; 
    const {name, category, subcategory, pet, brand, price, description } =  this.formGroup.value
      const response={
    name, category, subcategory, pet, brand, price, description,
    percent: this.formGroup.value.percent || 0,
    nameCategory:this.dialog.categories?.find(cat=>cat.id==category)?.name,        
    nameSubcategory:this.subs.find(sub=>sub.id==subcategory)?.name || '',        
    namePet:this.dialog.pets?.find(pet1=>pet1.id==pet)?.name,        
    nameBrand:this.dialog.brands?.find(brand1=>brand1.id==brand)?.name,       
    discount: (price * (100 - this.formGroup.value.percent) /100),
    img:this.url,
    stock:this.dialog.product?.stock
      }      
      await this._productService.updateProds(this.dialog.product?.id!, response)
      .then(()=>this._alertify.success(`!Producto ${response.name} editado!`))
      .finally(()=>this.dialogRef.close());
  }

  async editStock(){  
    this.disableButton = true;  
    const {name, category, subcategory, pet, brand, price, description,
      discount, percent, img, nameBrand, nameCategory, namePet, nameSubcategory} =  this.dialog.product!
    const response={
      name, category, subcategory, pet, brand, price, description,
    discount, percent, img, nameBrand, nameCategory, namePet, nameSubcategory,
      stock:this.formGroup.value.stock
    }      
    await this._productService.updateProds(this.dialog.product?.id!, response)
    .then(()=>this._alertify.success(`!Producto ${response.name} editado!`))
    .finally(()=>this.dialogRef.close());
}

  async delete(){
    this.disableButton = true;
    await this._productService.deleteProds(this.dialog.product?.id!)
    .then(()=>this._alertify.success(`¡Producto ${this.dialog.nombre} eliminado!`))
    .finally(()=>this.dialogRef.close())
  }


  uploadImage($event: any) {
    const file = $event.target.files[0];
    const imgRef = ref(this._storage, `products/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async response => {
        const url= await getDownloadURL(imgRef)
        this.url=url
      })
      .catch(error => console.log(error));

  }

}


