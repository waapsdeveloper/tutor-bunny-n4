import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-other-courses',
  templateUrl: './student-other-courses.component.html',
  styleUrls: ['./student-other-courses.component.scss'],
})
export class StudentOtherCoursesComponent extends BasePage {
  private _teacher;


  @Input('teacher')
  public get teacher() {
    return this._teacher;
  };

  public set teacher(value: any) {
    this._teacher = value;


  }

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
  }


  seeAll() {
    let params = {
      user: JSON.stringify(this.teacher)
    }

    this.nav.push('teacher-course-list', params)
  }

  getOtherCourse(events) {
    this.onChange.emit(events);



  }

}
