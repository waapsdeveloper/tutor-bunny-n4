import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-profile-statistics',
  templateUrl: './teacher-profile-statistics.component.html',
  styleUrls: ['./teacher-profile-statistics.component.scss'],
})
export class TeacherProfileStatisticsComponent implements OnInit {
  list = [
    {
      nbl: '0',
      label: 'Ratings',
      colorClass: '',
    },
    {
      nbl: '0',
      label: 'Courses',
      colorClass: '',
    },
    {
      nbl: '0y',
      label: 'Experience',
      colorClass: '',
    },
    {
      nbl: '0',
      label: 'Students',
      colorClass: '',
    },
  ];

  // nbl-danger
  constructor() {}

  ngOnInit() {}
}
