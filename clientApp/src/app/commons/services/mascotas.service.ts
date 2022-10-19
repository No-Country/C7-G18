import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mascotas } from '../interfaces/mascotas.interface';



@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  constructor(private fireStore: Firestore ) { }

  /* metodo que agrega las mascotas le pasamos como paramatro nuestra interface
   los datos de esta nueva mascota los integramos en nuestro Firestosre y asi
   guardarlos en nuestra base de datos,
   
   mascotaRef creamos una referencia a la BD, y accedemos a nuestras colecciones a travez del metodo
   collection(), a esrte metodo  debemos pasale como primer parametro  "Firestore" y como segundo parametro
   debemos pasrle el nombre de la colecccion en este caso "pet".

   luego vamos a retortornar  la llamada a el metodo "addDoc()" el cual sirve para insertar documentos en la collection
  le pasamos como primer parametro la referencia a la coleccion en este caso "mascotaRef" 
  y como segundo parametro, que es lo que vamos a insertar en dicha coleccion en este caso es.
  "mascota que es lo que recibimos por parametro den el metdodo "addMascotas"
   */
  addMascota(mascota: Mascotas){

    const mascotaRef =  collection(this.fireStore,"pet");
    return addDoc(mascotaRef, mascota);

  }

  getMascotas(): Observable<Mascotas[]>{

    const mascotaRef =  collection(this.fireStore,"pet");
    return collectionData(mascotaRef, {idField: 'id'}) as Observable<Mascotas[]>;
  }



}
