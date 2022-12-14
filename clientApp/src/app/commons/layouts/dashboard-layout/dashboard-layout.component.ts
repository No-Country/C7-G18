import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';




@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

 

  constructor(private _router: Router) {
	
  }

  ngOnInit(): void {
	
  }

  isExpanded = false;
	indexPrevious = 0;
	//{ title: 'Pedidos', active: false, icon: 'storefront', link: '/admin/order' },
	objMenu = [
		{ title: 'Productos', active: false, icon: 'inventory_2', link:'/admin' },
		{ title: 'Mascotas', active: false, icon: 'pets', link: '/admin/pet' },
		{ title: 'Categorías', active: false, icon: 'widgets', link: '/admin/category' },
		{ title: 'Marcas', active: false, icon: 'content_paste', link: '/admin/brand' },
		{ title: 'Cuenta', active: false, icon: 'account_circle', link: '/admin/login' },
		{ title: 'Salir', active: false, icon: 'logout', link: '/' }
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
