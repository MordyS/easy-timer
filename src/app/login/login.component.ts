import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StringsService } from '../strings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strings
  constructor(private auth: AuthService, private router: Router, private stringsService: StringsService) { 
    this.strings = stringsService.strings
  }

  ngOnInit() {
    
  }

  loginWithGoogle() {
    this.auth.googleLogin().then(
      () => this.router.navigate([''])
    )
  }

  // loginWithEmail(formData){
  //   this.myService.emailLogin(formData.value.email, formData.value.password);
  // }

}
