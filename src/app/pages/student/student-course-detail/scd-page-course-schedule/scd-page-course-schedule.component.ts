import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-course-schedule',
  templateUrl: './scd-page-course-schedule.component.html',
  styleUrls: ['./scd-page-course-schedule.component.scss'],
})
export class ScdPageCourseScheduleComponent  implements OnInit {
  schedules: any[] = [];

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

  ngOnInit() {}

  updateUserDetails(value: any){

    if (value) {
      this.schedules = value.schedules;
    }

  }

}
