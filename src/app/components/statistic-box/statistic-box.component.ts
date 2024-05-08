import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-box',
  templateUrl: './statistic-box.component.html',
  styleUrls: ['./statistic-box.component.scss'],
})
export class StatisticBoxComponent  implements OnInit {

  list = [
    {
      nbl: '$0',
      label: 'Earnings',
      colorClass: ''
    },
    {
      nbl: '0',
      label: 'Trials',
      colorClass: ''
    },
    {
      nbl: '0',
      label: 'Courses',
      colorClass: ''
    },
    {
      nbl: '0',
      label: 'Credits',
      colorClass: ''
    },
    {
      nbl: '0',
      label: 'Inactive',
      colorClass: 'nbl-danger'
    }
  ]
  constructor() { }

  ngOnInit() {}

}
