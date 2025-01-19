import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-course-statistics',
  templateUrl: './scd-page-course-statistics.component.html',
  styleUrls: ['./scd-page-course-statistics.component.scss'],
})
export class ScdPageCourseStatisticsComponent implements OnInit {

  duration: string;
  lessons: string;
  mode_type: string;
  capacity: string;
  from_age: string;
  to_age: string;
  language: string;
  state: string;
  country: string;

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

  ngOnInit() { }

  
  updateUserDetails(value: any){

    if (value) {
      this.duration = value.duration || '';
      this.lessons = value.lessons || '';
      this.mode_type = value.mode_type || '';
      this.capacity = value.capacity || '';
      this.from_age = value.from_age || '';
      this.to_age = value.to_age || '';
      this.language = value.language || '';
      this.state = value.state || '';
    }

  }
}
