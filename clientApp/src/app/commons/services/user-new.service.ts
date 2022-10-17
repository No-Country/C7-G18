import { Injectable } from '@angular/core';
import { Firestore,addDoc, collection } from '@angular/fire/firestore/';


@Injectable({
	providedIn: 'root'
})
export class UserNewService {
	constructor(private _firestore: Firestore) {}

	addUser(userNew: UserNewService) {
		const user = collection(this._firestore, 'UserNewService');
		return addDoc(user, UserNewService);
	}
}
