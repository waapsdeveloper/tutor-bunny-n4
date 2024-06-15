import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent extends BasePage implements OnInit {
  list;
  course
  constructor(injector: Injector) {
    super(injector)
    this.initialize()
  }

  ngOnInit() { }

  async initialize() {
    let user = JSON.parse(localStorage.getItem('user'));

    this.list = await this.network.getCourseList(user.id) as any[];

    this.course = this.list.result


  }

  editCourse(item) {
    const params = {
      backUrl: '/tabs/courses',
      title: 'Edit Course',
      type: item.type,
      showBack: true,
      course_Id: item.id,
      edit: true
    };

    this.nav.push('/course-form', params)

  }
  oepnDeatils(item) {

    const params = {
      id: item.id,
      backUrl: '/tabs/courses'
    }
    this.nav.push('/tabs/course-detail', params)



  }

}
