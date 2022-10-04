import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { HomePageComponent } from './home-page.component';
import { CardProductComponent } from '../../../commons/components/card-product/card-product.component';
import { BannerComponent } from './component/banner/banner.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { BannerPrincipalComponent } from './component/banner-principal/banner-principal.component';
import { MarcasComponent } from './component/marcas/marcas.component';

export const routes: Routes = [{ path: '', component: HomePageComponent }];
//el FormSharedModule ya tiene los buttons, el check, inputs, y bueno lo necesario, por lo que 
//ya no es necesario importar uno por uno en este modulo
@NgModule({
    declarations: [HomePageComponent, CardProductComponent, BannerComponent, CategoriasComponent, BannerPrincipalComponent, MarcasComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule]
})
export class HomeModule { }

