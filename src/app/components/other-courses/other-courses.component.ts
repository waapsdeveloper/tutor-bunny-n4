import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-other-courses',
  templateUrl: './other-courses.component.html',
  styleUrls: ['./other-courses.component.scss'],
})
export class OtherCoursesComponent extends BasePage implements OnInit {

  list;
  count;
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() { }

  async initialize() {
    let user = JSON.parse(localStorage.getItem('user'))

    this.list = await this.network.getCourseList(user.id) as any[];

    this.count = this.list.count

  }
  gotoCourseList() {
    this.nav.push('/tabs/courses')
  }

}
