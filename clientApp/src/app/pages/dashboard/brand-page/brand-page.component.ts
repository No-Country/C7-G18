import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { BrandService } from '../../../commons/services/brand.service';
import { DialogBrandComponent } from '../mat-dialogs/dialog-brand/dialog-brand.component';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  brands:CardDashboard[]
  clase='Marca'

  databrand:CardDashboard[]

  constructor(
        private _matDialog: MatDialog,
        private brandService:BrandService
    ) { }

  ngOnInit(): void {
    this.listBrands()
  }

  listBrands(){this.brandService.getBrand().subscribe(brands=>this.brands=brands)}


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

  
  

}
