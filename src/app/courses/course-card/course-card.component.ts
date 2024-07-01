import { Component, EventEmitter, Injector, Input, OnInit, Output, output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent extends BasePage implements OnInit {
  list;
  @Input() item;
  course;
  status;
  @Output() courseDeleted = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector)
    this.initialize()
  }

  ngOnInit() {
    console.log(this.item);

    this.status = this.item.status;
    console.log(this.status);
  }

  async initialize() {


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

  async inactiveCourse(data) {

    let obj = {
      course_id: data.id,
    }

    let res = await this.network.inactiveCourse(obj)
  }

  async deleteCourse(data) {
    let obj = {
      course_id: data.id,
    }

    let res = await this.network.inactiveCourse(obj)
    if (res.status == 200) {  // Assuming res has a success property to indicate the request was successful
      this.courseDeleted.emit(data.id);  // Emit the course ID to the parent
    }
  }
  async activeCourse(data) {
    let obj = {
      course_id: data.id,
    }

    let res = await this.network.activeCourse(obj)
  }

}
