import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductTable } from './product';
import { ProductService } from '../../../commons/services/product.service';
import { CategoryService } from '../../../commons/services/category.service';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
import { IProductClass } from '../../../commons/interfaces/front.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'Nombre', 'Imagen', 'Precio Unitario','Mascota', 'Categoría', 'Subcategoría', 'Fecha','Acciones'];
  
  constructor(
    private _productService:ProductService,
    private _categoryService:CategoryService
    ){}

  categories:CardDashboard[]=[]
  products:IProductClass[]=[]

  ngOnInit(): void {
        // this._categoryService.getCategory().subscribe({
    //   next:response=>{this.categories=response; console.log(response, 'categorías')},
    
    //   complete:()=> this.getProducts()
    // })   
    this._productService.getProducts().subscribe({
      next:response=>{console.log(response, 'vell')}
    })
      //   complete:()=> this.getProducts()
      // })
}

  getProducts(){  

   //console.log(this._productService.getProducts())
    // this._productService.getProducts().subscribe({
    //   next:response=>{
    //     console.log(response, 'original')
    //     response.forEach(product => {
    //       const dataCategory=this.categories.find(category=>category.id==product.category)
    //       product.dataCategory=dataCategory
    //     })
    //     console.log(response, 'data productos');
    //   },
    // })
  }

  
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Productos por página";
    this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
  }


  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Productos`;  // customize this line
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length 
      ? Math.min(startIndex + pageSize, length) 
      : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} a ${endIndex} de ${length}`; // customize this line
  };



  table:ProductTable[]=[
    {
      id:1,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    },
    {
      id:2,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    },
    {
      id:3,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    },
    {
      id:1,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    },
    {
      id:2,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    },
    {
      id:3,
      name:'Purina gato adulto',
      price:500,
      img:'assets/images/image 17.svg',
      pet:'Gato',
      category:'Alimentación',
      subcategory:'Secos',
      created:'15/06/2022'
    }
  ]


  dataSource = new MatTableDataSource<ProductTable>(this.table);
}
