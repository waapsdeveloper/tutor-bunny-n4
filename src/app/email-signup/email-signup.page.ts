import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.page.html',
  styleUrls: ['./email-signup.page.scss'],
})
export class EmailSignupPage extends BasePage implements OnInit {

  formData: any = {
    name: null,
    email: null,
    password: null,
  };

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }

  result(value, key) {
    this.formData[key] = value;
  }

  async setCurrentRole(role_id) {

    const f = this.formData;
    console.log("form", f);
    this.events.publish('teacher-profile-first-screen-submit-call', f)
    if (!f.name || !f.email || !f.password) {
      return
    }

    let obj = {
      "name": f.name,
      "email": f.email,
      "password": f.password,
      "login_type": "email",
      "role_id": role_id
    };

    const res = await this.network.signupViaEmail(obj)

    if(res){
      this.events.publish('get-user-after-submit-form', res.user);
      if(role_id == '3'){
        this.nav.push('/teacher-profile/teacher-profile-edit')
      }

      if(role_id == '2'){
        this.nav.push('/student-profile/student-profile-edit')
      }

    }



  }

  submit() {

  }

  gotoLogin() {
    this.nav.push('/email-login')
  }

}
