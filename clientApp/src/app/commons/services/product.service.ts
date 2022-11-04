import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first,  Observable} from 'rxjs';
import { IProductClass } from '../interfaces/front.interface';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';




@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(public afs: AngularFirestore, 
              public firestore: Firestore) { }


getProds():Observable<IProductClass[]>{
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef,{idField:'id'}).pipe(first()) as Observable<IProductClass[]>
}

addProds(prod: IProductClass) {
  const productsRef = collection(this.firestore, 'products');
  return addDoc(productsRef, prod);
}

deleteProds(id:string) {
  const productsDocRef = doc(this.firestore, `products/${id}`);
  return deleteDoc(productsDocRef);
}

updateProds(id:string, data: IProductClass){
  const productsDocRef = doc(this.firestore, 'products', id);
  const {name, category, subcategory, pet, brand, stock, price, description,
    discount, percent, img, nameBrand, nameCategory, namePet, nameSubcategory } = data
  const edit={name, category, subcategory, pet, brand, stock, price, description,
    discount, percent, img, nameBrand, nameCategory, namePet, nameSubcategory}
  return updateDoc(productsDocRef,edit)
} 

}