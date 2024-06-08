import { Component, Injector, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-student-course-detail',
  templateUrl: './student-course-detail.page.html',
  styleUrls: ['./student-course-detail.page.scss'],
})
export class StudentCourseDetailPage extends BasePage implements OnInit {
  data;
  params;
  backUrl;
  course_Id;
  capacity;
  description;
  duration;
  isExpanded = false;
  title;
  serial_number;
  created_at;
  image;
  price;
  startTime;
  endTime;
  updated_at;
  schedules;
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }


  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.id) {
      this.course_Id = this.params.id;
    }
    this.callApi();

  }

  async callApi() {

    let res = await this.network.getcourseById(this.course_Id) as any;
    this.data = res.course;
    console.log(this.data);
    this.title = this.data.title;
    this.capacity = this.data.capacity;
    this.description = this.data.description;
    this.duration = this.data.duration;
    this.serial_number = this.data.serial_number;
    this.price = this.data.price;
    this.schedules = this.data.schedules;
    this.created_at = this.data.created_at;
    this.image = this.data.image;
    this.updated_at = this.data.updated_at;
    const startTime = this.schedules.start_date;
    const endTime = this.schedules.end_date;
    this.startTime = moment(startTime).format('hh:mm a');
    this.endTime = moment(endTime).format('hh:mm a');
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}
