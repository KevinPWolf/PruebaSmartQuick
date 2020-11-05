import { Injectable, NgZone } from "@angular/core";
import { User } from "../services/user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Session } from "./session";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  userData: any; // Save logged in user data
  public session: Session;
  public authData: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,    
    public ngZone: NgZone  // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    alert(email);
    return this.afAuth.signInWithEmailAndPassword(email.trim(), password)
      .then((result) => {
        this.ngZone.run(() => {
          alert("llega");          
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user, "jack", "administrador");        
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: string, password: string, name: string, type: string) {
    alert("email: " + email);
    return this.afAuth.createUserWithEmailAndPassword(email.trim(), password)
      .then((result) => {
        this.SetUserData(result.user, name, type);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
 
  SetUserData(user, name?: string, type?: string) {
    alert("Nombre: "+name+" Tipo: "+type);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      name: name,
      type: type,
      email: user.email
    }    
    this.session=new Session(name, type); 
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  getCurrentUser(){
    return this.afAuth.currentUser;    
  }
}
