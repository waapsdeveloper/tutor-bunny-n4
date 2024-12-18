import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

@Component({
  selector: 'app-student-other-study-material',
  templateUrl: './student-other-study-material.component.html',
  styleUrls: ['./student-other-study-material.component.scss'],
})
export class StudentOtherStudyMaterialComponent extends BasePage   {
  
  private _teacher;


  @Input('teacher')
  public get teacher() {
    return this._teacher;
  };

  public set teacher(value: any) {
    this._teacher = value;


  }

  onChange = new EventEmitter<any>();
//  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  selectCourse(course: any) {
    this.onChange.emit(course);
  }
  constructor(injector: Injector, public globalCourses: GlobalCoursesService) {
    super(injector)
  }


  seeAll() {
    let params = {
      user_name: this.teacher.name,
      user_id : this.teacher.id
    };
    this.nav.push('teacher-course-list', params)
  }

  getOtherCourse(events) {
    this.onChange.emit(events);



  }


  

 

}
