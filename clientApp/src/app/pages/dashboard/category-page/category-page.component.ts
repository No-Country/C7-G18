import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {



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
      class:'Categoría',
      name:'Alimentación',
      created:'13/05/2022',
      subcategories:['Secos', 'Semi-húmedos','Enlatados'],
      default:true
    },
    {
      class:'Categoría',
      name:'Farmacia',
      created:'13/04/2022',
      default:true
    },
    {
      class:'Categoría',
      name:'Higiene',
      created:'23/05/2022'
    },
    {
      class:'Categoría',
      name:'Muebles',
      created:'13/11/2021'
    }
  ]
}
