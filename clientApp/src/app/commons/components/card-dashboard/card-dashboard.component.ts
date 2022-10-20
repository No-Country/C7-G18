import { Component, Input, OnInit, Output, ViewEncapsulation,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from './card-dashboard';
import { SubcategoryPageComponent } from '../../../pages/dashboard/subcategory-page/subcategory-page.component';


@Component({
	selector: 'app-card-dashboard',
	templateUrl: './card-dashboard.component.html',
	styleUrls: ['./card-dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CardDashboardComponent implements OnInit {
	@Input() cardDashboard!: CardDashboard;
	@Input() clase: string;

	@Output() onEdit:EventEmitter<any>=new EventEmitter()
	@Output() onDelete:EventEmitter<any>=new EventEmitter()

	constructor(private _matDialog: MatDialog) {}

	ngOnInit(): void {}

	edit(){
		this.onEdit.emit()
	}

	delete(){
		this.onDelete.emit()
	}



	openModalSubcategories() {
		if (screen.width < 500) {
			this._matDialog.open(SubcategoryPageComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
				data: this.cardDashboard
			});
		} else {
			this._matDialog.open(SubcategoryPageComponent, {
				width: '500px',
				data: this.cardDashboard
			});
		}
	}




}
