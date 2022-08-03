import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { StringsService } from './../strings.service'
import { MatTabGroup } from '@angular/material';
import { AuthService } from './../auth.service';
import { StoreService } from './../store.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportComponent } from '../report/report.component';
import { CalculateDiff, AddDiff, DateNow } from './../calculateDiff'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientComponent implements OnInit {

  @ViewChild('tabs', { static: false }) tabs: MatTabGroup;

  strings
  counterH: string
  counterM: string
  counterS: string
  selectedIndex = 0
  clients = []
  user
  reportTypes
  months
  years = [202,2023,2024,2025,2026,2027]
  reportYear = new Date().getFullYear()
  reportType
  reportMonth
  constructor(private modalService: NgbModal, private stringsService: StringsService, private auth: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore, private store: StoreService) {
    this.strings = stringsService.strings
    this.reportTypes = stringsService.strings['reportTypes']
    this.reportType = this.reportTypes[0]['name']
    this.months = stringsService.strings['months']
    this.reportMonth = 'm' + String(new Date().getMonth()+1)
    this.user = auth.user
  }
  openReport() {
    const modalRef = this.modalService.open(ReportComponent, { size: 'xl', scrollable: true });
    modalRef.componentInstance.data = {
      clients: this.clients,
      selected: this.selectedIndex,
      reportYear: this.reportYear,
      reportType: this.reportType,
      reportMonth: this.reportMonth
    }
  }
  getUserData() {
    this.afAuth.authState.subscribe(auth => {
      const userRef = this.afs.collection('users').doc(auth.uid)
      userRef.valueChanges().subscribe((doc: any) => {
        if (doc.clients && doc.clients.length) {
          this.clients = doc.clients
          this.store.clients = this.clients
        } else {
          this.addClient()
        }
      })
    })
  }
  ngOnInit() {
    this.getUserData()
    this.updateCounter()
  }

  selectedTab(e) {
    this.selectedIndex = e.index
    this.store.selectedClient = this.selectedClient
    this.store.selectedIndex = this.selectedIndex
  }
  toggleCounter() {
    if (this.isCounting) {
      this.selectedClient.Times[this.selectedClient.Times.length - 1].out = this.dateNow
    } else {
      this.selectedClient.Times.push({ In: this.dateNow, out: null })
    }
    this.saveClients()
  }
  saveClients() {
    this.store.saveClients(this.clients)
  }
  addClient(){
    this.clients.push({
      Name: 'לקוח חדש',
      Settings: {wage: 30},
      Times: []
    })
    this.saveClients()
    setTimeout(() => {
      this.tabs.selectedIndex = this.clients.length - 1  
    }, 250);
  }
  deleteClient(i){
    this.clients.splice(i, 1)
    this.saveClients()
  }
  get selectedClient() {
    return this.clients[this.selectedIndex]
  }
  get isCounting() {
    if (!this.selectedClient || this.selectedClient.Times.length == 0) return false
    return !this.selectedClient.Times[this.selectedClient.Times.length - 1].out
  }
  get dateNow() {
    return DateNow()
  }
  get sumHoursMonth() {
    return this.selectedClient.Times
      .filter(t => +t.In.substring(0, 2) == new Date().getMonth()+1 && t.In.substring(6, 10) == new Date().getFullYear())
      .reduce((a, b) => {
        return AddDiff(a, CalculateDiff(b.In, b.out).timeDisplay)
      }, '00:00:00')
  }
  get sumPaymentMonth() {
    return this.selectedClient.Times
      .filter(t => +t.In.substring(0, 2) == new Date().getMonth()+1 && t.In.substring(6, 10) == new Date().getFullYear())
      .reduce((a, b) => {
        return CalculateDiff(b.In, b.out).timeCalculate * (this.selectedClient.Settings.wage || 30) + a
      }, 0)
  }
  get sumHoursDay() {
    return this.selectedClient.Times
      .filter(t => t.In.substring(0, 10) == this.dateNow.substring(0, 10))
      .reduce((a, b) => {
        return AddDiff(a, CalculateDiff(b.In, b.out).timeDisplay)
      }, '00:00:00')
  }
  get sumPaymentDay() {
    return this.selectedClient.Times
      .filter(t => t.In.substring(0, 10) == this.dateNow.substring(0, 10))
      .reduce((a, b) => {
        return CalculateDiff(b.In, b.out).timeCalculate * (this.selectedClient.Settings.wage || 30) + a
      }, 0)
  }
  updateCounter = () => {
    setInterval(() => {
      if (!this.isCounting) {
        this.counterH = '00'
        this.counterM = '00'
        this.counterS = '00'
      } else {
        if (this.selectedClient.Times[this.selectedClient.Times.length - 1].In.split(' ')[0].split('/')[1] != new Date().getDate()) {
          this.selectedClient.Times[this.selectedClient.Times.length - 1].out = this.selectedClient.Times[this.selectedClient.Times.length - 1].In.split(' ')[0] + ' 24:00:00'
          const date = new Date()
          this.selectedClient.Times.push({
            In: String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') + '/' + String(date.getFullYear()) + ' 00:00:00',
            out: null
          })
          this.saveClients()
        }
        let intime = this.selectedClient.Times[this.selectedClient.Times.length - 1].In.split(' ')[1].split(':')
        let H = String(new Date().getHours() - +intime[0])
        let HH = String(H)
        let M = new Date().getMinutes() - +intime[1]
        let MM = M < 0 ? String(M + 60) : String(M)
        let S = new Date().getSeconds() - +intime[2]
        let SS = S < 0 ? String(S + 60) : String(S)
        this.counterH = HH.padStart(2, '0')
        this.counterM = MM.padStart(2, '0')
        this.counterS = SS.padStart(2, '0')
      }
    }, 1000)
  }
}
