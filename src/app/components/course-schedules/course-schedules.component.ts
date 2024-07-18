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
  @Input() last = false;
  schedules;
  constructor() { }

  ngOnInit() {
    this.schedules = this.item.schedules
  }

}
