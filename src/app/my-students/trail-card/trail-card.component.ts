import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';
@Component({
  selector: 'app-trail-card',
  templateUrl: './trail-card.component.html',
  styleUrls: ['./trail-card.component.scss'],
})
export class TrailCardComponent extends BasePage implements OnInit {
  @Input() item: any;
  flag;
  date;
  time;
  age;
  @ViewChild('popover') popover;

  isOpen = false;
  @Output() removeFromList = new EventEmitter<number>();
  constructor(injector: Injector, private globalTrials: GlobalTrialsService) {
    super(injector)
  }
  ngOnInit() {
    this.flag = this.getFlag();
    let currentDate = this.item.created_at;
    this.time = moment(currentDate).format('HH:mm a');
    this.calculateAge();


  }
  getFlag() {
    if (this.item && this.item.student && this.item.student.student.country.flag) {
      const flag = this.item.student.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }
  }
  async trailStatus(key: string) {
    // return


    let obj = {
      status: key,
      user_id: this.item.student.id
    };
    let trialId = this.item.id;

    this.globalTrials.changeStatus(obj, trialId)




  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  async presentAlert(item: string) {

    let alertHeader: string;
    switch (item) {
      case 'Accepted':
        alertHeader = 'Are you sure to Accept this trial?';
        break;
      case 'Rejected':
        alertHeader = 'Are you sure to Reject this trial?';
        break;
      case 'Blocked':
        alertHeader = 'Are you sure to Block this trial?';
        break;
      case 'Unblock':
        alertHeader = 'Are you sure to Unblock this trial?';
        break;
      case 'Complete':
        alertHeader = 'Are you sure to Complete this trial?';
        break;
      default:
        return;
    }

    const flag = await this.utility.presentConfirm('Yes', 'Cancel', item, alertHeader)
    if(flag){
      this.trailStatus(item);
    }
  }

  goToChat() {

    const params = {
      user: this.item.student,

    }

    this.nav.push('/tabs/chat', params)
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();

    if(this.item && this.item.student && this.item.student.student && this.item.student.student.dob){
      this.age = currentYear - this.item.student.student.dob;
    }



  }
  goToDeatil() {

    const params = {
      id: this.item.course.id,
      backUrl: 'my-students'
    }
    this.nav.push('/tabs/course-detail', params)

  }

}
