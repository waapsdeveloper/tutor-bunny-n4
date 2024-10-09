import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonicSlides, ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-teacher-profile-edit',
  templateUrl: './teacher-profile-edit.page.html',
  styleUrls: ['./teacher-profile-edit.page.scss'],
})
export class TeacherProfileEditPage
  extends BasePage
  implements OnInit, ViewWillEnter
{
  swiperModules = [IonicSlides];
  @ViewChild('slides', { static: false }) slides: any;
  user;
  userId;
  lang;
  sub;
  params: any;
  backUrl;
  edit = false;
  btn: any;
  showBack;
  title = 'Create profile';
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
    terms: true,
    image: null,
    hourly_rate: null,
    photo_id: null,
    qualification_description: null,
    certificate: null,
    started_teaching: null,
    experience_description: null,
    travel_policy: null,
  };
  contryCode: any;
  countryId;
  stateId;
  curruncy = '$';
  travel_policy_name;
  hideTerms = false;
  step = 1;
  @ViewChild(IonContent, { read: IonContent, static: false })
  myContent: IonContent;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
    this.scrollToTopOnInit();
  }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();

    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.title) {
      this.title = this.params.title;
    }

    if (this.params.showBack) {
      this.showBack = this.params.showBack;
    }
  }

  async initialize() {
    this.user = this.users.getUser();
    console.log(this.user);



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
    if (key == 'country') {
      this.countryId = value.id;
      this.formData['country_id'] = value.id;
      this.formData['country'] = value;
      this.formData['dial_code'] = '+' + value.phonecode;
    } else if (key == 'state') {
      this.stateId = value.id;
      this.formData['state_id'] = value.id;
      this.formData['state'] = value;
    } else if (key == 'languages') {
      this.lang = value;
      this.formData['languages'] = value.map((obj) => obj.id);
    } else if (key == 'subjects') {
      this.sub = value;
      this.formData['subjects'] = value.map((obj) => obj.id);
    } else if (key == 'travel_policy') {
      this.formData['travel_policy_id'] = value.id;
      this.formData['travel_policy'] = value;
    } else {
      this.formData[key] = value;
    }
  }

  scrollToTopOnInit() {
    setTimeout(() => {
      this.myContent.scrollToTop(300);
    }, 500);
  }
  setFormDta(data) {
    console.log(data);

    this.formData['name'] = data['name'];
    const cnty = data['teacher']['country'];
    if (cnty) {
      this.edit = true;
      this.countryId = cnty.id;
      this.formData['country_id'] = cnty.id;
      this.formData['country'] = cnty;
      this.formData['dial_code'] = '+' + cnty.phonecode;
    }
    const stt = data['teacher']['state'];
    if (stt) {
      this.stateId = stt.id;
      this.formData['state'] = stt;
      this.formData['state_id'] = stt.id;
    }
    this.formData['phone_number'] = data['teacher']['phone_number'];
    this.formData['qualification_description'] =
      data['teacher']['qualification_description'];
    this.formData['started_teaching'] = data['teacher']['started_teaching'];
    this.formData['experience_description'] =
      data['teacher']['experience_description'];
    this.formData['hourly_rate'] = data['teacher']['hourly_rate'];
    const travel = data['teacher']['travel_policy'];
    if (travel) {
      this.travel_policy_name = travel.name;
      this.formData['travel_policy'] = travel;
      this.formData['travel_policy_id'] = travel.id;
    }

    this.formData['city'] = data['teacher']['city'];
    this.formData['zip_code'] = data['teacher']['zip_code'];
    this.formData['title'] = data['teacher']['title'];
    this.formData['description'] = data['teacher']['description'];
    this.formData['image'] = data['image'];
    this.formData['image'] = data['image'];
    this.formData['photo_id'] = data['teacher']['photo_id'];
    this.formData['terms'] =
      data['teacher']['terms'] == 1 || data['teacher']['terms'] == true;
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
  async changeToPrev() {
    if (this.step == 2) {
      this.step = 1;
      this.slides?.nativeElement.swiper.slideTo(0, false, false);
    }
  }
  async onSlideChange() {
    this.events.publish(
      'teacher-profile-first-screen-submit-call',
      this.formData
    );
    const f = this.formData;

    if (
      !f.name ||
      !f.country ||
      !f.state ||
      !f.dial_code ||
      !f.phone_number ||
      !f.travel_policy ||
      !f.city ||
      !f.zip_code ||
      !f.languages ||
      !f.subjects
    ) {
      return;
    }
    if (f.languages.length == 0) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));

    // const res = await this.network.updateTeacherProfile(f, user.id);
    // if (res) {
      this.slides?.nativeElement.swiper.slideTo(1, false, false);
      this.step = 2;
    // }
    this.scrollToTopOnInit();
  }
  async submit() {
    const data = this.formData;
    this.userId = this.user.id;
    const f = this.formData;

    this.events.publish(
      'teacher-profile-third-screen-submit-call',
      this.formData
    );

    if (
      !f.qualification_description ||
      !f.started_teaching ||
      !f.experience_description ||
      f.qualification_description.length < 250 ||
      f.experience_description.length < 250
    ) {
      return;
    }
    if (!f.certificate) {
      // return;
    }
    if (!this.formData.terms) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await this.network.updateTeacherProfile(f, user.id);
    if (res && res.message) {
      if(this.edit){
        this.utility.presentSuccessToast("Profile updated Successfully");
        this.nav.pop('/tabs/teacher-dashboard')
      }else{
        this.utility.presentSuccessToast("Profile Created Successfully ");
        this.nav.push('/teacher-profile-complete');
      }
    }
  }
  async onSlideChange2() {
    const data = this.formData;
    this.userId = this.user.id;
    const f = this.formData;
    this.events.publish(
      'teacher-profile-second-screen-submit-call',
      this.formData
    );
    if (
      !f.title ||
      !f.hourly_rate ||
      !f.description ||
      f.title.length < 50 ||
      f.title.length > 100 ||
      f.description.length < 400
    ) {
      return;
    }
    if (f.subjects.length == 0) {
      return;
    }
    if (!f.image || !f.photo_id) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    // const res = await this.network.updateTeacherProfile(f, user.id);

    // if (res) {
    //   //   this.utility.presentSuccessToast(res.message)
    //   // }
    //   // this.nav.pop('/tabs/teacher-dashboard')
      this.slides?.nativeElement.swiper.slideTo(2, false, false);
      this.step = 3;
    // }
    this.scrollToTopOnInit();
  }
  disableIfIncomplete() {
    return (
      !this.formData.terms ||
      !this.formData.title ||
      !this.formData.description ||
      !this.formData.image ||
      !this.formData.photo_id
    );
  }
  openGallery($event) {
    this.nav.push('/teacher-profile/teacher-gallery', {
      backUrl: '/teacher-profile/teacher-profile-edit',
      gallary: 'true',
      title: 'Upload Gallery',
    });
  }

  shouldHandleBackToPrevScreen() {
    if (this.step == 2) {
      this.step = 1;

      this.slides?.nativeElement.swiper.slideTo(0, false, false);
      this.scrollToTopOnInit();
    } else if (this.step == 3) {
      this.step = 2;
      this.slides?.nativeElement.swiper.slideTo(1, false, false);
      this.scrollToTopOnInit();
    } else {
      this.nav.pop();
    }
  }

  openUpdateCertificate() {
    this.nav.push('/upload-certificate');
  }
}
