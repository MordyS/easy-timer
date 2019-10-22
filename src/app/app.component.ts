import { Component, OnInit } from '@angular/core';
import { StringsService } from './strings.service'
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'easyTimer';
  strings

  constructor(private auth: AuthService, private stringsService: StringsService) {
    this.strings = stringsService.strings
  }

  ngOnInit() {
    if (this.stringsService.selectedLan == 'he') document.querySelector('body').dir = 'rtl'
  }

  logOut() {
    this.auth.signOut()
  }
  openGeneralSettings(){
    
  }
  openSettings(){
    
  }
  get isLoggedIn() {
    return this.auth.isLoggedIn
  }
}
