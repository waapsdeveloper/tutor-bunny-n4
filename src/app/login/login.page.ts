import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BasePage implements OnInit {

  step= 'login';
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

  submit(){

  }

  signUp(){
    this.step = "SignUp"
  }

}
