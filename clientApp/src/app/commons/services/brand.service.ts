import { Injectable } from '@angular/core';
import { Firestore , collection, collectionData} from '@angular/fire/firestore';
import { first, Observable } from 'rxjs';
import { IBrand } from '../interfaces/front.interface';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public firestore:Firestore) { }


  getBrand():Observable<IBrand[]>{
    const brandsRef=collection(this.firestore,'brand');
    return collectionData(brandsRef,{idField:'id'}).pipe(first()) as Observable<IBrand[]>
  }

}
