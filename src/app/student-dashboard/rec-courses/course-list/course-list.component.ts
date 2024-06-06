import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  @Input() item: any;

  constructor() {

    this.initialize();
  }

  initialize() {

  }

  ngOnInit() { }
  goToDeatil() {

  }
}
