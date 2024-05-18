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


  submit(){

  }

  gotoLogin(){
    this.nav.push('/email-login')
  }

}
