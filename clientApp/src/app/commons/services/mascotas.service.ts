import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';

@Injectable({
	providedIn: 'root'
})
export class MascotasService {
	constructor(public firestore: Firestore) {}

	getPet(): Observable<CardDashboard[]> {
		const mascotaRef = collection(this.firestore, 'pet');
		return collectionData(mascotaRef, { idField: 'id' }).pipe(first()) as Observable<CardDashboard[]>;
	}

	addPet(brand: CardDashboard) {
		const mascotaRef = collection(this.firestore, 'pet');
		return addDoc(mascotaRef, brand);
	}

	deletePet(id: string) {
		const mascotaDocRef = doc(this.firestore, `pet/${id}`);
		return deleteDoc(mascotaDocRef);
	}

	updatePet(id: string, data: CardDashboard) {
		const mascotaDocRef = doc(this.firestore, 'pet', id);
		const edit = { name: data.name };
		return updateDoc(mascotaDocRef, edit);
	}
}
