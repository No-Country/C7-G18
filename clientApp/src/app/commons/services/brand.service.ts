import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
<<<<<<< HEAD
import { IProductClass } from '../interfaces/front.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
=======
>>>>>>> 86141b95e0956bad3829e9b5aca76d18a1554544

@Injectable({
	providedIn: 'root'
})
export class BrandService {
	constructor(public firestore: Firestore) {}

<<<<<<< HEAD
  constructor(public firestore:Firestore,  private firestore2: AngularFirestore) { }
=======
	getBrand(): Observable<CardDashboard[]> {
		const brandsRef = collection(this.firestore, 'brand');
		return collectionData(brandsRef, { idField: 'id' }).pipe(first()) as Observable<CardDashboard[]>;
	}
>>>>>>> 86141b95e0956bad3829e9b5aca76d18a1554544

	addBrand(brand: CardDashboard) {
		const brandRef = collection(this.firestore, 'brand');
		return addDoc(brandRef, brand);
	}

	deleteBrand(id: string) {
		const brandDocRef = doc(this.firestore, `brand/${id}`);
		return deleteDoc(brandDocRef);
	}

<<<<<<< HEAD

  addBrand(brand: CardDashboard) {
    const brandRef = collection(this.firestore, 'brand');
    return addDoc(brandRef, brand);
  }

  deleteBrand(id:string) {
    const brandDocRef = doc(this.firestore, `brand/${id}`);
    return deleteDoc(brandDocRef);
  }

  updateBrand(id:string, data: CardDashboard){
    const brandDocRef = doc(this.firestore, 'brand', id);
    const edit={name:data.name,url:data.url}
    return updateDoc(brandDocRef,edit)
  }

  obtenerBrand():CardDashboard[]{
    const brandsRef=collection(this.firestore,'brand');
    let data:CardDashboard[]=[];
    onSnapshot(brandsRef,(snap=>{
      snap.forEach(snapHijo=>data.push(snapHijo.data()))
    }))
    return data
  } 

  
=======
	updateBrand(id: string, data: CardDashboard) {
		const brandDocRef = doc(this.firestore, 'brand', id);
		const edit = { name: data.name, url: data.url };
		return updateDoc(brandDocRef, edit);
	}
>>>>>>> 86141b95e0956bad3829e9b5aca76d18a1554544
}
