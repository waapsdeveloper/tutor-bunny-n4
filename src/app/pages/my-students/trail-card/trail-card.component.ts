import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  user;
  time;
  age;
  @ViewChild('popover') popover;

  isOpen = false;
  @Output() removeFromList = new EventEmitter<number>();
  constructor(injector: Injector, private globalTrials: GlobalTrialsService) {
    super(injector);
    this.user = this.users.getUser();

  }
  ngOnInit() {
    this.flag = this.getFlag();
    let currentDate = this.item?.created_at;
    this.time = moment(currentDate).format('HH:mm a');
    this.calculateAge();
  }
  getFlag() {
    if (
      this.item &&
      this.item?.student &&
      this.item.student.student.country.flag
    ) {
      const flag = this.item?.student.student.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  async trailStatus(key: string) {
    let obj = {
      status: key,
      user_id: this.item?.student?.id,
    };
    let trialId = this.item.id;
    this.globalTrials.changeStatus(obj, trialId);
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
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

  async goToChat(data) {
    console.log(data);

    let id = this.user.id;

    let obj = {
      user_id_1: this.user.id,
      user_id_2: data.student.id,
    };

    let res = await this.network.getChadRoomId(obj);

    let params = {
      student_id: id,
      other_user_id: data.student.id,
      user: JSON.stringify(data.student),
      chat_room_id: res.chat_room.id,
    };

    this.nav.push('/tabs/chat', params);
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();

    if (
      this.item &&
      this.item?.student &&
      this.item?.student?.student &&
      this.item.student?.student?.dob
    ) {
      this.age = currentYear - this.item.student.student.dob;
    }
  }
  goToDeatil() {
    const params = {
      id: this.item.course.id,
      backUrl: 'my-students',
    };
    this.nav.push('/tabs/course-detail', params);
  }
}
