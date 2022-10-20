import { Injectable } from '@angular/core';
import { Firestore , collection, collectionData, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(public firestore:Firestore) { }


  addSubcategory(id:string, data: string){
    const categoryDocRef = doc(this.firestore, 'category', id);
    return updateDoc(categoryDocRef, {
        subcategories:arrayUnion(data)
    });
  }

  deleteSubcategory(id:string, data: string){
    const categoryDocRef = doc(this.firestore, 'category', id);
    return updateDoc(categoryDocRef, {
        subcategories:arrayRemove(data)
    });
  }

  editSubcategory(id:string, data1: string, data2:string){
    const categoryDocRef = doc(this.firestore, 'category', id);
    updateDoc(categoryDocRef,{subcategories:arrayRemove(data1)})
    return updateDoc(categoryDocRef,{subcategories:arrayUnion(data2)});
  }


}
