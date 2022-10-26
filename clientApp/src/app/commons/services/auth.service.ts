import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

import { ILogin, IRegister } from '../interfaces/auth.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    userLogin: any;
    userPhotoUrl:any; //puede ser null o string
	isLogin:boolean;

    constructor(private _auth:AngularFireAuth) { 
        this._auth.authState.subscribe((user) => {
			if (user) {
				this.userLogin = user; 
                this.userPhotoUrl = user.photoURL; //para el navbar
				this.isLogin = true; //para el navbar
				localStorage.setItem('userLogin', JSON.stringify(this.userLogin));
			} else {
				this.isLogin = false;
				localStorage.setItem('userLogin', 'null');
			}
		});
    }

    // Returns true when user is looged
	get isLoggedIn(): boolean {
		const userHero = JSON.parse(localStorage.getItem('userLogin')!);
		return userHero !== null ? true : false;
	}

    loginByPassword(data:ILogin){
        return this._auth.signInWithEmailAndPassword(data.email, data.password);
    }

    signOut(){
        return this._auth.signOut()
    }

    registerWithEmail(data:IRegister){
        return this._auth.createUserWithEmailAndPassword(data.email,data.password)
    }

    /*get info user logged name, email, photo, email verified */
	getCurrentUser() {
		return this._auth.currentUser;
	}

	googleAuth() {
		const provider = new GoogleAuthProvider();
		return this._auth.signInWithPopup(provider);
	}


}