import { Component, AfterContentInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StringsService } from '../strings.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterContentInit {

  @Input() data;
  clientName: string
  wage: number

  constructor(public activeModal: NgbActiveModal, private stringsService: StringsService, private store: StoreService) {
    
  }

  ngAfterContentInit() {
    console.log(this.data)
    this.clientName = this.data.client.Name
    this.wage = this.data.client.Settings.wage || 30
    console.log(this.clientName)
  }

  save() {
    this.store.selectedClient.Name = this.clientName
    this.store.selectedClient.Settings.wage = this.wage
    let clients = this.store.clients
    clients[this.store.selectedIndex].Name = this.clientName
    clients[this.store.selectedIndex].Settings.wage = this.wage
    this.store.saveClients(clients)
    this.activeModal.close('canceled')
  }

  cancel() {
    this.activeModal.close('canceled')
  }
}
