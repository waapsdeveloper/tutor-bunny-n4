import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.page.html',
  styleUrls: ['./email-login.page.scss'],
})
export class EmailLoginPage implements OnInit {

  formData: any = {
    email: null,
    password: null,
  };

  constructor() { }

  ngOnInit() {
  }

}
