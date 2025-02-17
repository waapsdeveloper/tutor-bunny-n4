import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavService } from 'src/app/services/nav.service';
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.scss'],
})
export class TrailListComponent {
  displayName;
  flag;
  age;
  user;
  student;
  private _item: any;

  @Input() showMoreOptions: boolean = true;
  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.updateItem(value);
  }

  @Output() removeFromList = new EventEmitter<any>();

  // , public globalTrials: GlobalTrialsService
  constructor(
    private nav: NavService,
    private utility: UtilityService,
    private listTrialsService: ListTrialsService,
    private users: UsersService,
    private chats: ChatService
  ) {}

  async updateItem(value: any) {
    console.log(value, 'my value');
    this.student = value.student;
    console.log('I am a teacher', this.student);
    this.displayName = this.utility.getAmericanName(value.student.name);
    this.flag = this.utility.getFlag(value);
    const currentYear = new Date().getFullYear();
    this.age = currentYear - this.item.student.student.dob;

    // let res = await this.network.getTrialById(this.item.id);
    // this.item = res.result;
  }

  async trailStatus(key: string): Promise<void> {
    const res = await this.listTrialsService.changeTrailStuts(
      this.item.id,
      key,
      this.item.student.id
    );
  }

  async presentAlert(key: string) {
    let alertHeader: string;

    let title = '';
    switch (key) {
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
      this.trailStatus(key);
      console.log("i am ");
      this.openChatWithData();
    }
  }



  async openChatWithData() {
    let user = this.users.getUser();
    console.log(this.user);
    const chatRoomId = (await this.chats.getChadRoomId(
      this.student.id,
     user.id,
    )) as number;
    console.log()
    if (chatRoomId != -1) {
      this.nav.push('messages', {
        chat_room_id: chatRoomId,
      });
    }
  }
}
