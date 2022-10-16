import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from './card-dashboard';
import { SubcategoryPageComponent } from '../../../pages/dashboard/subcategory-page/subcategory-page.component';

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
				height: '350px',
        data:this.cardDashboard
			});
		}
	}


}
