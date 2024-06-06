import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, ViewWillEnter } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';
import { AddDatesPage } from '../add-dates/add-dates.page';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.page.html',
  styleUrls: ['./course-form.page.scss'],
})
export class CourseFormPage extends BasePage implements OnInit, ViewWillEnter {
  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;
  params;
  backUrl;
  lang;
  showBack
  title;
  type;
  category;
  image
  onlineMode;
  courseId;
  step = 1;
  formData: any = {
    title: null,
    description: null,
    language: null,
    image: null,
    mode_type: null,
    price: null,
    duration: null,
    from_age: null,
    to_age: null,
    strat_date: null,
    type: null,
    end_date: null,
    category: null,
    keyword: null,
    lesson: null,
    meeting_link: null,
    schedules: null
  };
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }
  ngOnInit() {
  }
  async initialize() {
    console.log(this.formData);
  }
  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
    if (this.params.title) {
      this.title = this.params.title;
    }
    if (this.params.type) {
      this.type = this.params.type;
      console.log(this.type);

    }
    if (this.params.course_Id) {
      this.courseId = this.params.course_Id;
      console.log(this.courseId);
      let res = await this.network.getcourseById(this.courseId) as any;
      console.log(res);
      this.setFormDta(res.course);
    }
  }
  setFormDta(data) {
    this.formData['title'] = data['title'];
    this.formData['description'] = data['description'];
    this.formData['language_id'] = data['language_id'];
    this.formData['price'] = data['price'];
    this.formData['from_age'] = data['from_age'];
    this.formData['to_age'] = data['to_age'];
    this.formData['duration'] = data['duration'];
    this.formData['capacity'] = data['capacity'];
    this.formData['mode_type'] = data['mode_type'];
  }

  result(value, key) {
    this.formData[key] = value;
    if (key == 'category') {
      this.category = value.id;
      this.formData['category_id'] = value.id;
      this.formData['category'] = value;
    }
    if (key == 'mode_type') {
      this.onlineMode = value.mode
      this.formData['mode_type'] = value.mode;
      this.formData['capacity'] = value.capacity;
    }
    if (key == 'image') {
      this.formData['image'] = value.image;
    }
    else if (key == 'language') {
      this.lang = value;
      this.formData['language'] = value;
      this.formData['language_id'] = this.lang.id;
    }
  }
  async onSlideChange() {
    this.events.publish('teacher-course-first-screen-submit-call', this.formData);
    const f = this.formData;
    console.log(f);
    if (!f.title || !f.description || !f.image || !f.price || !f.duration || !f.from_age || !f.language || !f.to_age) {
      console.log("dsada");
      return
    }
    if (f.language.length == 0) {
      console.log(f.teacher.language.length);
      return
    }
    if (f.mode_type.length == 0) {
      console.log(f.teacher.language.length);
      return
    }
    const user = JSON.parse(localStorage.getItem('user'));
    f['user_id'] = user.id;
    f['type'] = this.type
    console.log(f);
    const res = await this.network.SubmitCourse(f);
    console.log(res);
    let courseId = res.course.id;
    console.log(courseId);

    if (courseId) {
      let obj = {
        course_id: courseId,
        image: this.formData.image
      }
      let image = await this.network.postCoursePhoto(obj);
      console.log(image);

    }
    localStorage.setItem('course_Id', courseId)
    this.events.publish('course_Id-get', courseId)
    if (res) {
      this.slides?.nativeElement.swiper.slideTo(1, false, false);
      this.step = 2;
    }
  }
  async changeToPrev() {
    if (this.step == 2) {
      this.step = 1;
      this.slides?.nativeElement.swiper.slideTo(0, false, false);
    }

  }
  async submit() {
    this.events.publish('teacher-course-second-screen-submit-call', this.formData);
    const f = this.formData;
    if (!f.category) {
      console.log("dsada");
      return
    }

    console.log(f)

    const course_id = localStorage.getItem('course_Id');
    console.log("herr", f, course_id)

    const res = await this.network.SubmitSecondCourse(f, course_id);
    if (res && res.message) {
      this.utility.presentSuccessToast(res.message)
    }
    console.log(res);

    this.nav.pop('/tabs/teacher-dashboard')

  }
}
