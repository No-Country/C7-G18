import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
import { IProductClass } from '../interfaces/front.interface';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public firestore:Firestore,
              private _afs: AngularFirestore) { }


  getCategory():Observable<CardDashboard[]>{
    const categorysRef=collection(this.firestore,'category');
    return collectionData(categorysRef,{idField:'id'}).pipe(first()) as Observable<CardDashboard[]>
  }  

  


  addCategory(category: CardDashboard) {
    const categoryRef = collection(this.firestore, 'category');
    return addDoc(categoryRef, category);
  }

  deleteCategory(id:string) {
    const categoryDocRef = doc(this.firestore, `category/${id}`);
    return deleteDoc(categoryDocRef);
  }

  updateCategory(id:string, data: CardDashboard){
    const categoryDocRef = doc(this.firestore, 'category', id);
    const edit={name:data.name}
    return updateDoc(categoryDocRef,edit)
    .then(()=>this.updateProds(id, data.name!))
  }

  updateProds(id:string, name:string){
		let productsCollection = this._afs.collection<IProductClass>('products',ref=>ref.where('category','==',id))
		const Products:string[] =[];
    	productsCollection.get().forEach(prods=>{
			prods.forEach(prod=>Products.push(prod.id))		
		}).then(()=>{
			for (const id of Products) {
				productsCollection.doc(id).update({nameCategory:name})
			}
		})
	}
}
