import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  userId;
  lang;
  sub;
  params: any;
  backUrl = '/teacher-profile';
  formData: any = {
    name: null,
    country: null,
    state: null,
    dial_code: null,
    phone_number: null,
    address: null,
    languages: null,
    subject: null,
    experience: null,
    title: null,
    description: null,
  };
  contryCode: any;
  constructor(private network: NetworkService, private nav: NavService,public formBuilder: FormBuilder) {
    this.initialize();
  }
  ngOnInit() { }

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
      this.setFormDta(res.user);
    }
  }
  result(value, key) {
    if (key == 'country') {
      this.formData['country'] = value.name;
      this.formData['dial_code'] = value.dial_code;
    } else if (key == 'languages') {
      this.lang = value;
      this.formData['languages'] = value.map((obj) => obj.id);
    } else if (key == 'subject') {
      this.sub = value;
      this.formData['subject'] = value.map((obj) => obj.id);
    } else {
      this.formData[key] = value;
    }
    console.log(this.formData);
  }
  setFormDta(data) {
    this.formData['name'] = data['name'];
    this.formData['country'] = data['country'];
    this.formData['state'] = data['state'];
    this.formData['dial_code'] = data['dial_code'];
    this.formData['phone_number'] = data['phone_number'];
    this.formData['address'] = data['address'];
    this.formData['languages'] = data['languages'];
    this.formData['subject'] = data['subject'];
    this.formData['experience'] = data['experience'];
    this.formData['title'] = data['title'];
    this.formData['description'] = data['description'];
    console.log("tsahgdvshgf",data);
  }
  selectedCountry(event) {
    this.contryCode = event.list;
    console.log(this.contryCode);
  }
  async selectedLanguage(event) {
    this.lang = event.list;
    console.log('dsfsfsfsdff', this.lang);
  }
  async selevtedSubject(event) {
    this.sub = event.list;
    console.log('dsfsfsfsdff', this.sub);
  }
  async onSlideChange() {
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }
  async submit() {
      const data = this.formData;
      this.userId = this.user.id;
      const res = await this.network.createProfile(data, this.userId)

  }
  openGallery($event){
    console.log("open gallery")
    this.nav.push('/teacher-profile/teacher-gallery')
  }
}
