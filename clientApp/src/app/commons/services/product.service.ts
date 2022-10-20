import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { first, map, Observable } from 'rxjs';
import { Product } from '../components/card-product';
import { IProductClass } from '../interfaces/front.interface';
import { CategoryService } from './category.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CardDashboard } from '../components/card-dashboard/card-dashboard';

@Injectable({ providedIn: 'root' })
export class ProductService {
	constructor(public firestore2: AngularFirestore, public firestore: Firestore, private _categoryService: CategoryService) {}

	categories: CardDashboard[] = [];
	pets = [];
	marcas = [];

// 	getProducts(): Observable<IProductClass[]> {
// 		const productsRef = collection(this.firestore, 'products');

// 		this._categoryService.getCategory().subscribe({
// 			next: (data) => {
// 				this.categories = data;
// 			},
// 			complete: () => {
// 				let products: IProductClass[] = [];
// 				// onSnapshot(productsRef, (snap) => {
// 				// 	snap.forEach((snapHijo) =>{
//         //     const nameCategory=this.categories.find(item=>item.id==snapHijo.data().category)
// 				// 		products.push({
// 				// 			id: snapHijo.id,
//         //       nameCategory: nameCategory,
// 				// 			...snapHijo.data()
// 				// 		})
//         //   }
          
// 				// 	);
// 				});

// 			}
// 		});

// 		//     products.forEach(product=>{
// 		//   product.nameCategory=this._categoryService.obtenerCategory(product.category!)[0].name
// 		// })
// 		//   return products

// 		// return this.firestore2.collection('products').snapshotChanges();

// 		return collectionData(productsRef, { idField: 'id' }).pipe(
// 			first(),
// 			map((data) => {
// 				return data;
// 			})
// 		) as Observable<IProductClass[]>;
// 	}
// }


getProds():Observable<IProductClass[]>{
  const productsRef = collection(this.firestore, 'products');
  return collectionData(productsRef,{idField:'id'}).pipe(first()) as Observable<IProductClass[]>
}

getProducts():IProductClass[] {
  let products:IProductClass[]=[]
  this._categoryService.getCategory().subscribe({
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
         console.log(products)
        }
      })

    }
  })
  return products 
}

}