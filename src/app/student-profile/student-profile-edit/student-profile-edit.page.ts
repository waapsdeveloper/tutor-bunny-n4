import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.page.html',
  styleUrls: ['./student-profile-edit.page.scss'],
})
export class StudentProfileEditPage implements OnInit, ViewWillEnter {
  params: any;
  backUrl = '/student-profile';
  formData: any = {
    first_name: null,
    last_name: null,
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
  constructor(private nav: NavService) {}

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.params = this.nav.getQueryParams();
    if (this.params.backUrl) {
      this.backUrl = this.params.backUrl;
    }
  }

  result(value, key) {
    if (key == 'country') {
      this.formData['country'] = value.name;
      this.formData['dial_code'] = value.dial_code;
    } else {
      this.formData[key] = value;
    }
    console.log(this.formData);
  }

  submit() {}
}
