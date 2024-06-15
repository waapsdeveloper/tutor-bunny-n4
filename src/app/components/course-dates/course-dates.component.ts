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
    console.log("ttt");

    this.events.subscribe('course_Id-get', async (course_Id: any) => {
      console.log("ghfhgsdfhgfdgh");
      

      this.callApi();


    })
  }

  async callApi() {
    this.course_Id = this.courseId
    console.log(this.course_Id);


    if (this.course_Id) {
      let res = await this.network.getSchedule(this.course_Id)
      console.log(res);

      this.schedules = res.result
      console.log(this.schedule);
      
      

      this.onChange.emit(this.schedules);
    }
  }

  async addCourseDate() {
    let res = await this.modals.present(AddDatesPage);
    console.log(res);

    this.callApi()
    console.log("dsdadadadasd");


  }

  async editSchedule(item) {
    let res = await this.modals.present(AddDatesPage, item)
    this.initialize()
  }


}
