import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
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
  constructor(injector: Injector, private alertController: AlertController) {
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
    let res = await this.network.changeTrailStuts(obj, trialId);
    if (res.status === 200) {
      this.removeFromList.emit(this.item.id);
    }
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

    const alert = await this.alertController.create({
      header: alertHeader,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.trailStatus(item);
          },
        },
      ],
    });
    await alert.present();
  }

  goToChat() {

    const params = {
      user: this.item.student,

    }

    this.nav.push('/tabs/chat', params)
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();

    this.age = currentYear - this.item.student.student.dob;

  }
  goToDeatil() {

    const params = {
      id: this.item.course.id,
      backUrl: 'my-students'
    }
    this.nav.push('/tabs/course-detail', params)

  }

}
