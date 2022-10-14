import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/commons/components/card-product';


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

  cards:Product[]=cards

  constructor() { }

  ngOnInit(): void {
    
  }

  pet:string='Conejos'
  category:string|null='Alimentación'
  subcategory:string|null=null


  pets:string[]=['Gatos','Peros', 'Aves', 'Peces','Conejos']
  categories:string[]=['Todos', 'Alimentación', 'Accesorios', 'Higiene', 'Farmacia', 'Caniles', 'Juguetes', 'Ropa']
  subcategories:string[]=[]
  marcas:string[]=['Todos','Brefar','Brit Care','Dog Chow','Mirrapel','Pro Plan','Vet Life']


  //slider
  max = 1000;
  min = 0;
  step = 10;
  thumbLabel = true;
  value = this.max;
  tickInterval = 1;


 //paginador cards
  dataSource:MatTableDataSource<Product> = new MatTableDataSource<Product>(this.cards);
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
