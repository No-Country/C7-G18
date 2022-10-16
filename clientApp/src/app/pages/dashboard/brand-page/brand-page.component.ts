import { Component, OnInit } from '@angular/core';
import { CardDashboard } from 'src/app/commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-brand-page',
  templateUrl: './brand-page.component.html',
  styleUrls: ['./brand-page.component.scss']
})
export class BrandPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cards:CardDashboard[]=[
    {
      class:'Brand',
      name:'Purina',
      created:'13/05/2022'
    },
    {
      class:'Brand',
      name:'DogChow',
      created:'13/04/2022'
    },
    {
      class:'Brand',
      name:'CatChow',
      created:'23/05/2022'
    },
    {
      class:'Brand',
      name:'MiMaskot',
      created:'13/11/2021'
    }
  ]

}
