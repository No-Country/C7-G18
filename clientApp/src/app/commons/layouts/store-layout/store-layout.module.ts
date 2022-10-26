import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLayoutComponent } from './store-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; //para usar el router oulet
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { SingUpModule } from '../../components/sing-up/sing-up.module';
import { LoginModule } from '../../components/login/login.module';
import { ResetPassModule } from '../../components/reset-pass/reset-pass.module';
import { ContactoModule } from '../../components/contacto/contacto.module'; 
import { ShoppingCartModule } from '../../components/shopping-cart/shopping-cart.module';
import { AccountModule } from '../../components/account/account.module';


@NgModule({
    declarations: [StoreLayoutComponent, NavbarComponent, FooterComponent],
    imports: [
        CommonModule,  
        RouterModule, 
        MatButtonModule,
         MatMenuModule, 
         MatExpansionModule, 
         SingUpModule, 
         LoginModule, 
         ResetPassModule, 
         ContactoModule,
         ShoppingCartModule,
        AccountModule],
    exports: [StoreLayoutComponent],
})
export class StoreLayoutModule { }
