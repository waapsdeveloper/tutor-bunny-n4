import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scd-page-course-statistics',
  templateUrl: './scd-page-course-statistics.component.html',
  styleUrls: ['./scd-page-course-statistics.component.scss'],
})
export class ScdPageCourseStatisticsComponent implements OnInit {

  duration
  lessons;
  mode_type;
  capacity;
  from_age;
  to_age;
  language;
  state;
  country;

  constructor() { }

  ngOnInit() { }

}
