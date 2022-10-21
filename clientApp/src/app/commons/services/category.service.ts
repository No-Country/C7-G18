import { Injectable } from '@angular/core';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public firestore:Firestore) { }


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
  }

  
}
