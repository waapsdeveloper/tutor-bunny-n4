import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent extends BasePage implements OnInit {
  @Input() item: any;
languageName: any;

  constructor(injector:Injector) {
    super(injector)
    this.initialize();
  }

  initialize() {

  }

  ngOnInit() { }
  goToDeatil() {
    this.nav.push('student-course-detail')
  }
}
