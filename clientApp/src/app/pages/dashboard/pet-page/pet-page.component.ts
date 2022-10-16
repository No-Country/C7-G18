import { Component, OnInit } from '@angular/core';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss']
})
export class PetPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  cards:CardDashboard[]=[
    {
      class:'Pet',
      name:'Gatos',
      created:'13/05/2022',
      default:true
    },
    {
      class:'Pet',
      name:'Perros',
      created:'13/04/2022',
      default:true
    },
    {
      class:'Pet',
      name:'Aves',
      created:'23/05/2022'
    },
    {
      class:'Pet',
      name:'Peces',
      created:'13/11/2021'
    },
    {
      class:'Pet',
      name:'Conejos',
      created:'13/11/2021'
    }
  ]
}
