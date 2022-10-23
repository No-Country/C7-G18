import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { Product } from 'src/app/commons/components/card-product';
import { IProductClass } from 'src/app/commons/interfaces/front.interface';
import { BrandService } from 'src/app/commons/services/brand.service';
import { CategoryService } from 'src/app/commons/services/category.service';
import { PetService } from 'src/app/commons/services/pet.service';
import { ProductService } from 'src/app/commons/services/product.service';




@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

 

  constructor(
    private _matDialog: MatDialog,
    private _productService:ProductService,
    private _categoryService:CategoryService,
    private _brandService:BrandService,
    private _petService:PetService,
  ) { }

  pets:CardDashboard[]=[]
  brands:CardDashboard[]=[]
  categories:CardDashboard[]=[]
  products:IProductClass[]=[]

  ngOnInit(): void {
    this._categoryService.getCategory().subscribe(data=>this.categories=data)
    this._brandService.getBrand().subscribe(data=>this.brands=data)
    this._petService.getPet().subscribe(data=>this.pets=data)
    this._productService.getProds().subscribe({
       next:data=>this.products=data,
       complete:()=>this.getProducts()
     })   
  }

  dataSource:MatTableDataSource<IProductClass>
  obs: Observable<any>;

 getProducts(){       
   this.products.forEach(product=> {
        const dataCategory=this.categories.find(category=>category.id==product.category)
        const dataBrand= this.brands.find(brand=>brand.id==product.brand)
        const dataPet= this.pets.find(pet=>pet.id==product.pet)
        
       product.nameCategory=dataCategory?.name;
       product.nameBrand=dataBrand?.name;
       product.namePet=dataPet?.name

     });
     this.dataSource = new MatTableDataSource<IProductClass>(this.products);
     this.dataSource.paginator = this.paginator;
     this.paginator._intl.itemsPerPageLabel="Productos por página";
     this.obs = this.dataSource.connect();
}
 
 
@ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;



  

  //slider
  max = 1000;
  min = 0;
  step = 10;
  thumbLabel = true;
  value = this.max;
  tickInterval = 1;




  ngAfterViewInit() {
  }
  


  openNav() {
    document.getElementById("sidenav")!.style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("sidenav")!.style.width = "0";
  }




  
}
