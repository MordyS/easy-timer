import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringsService } from '../strings.service';
import { StoreService } from '../store.service';
import { CalculateDiff, AddDiff } from '../calculateDiff';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements AfterContentInit {//AfterViewInit {

  @Input() data;
  reportTypes: any;
  months: any;
  rowsToShow
  reportTypeText = ''
  reportMonthText = ''

  constructor(public activeModal: NgbActiveModal, private stringsService: StringsService, private store: StoreService, private snackbar: MatSnackBar) {
    this.reportTypes = stringsService.strings['reportTypes']
    this.months = stringsService.strings['months']

  }

  // ngAfterViewInit() {
  ngAfterContentInit() {
    console.log(this.data)
    this.reportTypeText = this.reportTypes.find(r => r.name == this.data.reportType).val
    this.reportMonthText = this.months.find(m => m.name == this.data.reportMonth).val
    this.rowsToShow = this.data.clients[this.data.selected].Times.map((time, index) => {
      time.index = index
      time.sum = time.out ? CalculateDiff(time.In, time.out) : null
      return time
    }).filter(t => +t.In.substring(0, 2) == +this.data.reportMonth.substring(1) && t.In.substring(6, 10) == this.data.reportYear)
      .sort((a, b) => a.In > b.In ? 1 : a.In < b.In ? -1 : 0)
  }

  saveTimeIn(t, i) {
    let data = this.data.clients
    let time = this.rowsToShow.find(r => r.index == i).In.substring(0, 11) + t + ':00'
    if (!(CalculateDiff(time, this.rowsToShow.find(r => r.index == i).out).timeCalculate > 0)) {
      this.snackbar.open('לתשומת לבך, שעת יציאה לפני שעת כניסה!','OK',{duration: 3000})
    }
    data[this.data.selected].Times[i].In = time
    this.rowsToShow[this.rowsToShow.findIndex(r => r.index == i)].In = time
    this.store.saveClients(data)
  }

  saveTimeOut(t, i) {
    let data = this.data.clients
    let time = this.rowsToShow.find(r => r.index == i).Out.substring(0, 11) + t + ':00'
    if (!(CalculateDiff(this.rowsToShow.find(r => r.index == i).In, time).timeCalculate > 0)) {
      this.snackbar.open('לתשומת לבך, שעת יציאה לפני שעת כניסה!','OK',{duration: 3000})
    }
    data[this.data.selected].Times[i].out = time
    this.rowsToShow[this.rowsToShow.findIndex(r => r.index == i)].out = time
    this.store.saveClients(data)
  }

  deleteRow(i) {
    let data = this.data.clients
    data[this.data.selected].Times.splice(i, 1);
    this.rowsToShow.splice(this.rowsToShow.findIndex(r => r.index == i), 1)
    this.store.saveClients(data)
  }
  get sumHours() {
    return this.rowsToShow.reduce((a, b) => {
      return b.sum ? AddDiff(a, b.sum.timeDisplay) : a
    }, '00:00:00')
  }
  get sumPayment() {
    return this.rowsToShow.reduce((a, b) => {
      return b.sum ? b.sum.timeCalculate * this.wage + a : a
    }, 0)
  }

  get wage() {
    return this.data.clients[this.data.selected].Settings.wage || 30
  }
}
