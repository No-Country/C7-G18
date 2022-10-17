import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from './card-dashboard';
import { SubcategoryPageComponent } from '../../../pages/dashboard/subcategory-page/subcategory-page.component';
import { DialogComponent } from 'src/app/pages/dashboard/dialog/dialog.component';

@Component({
  selector: 'app-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDashboardComponent implements OnInit {

  @Input() cardDashboard!:CardDashboard

  constructor(private _matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openModalSubcategories() {
		if (screen.width < 500) {
			this._matDialog.open(SubcategoryPageComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
        data:this.cardDashboard
			});
		} else {
			this._matDialog.open(SubcategoryPageComponent, {
				width: '500px',
        data:this.cardDashboard
			});
		}
	}


	openModalNew( modo:string) {
		if (screen.width < 500) {
			this._matDialog.open(DialogComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
        data:{
          tipo:this.cardDashboard.class,
          modo,
          nombre:this.cardDashboard.name
        }
			});
		} else {
			this._matDialog.open(DialogComponent, {
				width: '500px',
        data:{
			tipo:this.cardDashboard.class,
			modo,
			nombre:this.cardDashboard.name
        }
			});
		}
	}


}
