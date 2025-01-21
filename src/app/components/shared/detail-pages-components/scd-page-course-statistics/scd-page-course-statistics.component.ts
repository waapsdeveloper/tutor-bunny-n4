import { Component, Input, OnInit } from '@angular/core';
import { infoColumnSingleItem } from 'src/app/interfaces/detail-data';

@Component({
  selector: 'app-scd-page-course-statistics',
  templateUrl: './scd-page-course-statistics.component.html',
  styleUrls: ['./scd-page-course-statistics.component.scss'],
})
export class ScdPageCourseStatisticsComponent {
  
  colA: infoColumnSingleItem[] = [];
  colB: infoColumnSingleItem[] = [];

  private _data: any;
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateDetails(value);
  }

  get data(): any {
    return this._data;
  }

  constructor() {}

  updateDetails(value: any) {
    console.log(value)
    if (value) {
      this.colA = value.colA || [];
      this.colB = value.colB || [];      
    }
  }
}
