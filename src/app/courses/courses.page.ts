import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage extends BasePage implements OnInit {
  list;
  course;
  status;

  constructor(injector: Injector) {
    super(injector)
    this.initialize()
  }

  ngOnInit() { }

  async initialize() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.list = await this.network.getCourseList(user.id) as any[];
    this.course = this.list.result;
    console.log(this.course);
  }

  onCourseDeleted(courseId: number) {
    this.course = this.course.filter(course => course.id !== courseId);
  }
  courseActive() {
    this.initialize()
  }
  courseInctive() {
    this.initialize()

  }
}
