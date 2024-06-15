import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  step = 'login';
  formData: any = {
    email: null,
    password: null,
  };
  private _role: any[] = [];
  @Input('preSelectedLanguages')
  public get role() {
    return this._role;
  };

  public set role(value: any[]) {
    this._role = value;
  }
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
  }

  result(value, key) {
    this.formData[key] = value;
  }
  async submit() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    if (!this.formData.email || !this.formData.password) {
      return
    }
    let obj = {
      email: this.formData.email,
      password: this.formData.password,
      role_id: this._role
    }
    const res = await this.network.loginViaEmail(obj) as any;
    if (res) {
      this.users.setUser(res.user);
      this.modals.dismiss(res.user)
    }
  }


  signUp() {
    this.step = "SignUp"
  }

  async SignUpWithEmail() {
    this.events.publish('teacher-profile-first-screen-submit-call', this.formData);
    if (!this.formData.email || !this.formData.password || !this.formData.name || !this.formData.confirm_password) {
      return
    }
    let key = localStorage.getItem('role');
    let obj = {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name,
      confirm_password: this.formData.confirm_password,
      login_type: "email",
      role_id: key
    }
    let res = await this.network.signUpviaEmail(obj) as any;
    if (res) {
      this.users.setUser(res.user);
      this.formData.password = null;
      this.step = 'login'
    }

  }

  back() {
    this.modals.dismiss()
  }
  forgetPassword() {
    this.modals.dismiss();
    this.modals.present(ForgetPasswordComponent, {}, '', 0.7);
  }

}
