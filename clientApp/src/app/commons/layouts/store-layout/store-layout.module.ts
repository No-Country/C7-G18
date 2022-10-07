import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './store-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; //para usar el router oulet
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [StoreLayoutComponent, NavbarComponent, FooterComponent],
    imports: [CommonModule,  RouterModule, MatButtonModule, MatMenuModule],
    exports: [StoreLayoutComponent],
})
export class StoreLayoutModule { }
