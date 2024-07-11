import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(injector:Injector,  private alertController: AlertController) {
    super(injector)
   }

  ngOnInit() {
    console.log(this.item);
    

    this.flag = this.getFlag()
    this.calculateAge();
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

  async presentAlert(item: string) {
    console.log(item);

    let alertHeader: string;
    switch (item) {
      case 'Accepted':
        alertHeader = 'Are you sure to Accept this trail?';
        break;
      case 'Rejected':
        alertHeader = 'Are you sure to Reject this trail?';
        break;
      case 'Blocked':
        alertHeader = 'Are you sure to Block this trail?';
        break;
      case 'Unblock':
        alertHeader = 'Are you sure to Unblock this trail?';
        break;
      case 'Complete':
        alertHeader = 'Are you sure to Complete this trail?';
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
