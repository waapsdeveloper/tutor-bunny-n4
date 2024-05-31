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
  showBack
  title;
  onlineMode;
  step = 1;
  formData: any = {
    title: null,
    description: null,
    language_id: null,
    language: {},
    image: null,
    mode_type: {},
    price: null,
    duration: null,
    from_age: null,
    to_age: null,
    category: null,
    keyword: {},
    location: false,
    meeting: null,
    schedules: []
  };
  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {

    console.log(this.formData);
    
      // this.setFormDta();
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

  
  result(value, key){
    console.log(value, key);
    if(key == 'mode_type'){
      this.onlineMode = value.mode;
    }
    this.formData[key] = value;
  }

  onSlideChange(){
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
    this.step = 2;
  }

  async changeToPrev() {

    if (this.step == 2) {
      this.step = 1;
      this.slides?.nativeElement.swiper.slideTo(0, false, false);
    }

  }

}
