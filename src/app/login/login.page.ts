import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

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
      password: this.formData.password
    }
    const res = await this.network.loginViaEmail(obj) as any;
    if(res){
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
      confirm_password:this.formData.confirm_password,
      login_type: "email",
      role_id: key
    }
    let res = await this.network.signUpviaEmail(obj) as any;
    if(res){
      this.users.setUser(res.user);
      this.modals.dismiss(res.user)
    }

  }

  back() {
    this.modals.dismiss()
  }

}
