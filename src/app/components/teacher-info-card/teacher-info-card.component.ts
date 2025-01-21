import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-info-card',
  templateUrl: './teacher-info-card.component.html',
  styleUrls: ['./teacher-info-card.component.scss'],
})
export class TeacherInfoCardComponent {

  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  image = 'assets/profileimg.png';
  name; 
  flag = ''
  country = '';
  text = '';

  constructor() {}

  updateDetails(value: any) {
    console.log(value)
    if (value) {
      this.image = value.image;
      this.name = value.name;
      this.flag = value.flag;
      this.country = value.country;
      this.text = value.text;


    }
  }

}
