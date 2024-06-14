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
  displayName
  course_Id;
  language;
  capacity;
  description;
  duration;
  mode_type;
  isExpanded = false;
  title;
  serial_number;
  created_at;
  image;
  price;
  from_age;
  to_age;
  startTime;
  flag;
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
    this.mode_type = this.data.mode_type;
    this.description = this.data.description;
    this.language = this.data.language.name;
    this.from_age = this.data.from_age;
    this.to_age = this.data.to_age;
    this.displayName = this.utility.getAmericanName(this.data.user.name);
    this.flag = this.getFlag();
    this.duration = this.data.duration;
    this.serial_number = this.data.serial_number;
    this.price = this.data.price;
    this.schedules = this.data.schedules;
    this.created_at = this.data.created_at;
    this.image = this.data.image;
    this.updated_at = this.data.updated_at;
    const startTime = this.schedules.start_date;
    const endTime = this.schedules.end_date;
    this.startTime = moment(startTime).format('hh:mm');
    this.endTime = moment(endTime).format('hh:mm');
  }
  getFlag() {
    console.log(this.data.user.teacher);
    if (this.data && this.data.user.teacher && this.data.user.teacher.country) {
      const flag = this.data.user.teacher.country.iso2;
      console.log(flag);
      
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}
