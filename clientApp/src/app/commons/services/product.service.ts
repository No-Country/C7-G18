import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first, Observable} from 'rxjs';
import { IProductClass } from '../interfaces/front.interface';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';
import { of } from "rxjs";




@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(public firestore2: AngularFirestore, public firestore: Firestore) {}



getProds():Observable<IProductClass[]>{
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef,{idField:'id'}).pipe(first()) as Observable<IProductClass[]>
}

<<<<<<< HEAD
getProducts():Observable<IProductClass[]> {
  let products:IProductClass[]=[]
  const data=this._categoryService.getCategory()
  .pipe().
  subscribe({
    next: (data) => {
      this.categories = data;
      console.log(this.categories)
    },
    complete: () =>{
      this.getProds().subscribe({
        next: data=>{
          products=data
          console.log(products)
        },
        complete: ()=>{
          products.forEach(product=> {
            const dataCategory=this.categories.find(category=>category.id==product.category)
           product.nameCategory=dataCategory?.name
         })
        }
      }
      )
    },
  })
  return of(products)
=======
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
    img:data.img,}
  return updateDoc(productsDocRef,edit)
>>>>>>> 86141b95e0956bad3829e9b5aca76d18a1554544
}

}