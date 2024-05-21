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
    console.log(this.formData[key]);

  }
  async submit() {
    console.log(this.formData);

    if (!this.formData.email || !this.formData.password) {
      console.log("fdsdfs");

      return
    }
    let obj = {
      email: this.formData.email,
      password: this.formData.password
    }
    const res = await this.network.loginViaEmail(obj) as any;
    console.log(res);
    if(res){
      this.users.setUser(res.user);
      this.modals.dismiss(res.user)
    }
  }


  signUp() {
    this.step = "SignUp"
  }

  async SignUpWithEmail() {
    console.log(this.formData);

    if (!this.formData.email || !this.formData.password || !this.formData.name) {
      console.log("fdsdfs");

      return
    }
    let key = localStorage.getItem('role');
    let obj = {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name,
      login_type: "email",
      role_id: key
    }
    let res = await this.network.signUpviaEmail(obj) as any;
    console.log(res);
    if(res){
      this.users.setUser(res.user);
      this.modals.dismiss(res.user)
    }

  }

  back() {
    this.modals.dismiss()
  }

}
