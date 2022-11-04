import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { BrandService } from '../../../commons/services/brand.service';
import { DialogBrandComponent } from '../mat-dialogs/dialog-brand/dialog-brand.component';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  brands:CardDashboard[]=[]
  clase='Marca'

  databrand:CardDashboard[]
  disabledButton=true

  constructor(
        private _matDialog: MatDialog,
        private brandService:BrandService
    ) { }

  ngOnInit(): void {
    this.listBrands()
  }

  listBrands(){this.brandService.getBrand().subscribe({
    next:brands=>this.brands=brands,
    complete:()=>{
      this.disabledButton=false
      this.dataSource = new MatTableDataSource<CardDashboard>(this.brands);
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel="Productos por página";
      this.obs = this.dataSource.connect();
    }
  })}


  openModalNew(modo:string, brand?:CardDashboard) {
    let dialog;
    let data={
        modo:modo,
        id:brand?.id,
        nombre:brand?.name,
        url:brand?.url
    }
		if (screen.width < 500) {
			dialog=this._matDialog.open(DialogBrandComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
        data:data
			})
		} else {
			dialog=this._matDialog.open(DialogBrandComponent, {
				width: '500px',
        data:data
			})
		}
    dialog.afterClosed().subscribe(()=>this.listBrands())
	}
  
  
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  dataSource:MatTableDataSource<CardDashboard>
  obs: Observable<any>;

  
}