import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stp-page-info',
  templateUrl: './stp-page-info.component.html',
  styleUrls: ['./stp-page-info.component.scss'],
})
export class StpPageInfoComponent {

  subjects: any[] = [];
  languages: any[] = [];
  travel_policy: string;
  country: string;
  city: string;
  state: string;
  flag: string;


  private _data: any; 
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateUserDetails(value);
  }

  get data(): any {
    return this._data;
  }

  constructor() { }


  updateUserDetails(value: any){

    if (value) {
      this.subjects = value.subjects || [];
      this.languages = value.languages || [];
      this.travel_policy = value.travel_policy || '';
      this.city = value.city || '';
      this.state = value.state || '';
      this.flag = value.flag || '';
      this.country = value.country || '';
    }

  }

}
