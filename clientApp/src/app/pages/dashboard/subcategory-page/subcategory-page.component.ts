import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardDashboard } from '../../../commons/components/card-dashboard/card-dashboard';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss']
})
export class SubcategoryPageComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public product: CardDashboard
  ) { }

  ngOnInit(): void {
  }

  modeAdd=false
  modeEdit=false
  modeDelete=false

  thisSub:string

  add(){this.modeAdd=!this.modeAdd}
  edit(s:string){
    this.modeEdit=!this.modeEdit;
    this.thisSub=s
  }
  delete(s:string){
    this.modeDelete=!this.modeDelete;
    this.thisSub=s
  }

}
