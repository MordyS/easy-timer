import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { StringsService } from '../strings.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strings
  phone
  recaptchaVerifier
  confirmationResult
  constructor(private auth: AuthService, private router: Router, private stringsService: StringsService, private afAuth: AngularFireAuth) {
    this.strings = stringsService.strings
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {'size': 'invisible',});
  }

  loginWithGoogle() {
    this.auth.googleLogin().then(
      () => this.router.navigate([''])
    )
  }

  loginWithPhone() {
    this.afAuth.auth.languageCode = 'he';
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + this.phone;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        confirmationResult
          .confirm(window.prompt('Enter your code that you got on SMS'))
          .then(function (result) {
            // User signed in successfully.
            console.log(result.user);
            // ...
          })
          .catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
          });
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
      });

    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
    //   'size': 'invisible',
    //   'callback': function (response) {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     console.log(response)
    //     this.onSignInSubmit();
    //   },
    //   'expired-callback': function() {
    //     console.log('expired')
    //     // Reset reCAPTCHA?
    //   }
    // });
  }

  // onSignInSubmit() {
  //   var phoneNumber = this.phone
  //   var appVerifier = this.recaptchaVerifier
  //   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  //     .then(function (confirmationResult) {
  //       console.log(confirmationResult)
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       this.confirmationResult = confirmationResult;
  //     }).catch(function (error) {
  //       // Error; SMS not sent
  //       // ...
  //     });
  // }

}
