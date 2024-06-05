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
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    this.list = await this.network.getCourseList(user.id) as any[];
    console.log(this.list);

    this.course = this.list.result


  }

  editCourse(item) {
    console.log(item);

    const params = {
      backUrl: '/tabs/teacher-dashboard',
      title: 'Edit Course',
      type: "res.data.type",
      course_Id: item.id

    };
    console.log(params);

    this.nav.push('/course-form', params)

  }
  oepnDeatils(item) {
    console.log(item);

    const params = {
      id: item.id,
      backUrl: '/tabs/courses'
    }
    console.log(params);
    this.nav.push('/tabs/course-detail', params)
    


  }

}
