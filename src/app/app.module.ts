import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule
} from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';

const config = {
  apiKey: "AIzaSyDwsnsjyTINBQAdPd0gJJuhlF62Y5spygM",
  authDomain: "easytimer-d4fd4.firebaseapp.com",
  databaseURL: "https://easytimer-d4fd4.firebaseio.com",
  projectId: "easytimer-d4fd4",
  storageBucket: "",
  messagingSenderId: "254530246171",
  appId: "1:254530246171:web:79bc6bbd0e784ce9810abe"
};

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    LoginComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ReportComponent]
})
export class AppModule { }
