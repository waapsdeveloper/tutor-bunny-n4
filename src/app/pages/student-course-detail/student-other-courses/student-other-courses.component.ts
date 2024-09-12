import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-other-courses',
  templateUrl: './student-other-courses.component.html',
  styleUrls: ['./student-other-courses.component.scss'],
})
export class StudentOtherCoursesComponent extends BasePage {

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
  }


  seeAll() {
    this.nav.pop('teacher-course-list')
  }

  getOtherCourse(events){
    console.log(events);
    this.onChange.emit(events);



  }

}
