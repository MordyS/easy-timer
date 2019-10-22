import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StringsService {

  constructor() { }

  private SelectedLan = 'he'
  private Strings = [
    {
      name: 'appName',
      he: 'שעה קלה',
      en: 'Easy Time'
    },
    {
      name: 'start',
      he: 'התחלה',
      en: 'Start'
    },
    {
      name: 'stop',
      he: 'עצירה',
      en: 'Stop'
    },
    {
      name: 'totalHoursM',
      he: 'ס"ה שעות לחודש',
      en: 'Total Hours For Month'
    },
    {
      name: 'totalMoneyM',
      he: 'ס"ה לתשלום לחודש',
      en: 'Sum For Month'
    },
    {
      name: 'totalHoursD',
      he: 'ס"ה שעות להיום',
      en: 'Total Hours For Today'
    },
    {
      name: 'totalMoneyD',
      he: 'ס"ה לתשלום להיום',
      en: 'Sum For Today'
    },
    {
      name: 'signinWithGoogle',
      he: 'כניסה/הרשמה באמצעות חשבון גוגל',
      en: 'SignIn/LogIn With Your Google Account'
    },
    {
      name: 'reportTypes',
      he: [{name: 'basic', val: 'בסיסי'},{name: 'expanded', val: 'מורחב'}],
      en: [{name: 'basic', val: 'basic'},{name: 'expanded', val: 'expanded'}]
    },
    {
      name: 'months',
      he: [
        {name: 'm1', val: 'ינואר'},
        {name: 'm2', val: 'פברואר'},
        {name: 'm3', val: 'מרץ'},
        {name: 'm4', val: 'אפריל'},
        {name: 'm5', val: 'מאי'},
        {name: 'm6', val: 'יוני'},
        {name: 'm7', val: 'יולי'},
        {name: 'm8', val: 'אוגוסט'},
        {name: 'm9', val: 'ספטמבר'},
        {name: 'm10', val: 'אוקטובר'},
        {name: 'm11', val: 'נובמבר'},
        {name: 'm12', val: 'דצמבר'}
      ],
      en: [
        {name: 'm1', val: 'January'},
        {name: 'm2', val: 'February'},
        {name: 'm3', val: 'March'},
        {name: 'm4', val: 'April'},
        {name: 'm5', val: 'May'},
        {name: 'm6', val: 'June'},
        {name: 'm7', val: 'July'},
        {name: 'm8', val: 'August'},
        {name: 'm9', val: 'September'},
        {name: 'm10', val: 'October'},
        {name: 'm11', val: 'November'},
        {name: 'm12', val: 'December'}
      ],
    }
  ]

  public get selectedLan() {
    return this.SelectedLan
  }

  public set selectLan(lan) {
    this.SelectedLan = lan
  }
  public get strings() {
    return this.Strings.reduce((obj, s) => {
      obj[s.name] = s[this.selectedLan]
      return obj
    }, {})
  }

}
