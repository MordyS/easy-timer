import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  rowEditing: any;
  editFrom: any;
  editTo: any;

  constructor(public activeModal: NgbActiveModal, private stringsService: StringsService, private store: StoreService) {
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

  isRowEditable(i) {
    return this.rowEditing == i
  }

  editRow(i) {
    this.rowEditing = i
    this.editFrom = this.rowsToShow.find(r => r.index == i).In.substring(11, 16)
    this.editTo = this.rowsToShow.find(r => r.index == i).out.substring(11, 16)
  }

  saveRow(i) {
    let data = this.data.clients
    let In, Out;
    let regex = /^([012]\d:\d\d)$|^(\d:\d\d)$/

    if (regex.test(this.editFrom) && (!this.editFrom.length || regex.test(this.editFrom))) {
      In = this.rowsToShow.find(r => r.index == i).In.substring(0, 11) + (this.editFrom.length == 4 ? '0' + this.editFrom : this.editFrom) + ':00'
      Out = this.rowsToShow.find(r => r.index == i).out.substring(0, 11) + (this.editTo.length == 4 ? '0' + this.editTo : this.editTo) + ':00'
    }
    if (CalculateDiff(In, Out).timeCalculate > 0) {
      this.rowEditing = null
      data[this.data.selected].Times[i].In = In
      data[this.data.selected].Times[i].out = Out
      this.rowsToShow[this.rowsToShow.findIndex(r => r.index == i)].In = In
      this.rowsToShow[this.rowsToShow.findIndex(r => r.index == i)].out = Out
      this.store.saveClients(data)
      return
    }
    alert('יש לכתוב שעה במבנה של 13:00')
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
      return b.sum ? b.sum.timeCalculate * (this.data.clients[this.data.selected].Settings.wage || 30) + a : a
    }, 0)
  }
}
