import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CardProduct } from 'src/app/commons/components/card-product';


const cards:CardProduct[]=[
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:19.99,
    meGusta:false,
    vendidos:35
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:true,
    vendidos:5
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    oferta:5.99,
    nuevo:true,
    vendidos:40
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:19.99,
    meGusta:false,
    nuevo:true,
    vendidos:10
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:false,
    oferta:12.99,
    nuevo:true,
    vendidos:1
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    vendidos:15
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    oferta:5.99,
    nuevo:true,
    vendidos:48
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:19.99,
    meGusta:false,
    vendidos:4
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:false,
    oferta:12.99,
    nuevo:true,
    vendidos:100
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    vendidos:37
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:false,
    oferta:12.99,
    nuevo:true,
    vendidos:100
  },
  {
    img:'assets/images/image 17.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    vendidos:37
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:false,
    oferta:12.99,
    nuevo:true,
    vendidos:100
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:9.99,
    meGusta:false,
    vendidos:37
  },
  {
    img:'assets/images/image 65.svg',
    nombre:'MIMASKOT Gato Adulto - Pollo y Carne - 9Kg',
    precio:15.99,
    meGusta:false,
    oferta:12.99,
    nuevo:true,
    vendidos:100
  },
]



@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss']
})
export class StorePageComponent implements OnInit {

  cards:CardProduct[]=cards

  constructor() { }

  ngOnInit(): void {
    
  }

  pet:string='Conejos'
  category:string='Alimentación'
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
  dataSource:MatTableDataSource<CardProduct> = new MatTableDataSource<CardProduct>(this.cards);
  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;    
    this.obs = this.dataSource.connect();
  }
  






  
}
