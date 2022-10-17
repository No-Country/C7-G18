import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  constructor(private _matDialog: MatDialog) { }

  ngOnInit(): void {
  }


  openModalNew(tipo:string, modo:string, nombre?:string) {
		if (screen.width < 500) {
			this._matDialog.open(DialogComponent, {
				maxWidth: '100vw',
				width: '95%',
				maxHeight: '670px',
        data:{
          tipo,
          modo,
          nombre
        }
			});
		} else {
			this._matDialog.open(DialogComponent, {
				width: '500px',
        data:{
          tipo,
          modo,
          nombre
        }
			});
		}
	}

  cards:CardDashboard[]=[
    {
      class:'Marca',
      name:'Purina',
      created:'13/05/2022'
    },
    {
      class:'Marca',
      name:'DogChow',
      created:'13/04/2022'
    },
    {
      class:'Marca',
      name:'CatChow',
      created:'23/05/2022'
    },
    {
      class:'Marca',
      name:'MiMaskot',
      created:'13/11/2021'
    }
  ]

}
