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
  image
  onlineMode;
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
    category: null,
    keyword: null,
    meeting: null,
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
  ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.title) {
      this.title = this.params.title;
    }

  }
  result(value, key) {
    // console.log(value, key);
    this.formData[key] = value;

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
    // this.events.publish('teacher-course-first-screen-submit-call', this.formData);
    // const f = this.formData;
    // console.log(f);

    // if (!f.title || !f.description || !f.image || !f.price || !f.duration || !f.from_age || !f.language || !f.to_age) {
    //   console.log("dsada");

    //   return
    // }
    // if (f.language.length == 0) {
    //   console.log(f.teacher.languages.length);

    //   return
    // }
    // if (f.mode_type.length == 0) {
    //   console.log(f.teacher.languages.length);

    //   return
    // }
    // const user = JSON.parse(localStorage.getItem('user'));

    // f['user_id'] = user.id

    // console.log(f)

    // const res = await this.network.SubmitCourse(f);
    // console.log(res);

    // let courseId = res.result.id;
    // console.log(courseId);
    // localStorage.setItem('course_Id', courseId)


    // if (res) {
      this.slides?.nativeElement.swiper.slideTo(1, false, false);
      this.step = 2;
    // }
  }

  async changeToPrev() {

    if (this.step == 2) {
      this.step = 1;
      this.slides?.nativeElement.swiper.slideTo(0, false, false);
    }

  }

  submit() {

  }

}
