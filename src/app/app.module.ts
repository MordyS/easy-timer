import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatSnackBarModule
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
import { SettingsComponent } from './settings/settings.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MessagingService } from './messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';

declare var require: any;
const config = require('../../apikey.json')

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    LoginComponent,
    HomeComponent,
    ReportComponent,
    SettingsComponent
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
    MatSnackBarModule,
    NgxMaterialTimepickerModule.setLocale('en-US'),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,

  ],
  providers: [AuthService, AuthGuard, MessagingService, AsyncPipe],
  bootstrap: [AppComponent],
  entryComponents: [ReportComponent, SettingsComponent]
})
export class AppModule { }
