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
  flag
  name;
  dial_code;
  country


  constructor(injector: Injector) {
    super(injector)
    this.initialize();
  }

  ngOnInit() { }
  async initialize() {
    this.user = this.users.getUser();
    this.name = this.user.name;
    this.image = this.user.image;
    this.flag = this.getFlag();
    if( this.user.teacher){
      this.dial_code = this.user.teacher.dial_code;
      this.country = this.user.teacher.country.name;
    }else{

      this.country = this.user.student.country.name;
    }
  }

  getFlag() {
    if (this.user && this.user.teacher && this.user.teacher.country) {
      const flag = this.user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else if(this.user && this.user.student && this.user.student.country){
      const flag = this.user.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

}
