import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-rec-courses',
  templateUrl: './rec-courses.component.html',
  styleUrls: ['./rec-courses.component.scss'],
})
export class RecCoursesComponent extends BasePage implements OnInit {
  course: any[];
  data: any;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    this.data = await this.network.getAllCourses() as any[];
    this.course = this.data.result;
  }
}
