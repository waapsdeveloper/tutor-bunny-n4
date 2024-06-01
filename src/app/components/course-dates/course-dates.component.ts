import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AddDatesPage } from 'src/app/add-dates/add-dates.page';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-course-dates',
  templateUrl: './course-dates.component.html',
  styleUrls: ['./course-dates.component.scss'],
})
export class CourseDatesComponent extends BasePage implements OnInit {
  @Input() schedule = {}

  schedules = [];
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  course_id;
  constructor(injector: Injector) {
    super(injector)

  }

  ngOnInit() { }

  async initialize() {
    this.course_id = localStorage.getItem('course_Id')
    if (this.course_id) {
      let res = await this.network.getSchedule(this.course_id)
      console.log(res);

      let data = res.data

      this.schedules.push(data)
      this.onChange.emit(data);
    }
  }

  addCourseDate() {
    this.modals.present(AddDatesPage)

  }

  editSchedule(item) {
    this.modals.present(AddDatesPage, item)
  }


}
