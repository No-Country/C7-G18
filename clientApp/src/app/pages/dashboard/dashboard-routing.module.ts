import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '../../commons/layouts/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
	{
		path: '',
		component: DashboardLayoutComponent,
		children: [
			{
				path: 'products',
				loadChildren: () => import('./product-page/product-page.module').then((m) => m.ProductModule)
			},
            {
                path:'brand',
                loadChildren: () => import('./brand-page/brand-page.module').then((m) => m.BrandModule)
            },
            {
                path:'category',
                loadChildren: () => import('./category-page/category-page.module').then((m) => m.CategoryModule)
            },
            {
                path:'order',
                loadChildren: () => import('./order-page/order-page.module').then((m) => m.OrderModule)
            },
            {
                path:'pet',
                loadChildren: () => import('./pet-page/pet-page.module').then((m) => m.PetModule)
            },
            {
                path:'subcategory',
                loadChildren: () => import('./subcategory-page/subcategory-page.module').then((m) => m.SubcategoryModule)
            },
            {
                path:'',
                loadChildren: () => import('./login-page/login-page.module').then((m) => m.LoginPageModule)
            }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}