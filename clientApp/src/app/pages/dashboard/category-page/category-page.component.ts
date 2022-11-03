import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
import { DialogCategoryComponent } from '../mat-dialogs/dialog-category/dialog-category.component';
import { CategoryService } from '../../../commons/services/category.service';
import { SubcategoryPageComponent } from '../mat-dialogs/dialog-subcategory/subcategory-page.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  clase='Categoría'
  categories:CardDashboard[]=[]

  constructor(
        private _matDialog: MatDialog,
        private _categoryService:CategoryService
    ) { }

  ngOnInit(): void {
    this.listarCategorias()
  }

  listarCategorias(){
    this._categoryService.getCategory().subscribe({
    next:categories=>this.categories=categories,
    complete:()=>{
      this.dataSource = new MatTableDataSource<CardDashboard>(this.categories);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel="Productos por página";
      this.obs = this.dataSource.connect();
      console.log(this.categories);
      
    }
  })}

  openModalNew(modo:string, category?:CardDashboard) {
		let dialog;
    let data={
        modo:modo,
        id:category?.id,
        nombre:category?.name
    }
		if (screen.width < 500) {
			dialog=this._matDialog.open(DialogCategoryComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
        data:data
			})
		} else {
			dialog=this._matDialog.open(DialogCategoryComponent, {
				width: '500px',
        data:data
			})
		}
    dialog.afterClosed().subscribe(()=>this.listarCategorias())
	}




  openModalSubcategories(cat:CardDashboard) {
    let dialog;
		if (screen.width < 500) {
			dialog=this._matDialog.open(SubcategoryPageComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
				data: cat
			});
		} else {
			dialog=this._matDialog.open(SubcategoryPageComponent, {
				width: '500px',
				data: cat
			});
		}
    dialog.afterClosed().subscribe(()=>this.listarCategorias())
	}


	@ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
	dataSource:MatTableDataSource<CardDashboard>
	obs: Observable<any>;

}
