import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { FirebaseModule } from './commons/shared/firebase-shared.module';



@NgModule({

	declarations: [AppComponent, PageNotfoundComponent  ],
	imports: [
		BrowserModule, 
		AppRoutingModule, 
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		FirebaseModule,
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
