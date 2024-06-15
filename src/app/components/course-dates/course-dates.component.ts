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
  @Input() courseId = {}
  @Input('errorText') errorText = '';
  isRequired = false;
  schedules = [];
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  course_Id;
  constructor(injector: Injector) {
    super(injector)

    this.initialize()
  }



  ngOnInit() {

  }

  async initialize() {

    this.events.subscribe('course_Id-get', async (course_Id: any) => {


      this.callApi();


    })
  }

  async callApi() {
    this.course_Id = this.courseId


    if (this.course_Id) {
      let res = await this.network.getSchedule(this.course_Id)

      this.schedules = res.result



      this.onChange.emit(this.schedules);
    }
  }

  async addCourseDate() {
    let res = await this.modals.present(AddDatesPage);

    this.callApi()


  }

  async editSchedule(item) {
    let res = await this.modals.present(AddDatesPage, item)
    this.initialize()
  }


}
