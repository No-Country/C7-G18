import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { MascotasService } from 'src/app/commons/services/mascotas.service';
import { DialogPetComponent } from '../mat-dialogs/dialog-pet/dialog-pet.component';

@Component({
	selector: 'app-pet-page',
	templateUrl: './pet-page.component.html',
	styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {
	pets: CardDashboard[];
	clase = 'Mascota';

	constructor(private _matDialog: MatDialog, private mascotasService: MascotasService) {}

	ngOnInit(): void {
		this.listPet();
	}

	listPet() {
		this.mascotasService.getPet().subscribe({
			next:pets=>this.pets=pets,
			complete:()=>{
			  this.dataSource = new MatTableDataSource<CardDashboard>(this.pets);
			  this.dataSource.paginator = this.paginator;
			  this.paginator._intl.itemsPerPageLabel="Productos por página";
			  this.obs = this.dataSource.connect();
			}
		  });
	}

	openModalNew(modo: string, mascota?: CardDashboard) {
		let dialog;
		let data = {
			modo: modo,
			id: mascota?.id,
			nombre: mascota?.name,
			url: mascota?.url
		};
		if (screen.width < 500) {
			dialog = this._matDialog.open(DialogPetComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
				data: data
			});
		} else {
			dialog = this._matDialog.open(DialogPetComponent, {
				width: '500px',
				data: data
			});
		}
		dialog.afterClosed().subscribe(() => this.listPet());
	}

	@ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  dataSource:MatTableDataSource<CardDashboard>
  obs: Observable<any>;
}
