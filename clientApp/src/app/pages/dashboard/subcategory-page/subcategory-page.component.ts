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

  remove(sub: string): void {
    const index = this.product.subcategories!.indexOf(sub);

    if (index >= 0) {
      this.product.subcategories!.splice(index, 1);
    }
  }



}
