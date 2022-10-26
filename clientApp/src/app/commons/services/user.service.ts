import { Injectable } from '@angular/core';
import { Firestore , collection, addDoc, updateDoc, doc, docData} from '@angular/fire/firestore';
import { Iuser } from '../components/account/user.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, first } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public firestore:Firestore,
    public afs: AngularFirestore
    ) { }

  getUser(id:string):Observable<Iuser>{
    const userRef=doc(this.firestore,'usuarios',id)
    return docData(userRef,{idField: 'id'}).pipe(first())
  }

  addUser(id:string,user: Iuser) {
    return this.afs.collection('usuarios').doc(id).set(user)
  }

  updateUser(id:string, user: Iuser){
    const userDocRef = doc(this.firestore, 'usuarios', id);
    const edit={
      name: user.name,
      dni:user.dni,
      phone:user.phone,
      address:user.address,
      reference:user.reference,
      photo:user.photo
    }
    return updateDoc(userDocRef,edit)
  }

}