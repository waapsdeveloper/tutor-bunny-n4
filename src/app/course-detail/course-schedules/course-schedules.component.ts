import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-course-schedules',
  templateUrl: './course-schedules.component.html',
  styleUrls: ['./course-schedules.component.scss'],
})
export class CourseSchedulesComponent implements OnInit {
  startTime;
  endTime
  @Input() item: any;
  schedules;
  constructor() { }

  ngOnInit() {

    this.schedules = this.item.schedules

    const startTime = this.item.start_date;
    const endTime = this.item.end_date;
    this.startTime = moment(startTime).format('hh:mm a');
    this.endTime = moment(endTime).format('hh:mm a');

  }

}
