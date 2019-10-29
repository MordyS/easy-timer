import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  user: any;
  clients: any
  selectedClient
  selectedIndex: number

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.afAuth.authState.subscribe(auth => {
      this.user = auth   
    })
  }

  saveClients(c){
    const userRef = this.afs.collection('users').doc(this.user.uid)
    const data = {
      clients: c
    }
    return userRef.set(data, { merge: true });
  }

}
