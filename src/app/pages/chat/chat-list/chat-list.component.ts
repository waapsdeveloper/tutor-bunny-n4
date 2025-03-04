import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';
import { UserStatusService } from 'src/app/services/user-status.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent extends BasePage implements OnInit {
  private _item: any;
  last_message;
  unread_count;

  status: any = null;


  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    this.initialize(value)
  }

  time;

  user;

  constructor(injector: Injector,
     private chats: ChatService,
     private userStatus: UserStatusService
  ) {
    super(injector);
  }

  async initialize(value){

    const time = value.updated_at;
    this.unread_count = value.unread_count;
    this.last_message = value.last_message;
    this.time = moment(time).format('hh:mm a');

    let userId = value.user.id;
    if(userId){
      const res = await this.userStatus.getUserStatus(userId);
      console.log(res);
      this.status = res;
    }

  }

  ngOnInit() {

    this.events.subscribe(
      'update-chat-lists',
      (data) => {

        this.user = this.users.getUser();
        if (data.chat_room_id == this.item.chat_room_id) {
          this.last_message = data.message;
          this.unread_count = 0;

          if (this.user.id != data.user_id) {
            this.unread_count = parseInt(this.item.unread_count) + 1;

          }
        }
      },
      true
    );
  }

  async gotoMessage(item) {
    this.unread_count = 0;
    if(item && item.chat_room_id){
      const chat_room_id = item.chat_room_id;

    this.chats.getchatList('', 1)

      let res = await this.nav.push('messages', { chat_room_id: chat_room_id});
      this.onChange.emit();
    }
  }
}
