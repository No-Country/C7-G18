import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
	exports: [AngularFireAuthModule, AngularFireStorageModule, AngularFireDatabaseModule]
})
export class FirebaseModule {}