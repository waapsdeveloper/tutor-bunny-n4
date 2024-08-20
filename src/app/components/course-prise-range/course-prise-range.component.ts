import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-prise-range',
  templateUrl: './course-prise-range.component.html',
  styleUrls: ['./course-prise-range.component.scss'],
})
export class CoursePriseRangeComponent  implements OnInit {

  constructor() { }
  pinFormatter(value: number) {
    return `${value}`;
  }

  ngOnInit() {}

}
