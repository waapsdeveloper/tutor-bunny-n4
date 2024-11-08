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

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent extends BasePage implements OnInit {
  private _item: any;
  last_message;
  unread_count;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input('item')
  public get item() {
    return this._item;
  }

  public set item(value: any) {
    this._item = value;
    const time = this.item.updated_at;
    this.unread_count = this.item.unread_count;
    this.last_message = this.item.last_message;
    this.time = moment(time).format('hh:mm a');
  }

  time;

  user;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.events.subscribe('update-chat-count', () => {});

    this.events.subscribe(
      'update-chat-lists',
      (data) => {
        console.log(data);
        this.user = this.users.getUser();
        if (data.chat_room_id == this.item.chat_room_id) {
          this.last_message = data.message;
          if (this.user.id != data.user_id) {
            this.unread_count = parseInt(this.item.unread_count) + 1;
            console.log(this.unread_count);
          }
        }
      },
      true
    );
  }

  async gotoMessage(item) {
    console.log(item);
    // return
    if(item && item.chat_room_id){
      const chat_room_id = item.chat_room_id;
      this.unread_count = 0;
      console.log(this.unread_count);
      let res = await this.nav.push('messages', { chat_room_id: chat_room_id});
      this.onChange.emit();
    }
  }
}
