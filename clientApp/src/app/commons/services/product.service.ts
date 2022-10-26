import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first, Observable} from 'rxjs';
import { IProductClass } from '../interfaces/front.interface';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';




@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(public firestore2: AngularFirestore, 
              public firestore: Firestore) {}



getProds():Observable<IProductClass[]>{
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef,{idField:'id'}).pipe(first()) as Observable<IProductClass[]>
}

addProds(prod: CardDashboard) {
  const productsRef = collection(this.firestore, 'products');
  return addDoc(productsRef, prod);
}

deleteProds(id:string) {
  const productsDocRef = doc(this.firestore, `products/${id}`);
  return deleteDoc(productsDocRef);
}

updateProds(id:string, data: IProductClass){
  const productsDocRef = doc(this.firestore, 'products', id);
  const edit={
    name:data.name,
    category: data.category,
    subcategory: data.subcategory,
    pet: data.pet,
    brand: data.brand,
    stock: data.stock,
    price: data.price,
    description: data.description,
    img:data.img,
    discount: data.discount,}
  return updateDoc(productsDocRef,edit)
}

}