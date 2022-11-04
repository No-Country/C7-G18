import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../commons/services/product.service';
import { CategoryService } from '../../../commons/services/category.service';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
import { IProductClass } from '../../../commons/interfaces/front.interface';
import { BrandService } from '../../../commons/services/brand.service';
import { PetService } from '../../../commons/services/pet.service';
import { DialogProductComponent } from '../mat-dialogs/dialog-product/dialog-product.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  displayedColumns: string[] = [ 'Nombre', 'Imagen', 'Precio Unitario','Mascota', 'Categoría', 'Fecha','Stock', 'Acciones'];
  
  constructor(
    private _matDialog: MatDialog,
    private _productService:ProductService,
    private _categoryService:CategoryService,
    private _brandService:BrandService,
    private _petService:PetService,
    ){}
   
  pets:CardDashboard[]=[]
  brands:CardDashboard[]=[]
  categories:CardDashboard[]=[]
  products:IProductClass[]=[]

  disabledButton=true

  ngOnInit(): void {
     this._categoryService.getCategory().subscribe(data=>this.categories=data)
    this._brandService.getBrand().subscribe(data=>this.brands=data)
    this._petService.getPet().subscribe(data=>this.pets=data)
    this.getProducts()    
}


  getProducts(){       
    this._productService.getProds().subscribe({
      next:data=>this.products=data,
      complete:()=>{
        this.disabledButton=false
        this.dataSource = new MatTableDataSource<IProductClass>(this.products);
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel="Productos por página";
        this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
      }
    })
        
  }    
  
  dataSource:MatTableDataSource<IProductClass>    
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  

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

  openModal(modo:string, product?:IProductClass) {
		let dialog;
    let data={
        modo:modo,
        categories:this.categories,
        brands:this.brands,
        pets:this.pets,
        product
    }
		if (screen.width < 500) {
			dialog=this._matDialog.open(DialogProductComponent, {
				maxWidth: '100vw',
				width: '95%',
        data:data
			})
		} else {
			dialog=this._matDialog.open(DialogProductComponent, {
				width: '500px',
        data:data
			})
		}
    dialog.afterClosed().subscribe(()=>this.getProducts())
	}

  
}