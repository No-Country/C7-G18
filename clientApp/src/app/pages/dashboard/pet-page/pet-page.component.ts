import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup } from '@angular/forms';
import { MascotasService } from 'src/app/commons/services/mascotas.service';
import { Mascotas } from 'src/app/commons/interfaces/mascotas.interface';
import { DialogPetComponent } from '../mat-dialogs/dialog-pet/dialog-pet.component';

@Component({
	selector: 'app-pet-page',
	templateUrl: './pet-page.component.html',
	styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {
	
  mascotas:Mascotas[];

	constructor(private _matDialog: MatDialog, private _mascotaseService: MascotasService) {}

  /* ejecutamos en el onInit el servicio para traer  datos des la base de datos.*/
	ngOnInit(): void {
    this._mascotaseService.getMascotas().subscribe(mascotas => {
      
      this.mascotas = mascotas;
      console.log(mascotas);
    })


  }

	openModalNew(tipo: string, modo: string, nombre?: string) {
		if (screen.width < 500) {
			this._matDialog.open(DialogPetComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
				data: {
					tipo,
					modo,
					nombre
				}
			});
		} else {
			this._matDialog.open(DialogPetComponent, {
				width: '500px',
				data: {
					tipo,
					modo,
					nombre
				}
			});
		}
	}

	cards: CardDashboard[] = [
		// {
		//   class:'Mascota',
		//   name:'Gatos',
		//   created:'13/05/2022',
		//   default:true
		// },
		// {
		//   class:'Mascota',
		//   name:'Perros',
		//   created:'13/04/2022',
		//   default:true
		// },
		// {
		//   class:'Mascota',
		//   name:'Aves',
		//   created:'23/05/2022'
		// },
		// {
		//   class:'Mascota',
		//   name:'Peces',
		//   created:'13/11/2021'
		// },
		// {
		//   class:'Mascota',
		//   name:'Conejos',
		//   created:'13/11/2021'
		// }
	];





}
