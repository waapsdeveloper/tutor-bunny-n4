import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-profile-statistics',
  templateUrl: './teacher-profile-statistics.component.html',
  styleUrls: ['./teacher-profile-statistics.component.scss'],
})
export class TeacherProfileStatisticsComponent implements OnInit {
  list = [
    {
      nbl: '4.9',
      label: 'Ratings',
      colorClass: '',
    },
    {
      nbl: '5',
      label: 'Courses',
      colorClass: '',
    },
    {
      nbl: '5y',
      label: 'Experience',
      colorClass: '',
    },
    {
      nbl: '17',
      label: 'Students',
      colorClass: '',
    },
  ];

  // nbl-danger
  constructor() {}

  ngOnInit() {}
}
