import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { EventsService } from 'src/app/services/events.service';
import { NavService } from 'src/app/services/nav.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.page.html',
  styleUrls: ['./student-profile-edit.page.scss'],
})
export class StudentProfileEditPage implements OnInit, ViewWillEnter {
  params: any;
  backUrl = '/student-profile';
  user;
  photoId;
  formData: any = {
    first_name: null,
    last_name: null,
    dob: null,
    country: null,
    state: null,
    dial_code: null,
    phone_number: null,
    image: null,
    terms: false
  };
  countryId;
  hideTerms = false;

  constructor(private network: NetworkService, private nav: NavService, private events: EventsService) {
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
    // console.log(this.user);
    let obj = {
      email: this.user.email,
    };
    // console.log(obj);

    let res = await this.network.getUserByEmail(obj);

    // console.log(res)
    if (res) {
      localStorage.setItem('user', JSON.stringify(res.user));
      this.setFormDta(res.user);
    }
  }

  setFormDta(data) {
    // console.log(data);

    this.formData['first_name'] = data['student']['first_name'];
    this.formData['last_name'] = data['student']['last_name'];
    const cnty = data['student']['country'];
    if (cnty) {
      this.countryId = cnty.id;
      this.formData['country_id'] = cnty.id;
      this.formData['country'] = cnty;
      this.formData['dial_code'] = '+' + cnty.phonecode;
    }
    const stt = data['student']['state']
    if (stt) {
      this.formData['state'] = stt;
      this.formData['state_id'] = stt.id;
    }
    this.formData['phone_number'] = data['student']['phone_number'];
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
      this.photoId = res.result.image;

    };
    reader.readAsDataURL(file);
  }
  async submit() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    const f = this.formData;
    // console.log("form", f);
    if (!f.first_name || !f.last_name || !f.country || !f.state || !f.dial_code || !f.phone_number) {
      return
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await this.network.updateStudentProfile(f, user.id)

    this.nav.push('/tabs/student-dashboard')

  }

  skipToStudentDashboard() {
    this.nav.push('/tabs/student-dashboard');
  }

  disableIfIncomplete() {
    return !this.formData.terms
  }

}
