import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { GlobalTrialsService } from 'src/app/services/global-trials.service';

@Component({
  selector: 'app-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
})
export class TrailListComponent extends BasePage implements OnInit {
  private _item: any;

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    console.log(value);

  }
  flag;
  age;
  @Output() removeFromList = new EventEmitter<number>();

  constructor(injector: Injector, public globalTrials: GlobalTrialsService) {
    super(injector);
  }

  ngOnInit() {
    this.flag = this.getFlag();
    this.calculateAge();
  }

  async trailStatus(key: string) {
    this.globalTrials.removeFromPendingTrials(this.item);
    let obj = {
      status: key,
      user_id: this.item.student.id,
    };
    let trialId = this.item.id;
    let res = await this.network.changeTrailStuts(obj, trialId);
  }

  async presentAlert(item: string) {
    let alertHeader: string;
    switch (item) {
      case 'Accepted':
        alertHeader =
          'Accepting the Trial request will deduct 1 credit Are you sure to accept the request?';
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
    let flag = await this.utility.presentConfirm(
      'Yes',
      'Cancel',
      item,
      alertHeader
    );
    if (flag) {
      this.trailStatus(item);
    }
  }

  goToChat() {
    this.nav.push('/tabs/chat');
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();
    this.age = currentYear - this.item.student.student.dob;
  }
  getFlag() {
    if (
      this.item &&
      this.item.student &&
      this.item.student.student.country.iso2
    ) {
      const flag = this.item.student.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  goToDeatil() {
    const params = {
      id: this.item.course.id,
      backUrl: '/tabs/teacher-dashboard',
    };
    this.nav.push('/tabs/course-detail', params);
  }
}
