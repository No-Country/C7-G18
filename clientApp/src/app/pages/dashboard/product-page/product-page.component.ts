import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class ProductPageComponent implements OnInit, AfterViewInit {
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

  ngOnInit(): void {
     this._categoryService.getCategory().subscribe({
       next: data=>this.categories=data,
       complete:()=>{}})
    this._brandService.getBrand().subscribe({
      next: data=>this.brands=data,
      complete:()=>console.log('brands')})
    this._petService.getPet().subscribe({
      next: data=>this.pets=data,
      complete:()=>console.log('pets')})

    this._productService.getProds().subscribe({
      next:data=>this.products=data,
      complete:()=>this.getProducts()
    })
    
}


dataSource:MatTableDataSource<IProductClass>



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
        this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
  }
    
    
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  
  ngAfterViewInit() {
    
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