import { Component, OnInit } from '@angular/core';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }


  cards:CardDashboard[]=[
    {
      class:'Category',
      name:'Alimentación',
      created:'13/05/2022',
      subcategories:['Secos', 'Semi-húmedos','Enlatados'],
      default:true
    },
    {
      class:'Category',
      name:'Farmacia',
      created:'13/04/2022',
      default:true
    },
    {
      class:'Category',
      name:'Higiene',
      created:'23/05/2022'
    },
    {
      class:'Category',
      name:'Muebles',
      created:'13/11/2021'
    }
  ]
}
