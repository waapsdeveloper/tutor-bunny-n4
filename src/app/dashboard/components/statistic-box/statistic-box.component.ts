import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-box',
  templateUrl: './statistic-box.component.html',
  styleUrls: ['./statistic-box.component.scss'],
})
export class StatisticBoxComponent  implements OnInit {

  list = [
    {
      nbl: '$4643',
      label: 'Earnings',
      colorClass: ''
    },
    {
      nbl: '5',
      label: 'Trials',
      colorClass: ''
    },
    {
      nbl: '4',
      label: 'Courses',
      colorClass: ''
    },
    {
      nbl: '20',
      label: 'Credits',
      colorClass: ''
    },
    {
      nbl: '6',
      label: 'Inactive',
      colorClass: 'nbl-danger'
    }
  ]
  constructor() { }

  ngOnInit() {}

}
