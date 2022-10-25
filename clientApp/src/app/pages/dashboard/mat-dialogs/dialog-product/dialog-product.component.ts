import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '../dialog';
import { CardDashboard } from '../../../../commons/components/card-dashboard/card-dashboard';
import { SubcategoryService } from '../../../../commons/services/subcategory.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ProductService } from '../../../../commons/services/product.service';
import { AlertifyService } from 'src/app/commons/services/alertify.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog:Dialog,    
    public dialogRef: MatDialogRef<DialogProductComponent>,
    private _formBuilder: FormBuilder,
    private _subcategoryService:SubcategoryService,
    private _productService:ProductService,
    private _storage: Storage,
    private _alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.formGroup.get('category')?.valueChanges.subscribe(selectedValue=>{
      this.subsC(selectedValue)      
    })
    if(this.dialog.product!.img){this.url=this.dialog.product!.img}
  }

  formGroup: FormGroup= this._formBuilder.group({
    name: ['', Validators.required],
    category:['', Validators.required],
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

  subsC(id:string){
    console.log(id)
    this._subcategoryService.getSubcategory(id).subscribe(data=>this.subs=data)
  }

  async add(){
    if(this.formGroup.valid){
      const response={
        name: this.formGroup.value.name,
        category: this.formGroup.value.category,
        subcategory: this.formGroup.value.subcategory,
        pet: this.formGroup.value.pet,
        brand: this.formGroup.value.brand,
        stock: this.formGroup.value.stock,
        price: this.formGroup.value.price,
        description: this.formGroup.value.description,
        discount: (this.formGroup.value.price * (100 - this.formGroup.value.percent) /100),
        percent:this.formGroup.value.percent,
        img:this.url,
        created:this.date.toLocaleString("en-GB",{day: "numeric",month: "2-digit",year: "numeric"})
      }
      
      await this._productService.addProds(response)
      .then(()=>this._alertify.success(`Producto ${response.name} agregado!`))
      .finally(()=>this.dialogRef.close());
      
    }
  }

  async edit(){    
      const response={
        name: this.formGroup.value.name,
        category: this.formGroup.value.category,
        subcategory: this.formGroup.value.subcategory,
        pet: this.formGroup.value.pet,
        brand: this.formGroup.value.brand,
        price: this.formGroup.value.price,
        description: this.formGroup.value.description,        
        discount: (this.formGroup.value.price * (100 - this.formGroup.value.percent) /100),
        percent:this.formGroup.value.percent,
        img:this.url,
        stock:this.dialog.product?.stock
      }      
      await this._productService.updateProds(this.dialog.product?.id!, response)
      .then(()=>this._alertify.success(`!Producto ${response.name} editado!`))
      .finally(()=>this.dialogRef.close());
  }

  async editStock(){    
    const response={
      name: this.dialog.product?.name,
      category: this.dialog.product?.category,
      subcategory: this.dialog.product?.subcategory,
      pet: this.dialog.product?.pet,
      brand: this.dialog.product?.brand,
      price: this.dialog.product?.price,
      description: this.dialog.product?.description,
      discount: this.dialog.product?.discount,
      img:this.dialog.product?.img,
      stock:this.formGroup.value.stock
    }      
    await this._productService.updateProds(this.dialog.product?.id!, response)
    .then(()=>this._alertify.success(`!Producto ${response.name} editado!`))
    .finally(()=>this.dialogRef.close());
}

  async delete(){
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


