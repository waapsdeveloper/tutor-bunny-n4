import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AddDatesPage } from 'src/app/add-dates/add-dates.page';
import { BasePage } from 'src/app/base-page/base-page';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@Component({
  selector: 'app-course-dates',
  templateUrl: './course-dates.component.html',
  styleUrls: ['./course-dates.component.scss'],
})
export class CourseDatesComponent extends BasePage implements OnInit {
  @Input() schedule = {}
  @Input() courseId = {}
  @Input('errorText') errorText = '';
  isRequired = false;
  schedules = [];
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  course_Id;
  constructor(injector: Injector) {
    super(injector)

  }



  ngOnInit() {

  }

 

  async addCourseDate() {
    let res = await this.modals.present(AddDatesPage, this.courseId);



  }

  async editSchedule(item) {
    let res = await this.modals.present(AddDatesPage, item)
  }

  async openSchedule() {
    let res = await this.modals.present(AddScheduleComponent, {}, "", 0.7);

  }


}
