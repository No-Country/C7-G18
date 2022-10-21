import { Injectable } from '@angular/core';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(public firestore:Firestore) { }

  
  getSubcategory(idCategory:string):Observable<CardDashboard[]>{
    const subcategoryRef=collection(this.firestore,'category', idCategory, 'subcategory')
    return collectionData(subcategoryRef,{idField:'id'}).pipe(first()) as Observable<CardDashboard[]>
  }

  addSubcategory(subcategory: CardDashboard,idCategory:string) {
    const subcategoryRef=collection(this.firestore,'category', idCategory, 'subcategory')
    return addDoc(subcategoryRef, subcategory);
  }

  deleteSubcategory(idCategory:string,idSub:string) {
    const subcategoryDocRef = doc(this.firestore,'category',idCategory, `subcategory/${idSub}`);
    return deleteDoc(subcategoryDocRef);
  }

  updateSubcategory(idCategory:string,idSub:string, data: CardDashboard){
    const subcategoryDocRef = doc(this.firestore, 'category', idCategory,'subcategory',idSub);
    const edit={name:data.name}
    return updateDoc(subcategoryDocRef,edit)
  }


}
