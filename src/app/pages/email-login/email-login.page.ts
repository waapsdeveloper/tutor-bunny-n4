import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.page.html',
  styleUrls: ['./email-login.page.scss'],
})
export class EmailLoginPage extends BasePage implements OnInit {

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

}
