import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.page.html',
  styleUrls: ['./email-signup.page.scss'],
})
export class EmailSignupPage implements OnInit {

  formData: any = {
    name: null,
    email: null,
    password: null,
  };

  constructor() { }

  ngOnInit() {
  }

}
