import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormSharedModule } from '../../../commons/shared/form-shared.module';
import { HomePageComponent } from './home-page.component';
import { BannerComponent } from './component/banner/banner.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { BannerPrincipalComponent } from './component/banner-principal/banner-principal.component';
import { MarcasComponent } from './component/marcas/marcas.component';
import { CardProductModule } from 'src/app/commons/components/card-product/card-product.module';
import { NgxWrapperTinySliderModule } from 'ngx-wrapper-tiny-slider';

export const routes: Routes = [{ path: '', component: HomePageComponent }];
//el FormSharedModule ya tiene los buttons, el check, inputs, y bueno lo necesario, por lo que 
//ya no es necesario importar uno por uno en este modulo
@NgModule({
    declarations: [HomePageComponent, BannerComponent, CategoriasComponent, BannerPrincipalComponent, MarcasComponent],
    imports: [RouterModule.forChild(routes), FormSharedModule, CardProductModule, NgxWrapperTinySliderModule]
})
export class HomeModule { }

