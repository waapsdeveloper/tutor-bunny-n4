import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
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
  @Output() removeFromList = new EventEmitter<number>();
  constructor(injector: Injector, private alertController: AlertController) {
    super(injector)
  }
  ngOnInit() {
    console.log(this.item)
    this.flag = this.getFlag()
    console.log(this.flag);

    let currentDate = this.item.created_at;
    this.time = moment(currentDate).format('HH:mm a');

  }
  getFlag() {
    console.log(this.item.student.student.country.flag);

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
  async trailStatus(key) {

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

  async presentAlert(item) {
    console.log(item);
    // return
    if (item = 'Accepted') {
      const alert = await this.alertController.create({
        header: 'Are you sure to Accept this trail?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.trailStatus(item);
              console.log('Alert confirmed');
            },
          },
        ],
      });
      await alert.present();
    }
    else if (item = 'Rejected') {
      const alert = await this.alertController.create({
        header: 'Are you sure to Reject this trail?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.trailStatus(item);
              console.log('Alert confirmed');
            },
          },
        ],
      });
      await alert.present();
    }
    else if (item = 'Blocked') {
      const alert = await this.alertController.create({
        header: 'Are you sure to Block this trail?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.trailStatus(item);
              console.log('Alert confirmed');
            },
          },
        ],
      });
      await alert.present();
    }
    else if (item = 'Unblock') {
      const alert = await this.alertController.create({
        header: 'Are you sure to Unblock this trail?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.trailStatus(item);
              console.log('Alert confirmed');
            },
          },
        ],
      });
      await alert.present();
    }
    else if (item = 'Complete') {
      const alert = await this.alertController.create({
        header: 'Are you sure to Complete this trail?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => {
              this.trailStatus(item);
              console.log('Alert confirmed');
            },
          },
        ],
      });
      await alert.present();
    }
  }
  goToChat() {
    this.nav.push('/tabs/chat')
  }

}
