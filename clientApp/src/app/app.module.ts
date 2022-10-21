import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';

import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';
import { FirebaseModule } from './commons/shared/firebase-shared.module';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';


@NgModule({

	declarations: [AppComponent, PageNotfoundComponent  ],
	imports: [
		BrowserModule, 
		AppRoutingModule, 
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideFirestore(()=>getFirestore()),
		provideStorage(() => getStorage())
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
