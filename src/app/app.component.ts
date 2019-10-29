import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsComponent } from './settings/settings.component';
import { StringsService } from './strings.service'
import { AuthService } from './auth.service';
import { StoreService } from './store.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'easyTimer';
  strings

  constructor(
    private auth: AuthService,
    private stringsService: StringsService,
    private modalService: NgbModal,
    private store: StoreService
  ) {
    this.strings = stringsService.strings
  }

  ngOnInit() {
    if (this.stringsService.selectedLan == 'he') document.querySelector('body').dir = 'rtl'
  }

  logOut() {
    this.auth.signOut()
  }
  openGeneralSettings() {

  }
  openSettings() {
    const modalRef = this.modalService.open(SettingsComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.data = {
      client: this.store.selectedClient,
      clientIndex: this.store.selectedIndex
    }
  }
  get isLoggedIn() {
    return this.auth.isLoggedIn
  }
}
