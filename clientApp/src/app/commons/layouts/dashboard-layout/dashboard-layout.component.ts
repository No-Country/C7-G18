import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  isExpanded = false;
	indexPrevious = 0;
	objMenu = [
		{ title: 'Productos', active: true, icon: 'inventory_2', link:'/admin/products' },
		{ title: 'Pedidos', active: false, icon: 'storefront', link: '/admin/order' },
		{ title: 'Mascotas', active: false, icon: 'pets', link: '/admin/pet' }
	];


  toggleActive(index: number): void {
		const itemMenuActual = this.objMenu[index];

		this.objMenu[this.indexPrevious].active = false;
		itemMenuActual.active = true;
		this.indexPrevious = index;

		switch (itemMenuActual.link) {
			case '':
				console.log('salir')
				break;
			default:
				this._router.navigateByUrl(itemMenuActual.link);
		}
	}
}
