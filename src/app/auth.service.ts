import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { User } from './user';
interface User {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: Observable<User>;
  user//: User

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    //// Get auth data, then get firestore user document || null
    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    //     } else {
    //       return of(null)
    //     }
    //   })
    // )
    
    this.afAuth.authState.subscribe(auth => {
      this.user = auth
      if(auth){
        this.router.navigate([''])
      }      
    })

  }

  //login user with google
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  //social login with popup
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error));
  }

  // Sets user data to firestore on login/signup
  private updateUserData(user) {
    const userRef = this.afs.collection('users').doc(user.uid);
    const data = { //: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, { merge: true });
  }

  // //signup a new user(by email/password ) to our firebase  
  // emailSignUp(email: string, password: string) {
  //   return this.afAuth.auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(credential => {
  //       console.log('Signup successfully!');
  //       this.router.navigate(['/login']);
  //       return this.updateUserData(credential.user);
  //     })
  //     .catch(error => this.handleError(error));
  // }

  // // login an existing user with email/password
  // emailLogin(email: string, password: string) {
  //   return this.afAuth.auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(credential => {
  //       console.log('Login successfully!');
  //       this.router.navigate(['/home']);
  //       return this.updateUserData(credential.user);
  //     })
  //     .catch(error => this.handleError(error));
  // }

  // // Sends email allowing user to reset password
  // resetPassword(email: string) {
  //   const fbAuth = auth();
  //   return fbAuth
  //     .sendPasswordResetEmail(email)
  //     .then(() => console.error('Password update email sent'))
  //     .catch(error => this.handleError(error));
  // }

  //logout a user 
  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  get isLoggedIn(){
    return !!this.user
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    alert(error.message);
  }

}