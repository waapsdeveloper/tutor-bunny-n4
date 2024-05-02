import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides, ViewWillEnter } from '@ionic/angular';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-profile-edit',
  templateUrl: './teacher-profile-edit.page.html',
  styleUrls: ['./teacher-profile-edit.page.scss'],
})
export class TeacherProfileEditPage implements OnInit, ViewWillEnter {
  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;
  user;
  lang;

  params: any;
  backUrl = '/teacher-profile';
  formData: any = {
    name: null,
    country: null,
    state: null,
    phone_number: null,
    address: null,
    language: null,
    subject: null,
    experience: null,
    tital: null,
    about: null,
  };
  contryCode: any;

  constructor(private network: NetworkService, private nav: NavService) {
    this.initialize();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
  }

  async initialize() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    let obj = {
      email: this.user.email,
    };
    console.log(obj);

    let res = await this.network.getUserByEmail(obj);

    if (res) {
      this.setFormDta(res);
    }
  }

  result(value, key) {
    if (key == 'country') {
      this.formData['country'] = value.name;
      this.formData['dial_code'] = value.dial_code;
    } else if (key == 'languages') {
      this.lang = value;
      this.formData['languages'] = value.map((obj) => obj.id);
    } else {
      this.formData[key] = value;
    }
    console.log(this.formData);
  }

  setFormDta(data) {
    this.formData['name'] = data['name'];
  }

  selectedCountry(event) {
    this.contryCode = event.list;
    console.log(this.contryCode);
  }
  async selectedLanguage(event) {
    this.lang = event.list;
    console.log('dsfsfsfsdff', this.lang);
  }

  async onSlideChange() {
    // const activeIndex = await this.slides.getActiveIndex();
    // console.log("Active index:", activeIndex);
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }

  submit() {}
}
