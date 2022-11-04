import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
import { IProductClass } from '../interfaces/front.interface';

@Injectable({
	providedIn: 'root'
})
export class PetService {
	constructor(public firestore: Firestore,
				private _afs: AngularFirestore) {}

	getPet(): Observable<CardDashboard[]> {
		const mascotaRef = collection(this.firestore, 'pet');
		return collectionData(mascotaRef, { idField: 'id' }).pipe(first()) as Observable<CardDashboard[]>;
	}

	addPet(pet: CardDashboard) {
		const mascotaRef = collection(this.firestore, 'pet');
		return addDoc(mascotaRef, pet);
	}

	deletePet(id: string) {
		const mascotaDocRef = doc(this.firestore, `pet/${id}`);
		return deleteDoc(mascotaDocRef);
	}

	updatePet(id: string, data: CardDashboard) {
		const mascotaDocRef = doc(this.firestore, 'pet', id);
		const edit = { name: data.name };
		return updateDoc(mascotaDocRef, edit)
		.then(()=>this.updateProds(id, data.name!))
	}

	updateProds(id:string, name:string){
		let productsCollection = this._afs.collection<IProductClass>('products',ref=>ref.where('pet','==',id))
		const Products:string[] =[];
    	productsCollection.get().forEach(prods=>{
			prods.forEach(prod=>Products.push(prod.id))		
		}).then(()=>{
			for (const id of Products) {
				productsCollection.doc(id).update({namePet:name})
			}
		})
	}
	
}