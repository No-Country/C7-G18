import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreLayoutComponent } from '../../commons/layouts/store-layout/store-layout.component';

//import { PATHS_STORE_PAGES } from './../../commons/config/path-pages';


const routes: Routes = [
	{
		path: '',
		component: StoreLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./home-page/home.module').then((m) => m.HomeModule)
			},
			{
				path: 'store',
				loadChildren: () => import('./store-page/store-page.module').then((m) => m.StoreModule)
			},
			{
				path: 'buy',
				loadChildren: () => import('./buy-page/buy-page.module').then((m) => m.BuyModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StoreRoutingModule {}
