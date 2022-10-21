import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { PetService } from 'src/app/commons/services/pet.service';
import { DialogPetComponent } from '../mat-dialogs/dialog-pet/dialog-pet.component';

@Component({
	selector: 'app-pet-page',
	templateUrl: './pet-page.component.html',
	styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {
	mascotas: CardDashboard[];
	clase = 'Mascota';

	constructor(private _matDialog: MatDialog, private mascotasService: PetService) {}

	ngOnInit(): void {
		this.listPet();
	}

	listPet() {
		this.mascotasService.getPet().subscribe((mascotas) => (this.mascotas = mascotas));
		console.log(this.mascotas);
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
}
