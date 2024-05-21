import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicSlides, ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-profile-edit',
  templateUrl: './teacher-profile-edit.page.html',
  styleUrls: ['./teacher-profile-edit.page.scss'],
})
export class TeacherProfileEditPage extends BasePage implements OnInit, ViewWillEnter, AfterViewInit {
  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;
  user;
  userId;
  lang;
  sub;
  params: any;
  backUrl = '/teacher-profile';
  btn: any;
  title = "Create profile";
  backBtn = false;
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
  contryCode: any;
  countryId;
  stateId;
  hideTerms = false;
  step = 1;

  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    console.log(this.params);

    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.title) {
      this.title = this.params.title;
    }


  }

  async initialize() {
    this.user = this.users.getUser();
    let obj = {
      email: this.user.email,
    };
    let res = await this.network.getUserByEmail(obj);
    if (res) {
      this.users.setUser(res.user);
      this.setFormDta(res.user);
    }
  }
  result(value, key) {
    console.log(value, key);
    if (key == 'country') {
      this.countryId = value.id;
      this.formData['country_id'] = value.id;
      this.formData['country'] = value;
      this.formData['dial_code'] = '+' + value.phonecode;
    } else if (key == 'state') {
      this.stateId = value.id
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
  }
  setFormDta(data) {
    this.formData['name'] = data['name'];
    const cnty = data['teacher']['country'];
    if (cnty) {
      this.countryId = cnty.id;
      this.formData['country_id'] = cnty.id;
      this.formData['country'] = cnty;
      this.formData['dial_code'] = '+' + cnty.phonecode;
    }
    const stt = data['teacher']['state']
    if (stt) {
      this.stateId = stt.id;
      this.formData['state'] = stt;
      this.formData['state_id'] = stt.id;
    }
    this.formData['phone_number'] = data['teacher']['phone_number'];
    this.formData['city'] = data['teacher']['city'];
    this.formData['zip_code'] = data['teacher']['zip_code'];
    this.formData['title'] = data['teacher']['title'];
    this.formData['description'] = data['teacher']['description'];
    this.formData['image'] = data['image'];
    this.formData['photo_id'] = data['teacher']['photo_id'];
    this.formData['terms'] = data['teacher']['terms'] == 1 || data['teacher']['terms'] == true;
    if (this.formData['terms'] == true) {
      this.hideTerms = true;
    }
  }
  selectedCountry(event) {
    this.contryCode = event.list;
  }
  async selectedLanguage(event) {
    this.lang = event.list;
  }
  async selevtedSubject(event) {
    this.sub = event.list;
  }
  async onSlideChange() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    const f = this.formData;
    if (!f.name || !f.country || !f.state || !f.dial_code || !f.phone_number || !f.city || !f.zip_code || !f.languages || !f.subjects) {
      return
    }
    const user = JSON.parse(localStorage.getItem('user'));

    const res = await this.network.updateTeacherProfile(f, user.id);
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
    const data = this.formData;
    console.log(data);
    this.userId = this.user.id;

    const f = this.formData;
    this.events.publish('teacher-profile-second-screen-submit-call', this.formData);
    if (!f.title || !f.description || f.title.length < 50 || f.title.length > 100 || f.title.description < 400) {
      return
    }

    if (!f.image || !f.photo_id) {
      return;
    }

    if (!this.formData.terms) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    console.log("efferfS");
    const res = await this.network.updateTeacherProfile(f, user.id)
    this.nav.push('/tabs/teacher-dashboard')

  }
  disableIfIncomplete() {
    return !this.formData.terms || !this.formData.title || !this.formData.description || !this.formData.image || !this.formData.photo_id
  }
  openGallery($event) {
    this.nav.push('/teacher-profile/teacher-gallery', {
      backUrl: '/teacher-profile/teacher-profile-edit',
      gallary: "true", title: 'Upload Gallery'
    })
  }
}
