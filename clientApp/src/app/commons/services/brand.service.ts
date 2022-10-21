import { Injectable } from '@angular/core';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
import { IProductClass } from '../interfaces/front.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public firestore:Firestore,  private firestore2: AngularFirestore) { }


  getBrand():Observable<CardDashboard[]>{
    const brandsRef=collection(this.firestore,'brand');
    return collectionData(brandsRef,{idField:'id'}).pipe(first()) as Observable<CardDashboard[]>
  }


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

 /* getDataProducts(): Observable<IProductClass[]> {
    return collectionData(collection(this.firestore, 'productos' ), { idField: 'id' }) as Observable<IProductClass[]>
  }

  getprueba(): Observable<IProductClass[]>{
    return this.firestore2.collection('productos').valueChanges({ idField: 'id', ref: 'category' }) as Observable<IProductClass[]>;
  }*/


}
