import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-trail-message',
  templateUrl: './trail-message.component.html',
  styleUrls: ['./trail-message.component.scss'],
})
export class TrailMessageComponent extends BasePage implements OnInit {

  message: ''

  send = false;

  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit() { }

  back() {
    this.send = false
    let obj= {
      send : this.send,
      message: this.message
    }
    this.modals.dismiss(obj)
  }

  submit() {

    this.send= true
    let obj= {
      send : this.send,
      message: this.message
    }


    console.log(this.message);
    this.modals.dismiss(obj )

  }


}
