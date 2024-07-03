import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-trail-message',
  templateUrl: './trail-message.component.html',
  styleUrls: ['./trail-message.component.scss'],
})
export class TrailMessageComponent extends BasePage implements OnInit {

  message: ''

  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit() { }

  back() {
    this.modals.dismiss()
  }

  submit() {
    console.log(this.message);

    this.modals.dismiss(this.message)
  }


}
