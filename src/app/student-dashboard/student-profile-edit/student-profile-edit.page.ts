import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.page.html',
  styleUrls: ['./student-profile-edit.page.scss'],
})
export class StudentProfileEditPage extends BasePage implements OnInit, ViewWillEnter {
  params: any;
  backUrl = '/student-profile';
  showBack = false;
  user;
  photoId;
  formData: any = {
    name: null,
    dob: null,
    country: null,
    state: null,
    city: null,
    zip_code: null,
    dial_code: null,
    phone_number: null,
    image: null,
    terms: false
  };
  countryId;
  stateId;
  hideTerms = false;

  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }

    if (this.params.showBack) {
      this.showBack = this.params.showBack;
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

  setFormDta(data) {
    console.log(data);

    this.formData['name'] = data['name'];
    const cnty = data['student']['country'];
    if (cnty) {
      this.countryId = cnty.id;
      this.formData['country_id'] = cnty.id;
      this.formData['country'] = cnty;
      this.formData['dial_code'] = '+' + cnty.phonecode;
    }
    const stt = data['student']['state']
    if (stt) {
      this.stateId = stt.id
      this.formData['state'] = stt;
      this.formData['state_id'] = stt.id;
    }
    this.formData['phone_number'] = data['student']['phone_number'];
    this.formData['dob'] = data['student']['dob'];
    this.formData['city'] = data['student']['city'];
    this.formData['zip_code'] = data['student']['zip_code'];
    this.formData['image'] = data['image'];
    this.formData['terms'] = data['student']['terms'] == 1 || data['student']['terms'] == true;
    if (this.formData['terms'] == true) {
      this.hideTerms = true;
    }
  }

  result(value, key) {
    if (key == 'country') {
      this.countryId = value.id;
      // console.log(this.countryId);
      this.formData['country_id'] = value.id;
      this.formData['country'] = value;
      this.formData['dial_code'] = '+' + value.phonecode;
    } else if (key == 'state') {
      this.stateId = value.id
      this.formData['state_id'] = value.id;
      this.formData['state'] = value;
    } else {
      this.formData[key] = value;
    }
    // console.log(this.formData);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const pmi = reader.result as string;
      // console.log(this.photoId);

      // send it to API for upload
      let user = JSON.parse(localStorage.getItem('user'));

      let obj = {
        user_id: user.id,
        image: pmi
      }

      const res = await this.network.postStudentPhotoIdImage(obj)
      // console.log(res);
      this.formData.image = res.result.image;

    };
    reader.readAsDataURL(file);
  }
  async submit() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    this.events.publish('student-profile-first-screen-submit-call', this.formData);
    const f = this.formData;
    console.log("form", f);
    if (!f.name || !f.country || !f.state || !f.city || !f.zip_code || !f.dial_code || !f.phone_number || !f.dob || !f.terms) {
      return
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await this.network.updateStudentProfile(f, user.id)

    if(res){
      this.events.publish('get-user-after-submit-form', user)
      this.nav.push('/tabs/student-dashboard')
    }


  }

  skipToStudentDashboard() {
    this.nav.push('/tabs/student-dashboard');
  }

  disableIfIncomplete() {
    return !this.formData.terms
  }

}
