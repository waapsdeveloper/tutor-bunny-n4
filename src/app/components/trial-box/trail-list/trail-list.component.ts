import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
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
  @Output() removeFromList = new EventEmitter<number>();

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
    if (res.status === 200) {
      this.removeFromList.emit(item.id);
    }
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


  goToDeatil(){
    
    const params = {
      id: this.item.course.id,
      backUrl: '/tabs/teacher-dashboard'
    }
    this.nav.push('/tabs/course-detail', params)

  }

}
