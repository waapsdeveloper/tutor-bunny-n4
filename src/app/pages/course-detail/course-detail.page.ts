import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage extends BasePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  data;
  params;
  backUrl;
  course_Id;
  capacity;
  description;
  currencySymbol;
  loading = false;
  duration;
  isExpanded = false;
  title;
  type;
  serial_number;
  mode_type;
  rating;
  created_at;
  price;
  startTime;
  flag;
  displayName;
  image;
  endTime;
  from_age;
  language;
  to_age;
  updated_at;
  total_rating;
  lessons;
  schedules: any[] = [];
  startDate;
  endDate;
  categoryId;
  otherCourseList: any[] = [];
  otherCourseListTotalCount: number = 0;
  user;
  canEditCourse = false;

  courseImages: string[] = []; // Images array
  currentIndex: number = 0;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.id) {
      this.course_Id = this.params.id;
    }
    this.callApi();
  }

  prevImage() {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.courseImages.length - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex < this.courseImages.length - 1
        ? this.currentIndex + 1
        : 0;
  }

  async callApi() {
    this.loading = true;
    this.user = this.users.getUser();
    let res = (await this.network.getcourseById(this.course_Id)) as any;

    this.data = res.course;
    this.title = this.data.title;

    this.language = this.data.language.name;
    this.capacity = this.data.capacity;
    this.mode_type = this.data.mode_type;
    this.description = this.formatDescription(this.data.description); // Process the description
    this.from_age = this.data.from_age;
    this.to_age = this.data.to_age;
    this.displayName = this.utility.getAmericanName(this.data.user.name);
    this.duration = this.data.duration;
    this.serial_number = this.data.serial_number;
    this.lessons = this.data.lesson;
    this.image = this.data.image;
    this.rating = this.data.user.teacher.avg_rating;
    this.total_rating = this.data.user.teacher.total_rating;
    this.price = this.data.price;
    this.type = this.data.type;
    this.schedules = this.data.schedules;
    this.flag = this.getFlag();
    this.currencySymbol = this.data.auth_user_currency_symbol;
    this.created_at = this.data.created_at;
    this.updated_at = this.data.updated_at;

    const startDate = this.data.start_date;
    this.startDate = startDate ? moment(startDate).format('DD-MM-Y') : '';

    const endDate = this.data.end_date;
    this.endDate = endDate ? moment(endDate).format('DD-MM-Y') : '';

    if (this.data.category && this.data.category.length > 0) {
      this.categoryId = this.data.category[0].id;
      this.getOtherCourseList(this.data.id);
    }

    const uid = this.user.id;
    const cuid = this.data.user_id;
    if (uid == cuid) {
      this.canEditCourse = true;
    }
    this.loading = false

  }

  formatDescription(description: string): string {
    if (!description) return '';
    return description.replace(/\n/g, '<br>');
  }

  async getOtherCourseList(id) {
    let user = this.users.getUser();
    const obj = {
      user_id: user['id'],
      except_course_id: id,
    };
    const res = await this.network.getOtherCourseList(obj);
    const result = res.result;
    this.otherCourseListTotalCount = result.total;
    this.otherCourseList = result.data;
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
  getFlag() {
    if (this.data && this.data.user.teacher && this.data.user.teacher.country) {
      const flag = this.data.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  openOtherCourses($event) {
    this.nav.push('/courses');
  }

  openDetails() {
    const params = {
      course_Id: this.course_Id,
      edit: true,
      type: this.data.type,
      showBack: true,
      title: 'Edit Course',
    };
    this.nav.push('/course-form', params);
  }

  getOtherCourse(event) {
    console.log(event);
    this.course_Id = event.id;
    this.callApi();

    this.content.scrollToTop(500); // 500ms animation duration

    // console.log(event)
    // // this.callApi();
    // this.nav.push('/course-detail', {
    //   id: event.id
    // })
  }
}
