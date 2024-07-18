import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-menu-image-box',
  templateUrl: './menu-image-box.component.html',
  styleUrls: ['./menu-image-box.component.scss'],
})
export class MenuImageBoxComponent extends BasePage implements OnInit {

  user;
  image: any;
  name;
  dial_code;
  phone_number


  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() {}
  async initialize() {
    this.user = this.users.getUser();

    console.log(this.user);

    this.name = this.user.name;
    this.image = this.user.image;
    this.dial_code= this.user.teacher.dial_code;
    this.phone_number= this.user.teacher.phone_number;

    

  }

}
