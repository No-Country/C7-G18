import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
import { IProductClass } from '../interfaces/front.interface';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public firestore:Firestore,
              private _afs: AngularFirestore) { }


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
		.then(()=>this.updateProds(id, data.name!))
  }

  updateProds(id:string, name:string){
		let productsCollection = this._afs.collection<IProductClass>('products',ref=>ref.where('brand','==',id))
		const Products:string[] =[];
    	productsCollection.get().forEach(prods=>{
			prods.forEach(prod=>Products.push(prod.id))		
		}).then(()=>{
			for (const id of Products) {
				productsCollection.doc(id).update({nameBrand:name})
			}
		})
	}
  
}