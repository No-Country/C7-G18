import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CategoryService } from 'src/app/commons/services/category.service';
import { PetService } from 'src/app/commons/services/pet.service';
import { ProductService } from 'src/app/commons/services/product.service';



import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  private _productsCollection: AngularFirestoreCollection<IProductClass>
  private _subcategoriesCollection: AngularFirestoreCollection<IProductClass>
  private _petsCollection: AngularFirestoreCollection<IProductClass>

  products$: Observable<IProductClass[]>;
  subcategories$: Observable<IProductClass[]>;
  pets$: Observable<IProductClass[]>;

  constructor(
    private _matDialog: MatDialog,
    private _productService:ProductService,
    private _categoryService:CategoryService,
    private _brandService:BrandService,
    private _petService:PetService,
    private _afs: AngularFirestore
  ) {
    
   }

   categoryName(id:any):string|undefined{    
    return this.categories.find(category=>category.id==id)?.name
   }

   petName(id:any):string|undefined{    
    return this.pets.find(pet=>pet.id==id)?.name
   }

   brandName(id:any):string|undefined{    
    return this.brands.find(brand=>brand.id==id)?.name
   }


  pets:CardDashboard[]=[]
  brands:CardDashboard[]=[]
  categories:CardDashboard[]=[]

   products:IProductClass[]=[]

isPet=false
pet:string|undefined
isBrand=false
brand:string|undefined
isCategory=false
category:string|undefined


  ngOnInit(): void {
    this._categoryService.getCategory().subscribe(data=>this.categories=data)
    this._brandService.getBrand().subscribe(data=>this.brands=data)
    this._petService.getPet().subscribe({
      next:data=>this.pets=data,
      complete:()=>{this.prods()}
    })

    
    
    // this.dataSource = new MatTableDataSource<IProductClass>(this.products$);
    //   this.dataSource.paginator = this.paginator;
    //   this.paginator._intl.itemsPerPageLabel="Productos por página";
    //   this.obs = this.dataSource.connect();

    


    // this._afs.collection('products').valueChanges().subscribe(data=>console.log(data, 'productos'))
    // this._afs.collection('category').valueChanges().subscribe(data=>console.log(data, 'categorias'))

    // this._categoryService.getCategory().subscribe(data=>this.categories=data)
    // this._brandService.getBrand().subscribe(data=>this.brands=data)
    // this._petService.getPet().subscribe(data=>this.pets=data)
       
  }

  prods(){
    this._productsCollection = this._afs.collection<IProductClass>('products')
    this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
     prod.map(element => {
       element.nameCategory=this.categoryName(element.category);
       element.namePet=this.petName(element.pet);
       element.nameBrand=this.brandName(element.brand);
       this.products.push(element)

       return element
     })
     ))

    this.isPet=false
    this.isBrand=false
    this.isCategory=false    
     
  }






  // @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  // dataSource:MatTableDataSource<IProductClass>
  // obs: Observable<any>;

  //  getProducts(){      
  //      this.dataSource = new MatTableDataSource<IProductClass>(this.products);
  //      this.dataSource.paginator = this.paginator;
  //      this.paginator._intl.itemsPerPageLabel="Productos por página";
  //      this.obs = this.dataSource.connect();
  // }







categFilter(id:any){
  this._productsCollection = this._afs.collection('products',ref=>ref.where('category','==',id))
  this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
    prod.map(element => {
      element.nameCategory=this.categoryName(element.category);
      element.namePet=this.petName(element.pet);
      element.nameBrand=this.brandName(element.brand);
      return element
    })))

    this._subcategoriesCollection = this._afs.collection<IProductClass>(`category/${id}/subcategory`)
    this.subcategories$=this._subcategoriesCollection.valueChanges({idField:'id'})
   // this.subcategories$.subscribe(a=>console.log(a))

   this.isPet=false
    this.isBrand=false
    this.isCategory=true

    this.category=this.categories.find(category=>category.id==id)?.name
}

petFilter(id:any){
  this._productsCollection = this._afs.collection('products',ref=>ref.where('pet','==',id))
  this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
    prod.map(element => {
      element.nameCategory=this.categoryName(element.category);
      element.namePet=this.petName(element.pet);
      element.nameBrand=this.brandName(element.brand);
      return element
    })))

    this.isPet=true
    this.isBrand=false
    this.isCategory=false

    this.pet=this.pets.find(pet=>pet.id==id)?.name
}

brandFilter(id:any){
  this._productsCollection = this._afs.collection('products',ref=>ref.where('brand','==',id))
  this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
    prod.map(element => {
      element.nameCategory=this.categoryName(element.category);
      element.namePet=this.petName(element.pet);
      element.nameBrand=this.brandName(element.brand);
      return element
    })))

    this.isPet=false
    this.isBrand=true
    this.isCategory=false

    this.brand=this.brands.find(brand=>brand.id==id)?.name
}

subFilter(idSub:any){
  this._productsCollection = this._afs.collection('products',ref=>ref.where('subcategory','==',idSub))
  this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
    prod.map(element => {
      element.nameCategory=this.categoryName(element.category);
      element.namePet=this.petName(element.pet);
      element.nameBrand=this.brandName(element.brand);
      return element
    })))
}

slider(event:any){
  this._productsCollection = this._afs.collection('products',ref=>ref.where('price','<',event.value))
  this.products$ = this._productsCollection.valueChanges().pipe(map(prod=>
    prod.map(element => {
      element.nameCategory=this.categoryName(element.category);
      element.namePet=this.petName(element.pet);
      element.nameBrand=this.brandName(element.brand);
      return element
    })))
}
 
 

  

  //slider
  max = 500;
  min = 0;
  step = 10;
  thumbLabel = true;
  value = this.max;
  tickInterval = 1;

  



  openNav() {
    document.getElementById("sidenav")!.style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("sidenav")!.style.width = "0";
  }




  
}
