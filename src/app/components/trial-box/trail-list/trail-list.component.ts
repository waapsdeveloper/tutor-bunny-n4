import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
})
export class TrailListComponent extends BasePage  implements OnInit {

  @Input() item;
  flag;
  age;

  constructor(injector:Injector) {
    super(injector)
   }

  ngOnInit() {
    console.log(this.item);
    

    this.flag = this.getFlag()
    this.calculateAge();
  }

  async trailStatus(key, item) {
    let obj = {
      status: key,
      user_id: item.student.id
    };
    let trialId = item.id;
    let res = await this.network.changeTrailStuts(obj, trialId);
  }
  goToChat() {
    this.nav.push('/tabs/chat')
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();
    this.age = currentYear - this.item.student.student.dob;
  }
  getFlag() {
    
    if (this.item && this.item.student && this.item.student.student.country.iso2) {
      const flag = this.item.student.student.country.iso2;
      console.log(flag);
      
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }

}
