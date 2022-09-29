import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/store/store.module').then((m) => m.StoreModule)
	},
	{
		path: '**',
		component: PageNotfoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
