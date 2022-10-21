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


const cards:Product[]=[
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto',
    price:19.99,
    meGusta:false,
    sold:35,
    description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ipsum perspiciatis atque laudantium sint nobis laboriosam pariatur eaque facilis saepe nemo quam, placeat optio temporibus ex odio eligendi! Eaque, nisi.',
    brand:'DogChow',
    category:'Alimentación',
    subcategory:'Croquetas',
    pet:'Gatos'
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:true,
    sold:5,
    description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ipsum perspiciatis atque laudantium sint nobis laboriosam pariatur eaque facilis saepe nemo quam, placeat optio temporibus ex odio eligendi! Eaque, nisi.',
    brand:'CatChow',
    category:'Alimentación',
    subcategory:'Balanceado',
    pet:'Gatos'
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    discount:5.99,
    nuevo:true,
    sold:40
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:19.99,
    meGusta:false,
    nuevo:true,
    sold:10
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:false,
    discount:12.99,
    nuevo:true,
    sold:1
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    sold:15
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    discount:5.99,
    nuevo:true,
    sold:48
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:19.99,
    meGusta:false,
    sold:4
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:false,
    discount:12.99,
    nuevo:true,
    sold:100
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    sold:37
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:false,
    discount:12.99,
    nuevo:true,
    sold:100
  },
  {
    img:'assets/images/image 17.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    sold:37
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:false,
    discount:12.99,
    nuevo:true,
    sold:100
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:9.99,
    meGusta:false,
    sold:37
  },
  {
    img:'assets/images/image 65.svg',
    name:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    price:15.99,
    meGusta:false,
    discount:12.99,
    nuevo:true,
    sold:100
  },
]

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  //cards:Product[]=cards

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

 getProducts(){       
   this.products.forEach(product=> {
        const dataCategory=this.categories.find(category=>category.id==product.category)
        const dataBrand= this.brands.find(brand=>brand.id==product.brand)
        const dataPet= this.pets.find(pet=>pet.id==product.pet)
        
       product.nameCategory=dataCategory?.name;
       product.nameBrand=dataBrand?.name;
       product.namePet=dataPet?.name

     });
 } 



  

  //slider
  max = 1000;
  min = 0;
  step = 10;
  thumbLabel = true;
  value = this.max;
  tickInterval = 1;


 //paginador cards
  dataSource:MatTableDataSource<IProductClass> = new MatTableDataSource<IProductClass>(this.products);
  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
    this.obs = this.dataSource.connect();
  }
  


  openNav() {
    document.getElementById("sidenav")!.style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("sidenav")!.style.width = "0";
  }




  
}
