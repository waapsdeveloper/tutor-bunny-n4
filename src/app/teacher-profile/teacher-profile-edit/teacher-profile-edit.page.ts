import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicSlides, ViewWillEnter } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
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
    subjects: null,
    title: null,
    description: null,
    terms: false,
    image: null,
    photo_id: null

  };
  contryCode: any;
  countryId;
  hideTerms = false;

  constructor(private network: NetworkService, private nav: NavService, public formBuilder: FormBuilder, private events: EventsService) {
    this.initialize();
  }
  ngOnInit() {

  }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
  }
  async initialize() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
      let obj = {
        email: this.user.email,
      };
      // console.log(obj);
      let res = await this.network.getUserByEmail(obj);
    if (res) {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.setFormDta(res.user);
    }
  }
  result(value, key) {
    // console.log(value);
    if (key == 'country') {
      this.countryId = value.id;
      this.formData['country_id'] = value.id;
      this.formData['country'] = value;
      this.formData['dial_code'] = '+' + value.phonecode;
    } else if (key == 'state') {
      this.formData['state_id'] = value.id;
      this.formData['state'] = value;
    } else if (key == 'languages') {
      this.lang = value;
      this.formData['languages'] = value.map((obj) => obj.id);
    } else if (key == 'subjects') {
      this.sub = value;
      this.formData['subjects'] = value.map((obj) => obj.id);
    } else {
      this.formData[key] = value;
    }
    // console.log(this.formData);
  }
  setFormDta(data) {
    this.formData['name'] = data['name'];
    const cnty = data['teacher']['country'];
    if(cnty){
      this.countryId = cnty.id;
      this.formData['country_id'] = cnty.id;
      this.formData['country'] = cnty;
      this.formData['dial_code'] = '+' + cnty.phonecode;
    }
    const stt = data['teacher']['state']
    if(stt){
      this.formData['state'] = stt;
      this.formData['state_id'] = stt.id;
    }
    this.formData['phone_number'] = data['teacher']['phone_number'];
    this.formData['address'] = data['teacher']['address'];
    this.formData['title'] = data['teacher']['title'];
    this.formData['description'] = data['teacher']['description'];
    this.formData['image'] = data['image'];
    this.formData['photo_id'] = data['teacher']['photo_id'];
    this.formData['terms'] = data['teacher']['terms'] == 1 || data['teacher']['terms'] == true;
    if(this.formData['terms'] == true){
      this.hideTerms = true;
    }
  }
  selectedCountry(event) {
    this.contryCode = event.list;
  }
  async selectedLanguage(event) {
    this.lang = event.list;
    // console.log('dsfsfsfsdff', this.lang);
  }
  async selevtedSubject(event) {
    this.sub = event.list;
    // console.log('dsfsfsfsdff', this.sub);
  }
  async onSlideChange() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    const f = this.formData;
    // console.log("form", f);
    if (!f.name || !f.country || !f.state || !f.dial_code || !f.phone_number || !f.address || !f.languages || !f.subjects) {
      return
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await this.network.updateTeacherProfile(f, user.id)
    this.slides?.nativeElement.swiper.slideTo(1, false, false);
  }
  async submit() {
    const data = this.formData;
    this.userId = this.user.id;
    if (this.formData.terms) {
      const f = this.formData;
      this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
      if (!f.title || !f.description) {
        return
      }
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await this.network.updateTeacherProfile(f, user.id)

      this.nav.push('/tabs/teacher-dashboard')
    }
  }
  disableIfIncomplete(){
    return !this.formData.terms || !this.formData.title || !this.formData.description || !this.formData.image || !this.formData.photo_id
  }
  openGallery($event) {
    // console.log("open gallery")
    this.nav.push('/teacher-profile/teacher-gallery')
  }
}
