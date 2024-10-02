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
  displayName
  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    console.log(value);
    this.displayName = this.utility.getAmericanName(value.teacher.name);
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

    let title = '';
    switch (item) {
      case 'Accepted':
        alertHeader =
          'Accepting the request will deduct 1 credit from your account.';
        title = 'Are you sure to Accept the request?';
        break;
      case 'Rejected':

        title = 'Are you sure to Reject the request?';

        break;
      case 'Blocked':

        title = 'Are you sure to Block the request?';

        break;
      case 'Unblock':

        title = 'Are you sure to Unblock the request?';

        break;
      case 'Complete':

        title = 'Are you sure to Complete the request?';

        break;
      default:
        return;
    }
    let flag = await this.utility.presentConfirm(
      'Yes',
      'Cancel',
      title,
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
    console.log(this.item);

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
    this.nav.push('/course-detail', params);
  }
}
