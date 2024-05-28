import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, ViewWillEnter } from '@ionic/angular';
import { BasePage } from '../base-page/base-page';

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
  step = 1;
  formData: any = {
    name: null,
    country: null,
    state: null,
    dial_code: null,
    phone_number: null,
    city: null,
    zip_code: null,
    languages: null,
    subjects: null,
    title: null,
    description: null,
    terms: false,
    image: null,
    photo_id: null

  };
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
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
