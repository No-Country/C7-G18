import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './store-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; //para usar el router oulet

// modulo alex
import { AccessUserMaterialModule } from '../../components/access-user-material.module';

@NgModule({
    declarations: [StoreLayoutComponent, NavbarComponent, FooterComponent],
    imports: [CommonModule,  RouterModule, AccessUserMaterialModule],
    exports: [StoreLayoutComponent],
})
export class StoreLayoutModule { }
