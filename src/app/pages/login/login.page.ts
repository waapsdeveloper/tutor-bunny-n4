import { Component, Injector, Input } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage {
  step = 'login';
  showLoader = false;

  formData: any = {
    email: null,
    password: null,
  };

  @Input() role_id: any = '';

  constructor(injector: Injector) {
    super(injector);
  }

  result(value, key) {
    this.formData[key] = value;
  }

  async submit() {
    this.events.publish(
      'teacher-profile-first-screen-submit-call',
      this.formData
    );
    if (!this.formData.email || !this.formData.password) {
      return;
    }
    this.showLoader = true;
    let d = {
      email: this.formData.email,
      password: this.formData.password,
      role_id: this.role_id,
    };
    const res = (await this.network.loginViaEmail(d)) as any;

    this.showLoader = false;



    if (res) {
      let obj = {
        step: 1,
        user: res.user,
        token: res.token
      };
      this.modals.dismiss(obj);
    }
  }

  forgetPassword() {

    let obj = {
      step: 3,
    };

    this.modals.dismiss(obj);
  }
}
