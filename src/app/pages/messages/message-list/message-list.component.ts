import { Component, Injector, Input, input, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent extends BasePage implements OnInit {
  message;
  status;
  slug = null;
  private _chat: any;

  @Input('chat')
  public get chat() {
    return this._chat;
  }

  public set chat(value: any) {
    this._chat = value;
    this.initialize(value);
  }

  user;
  user_id;

  constructor(injector: Injector, public chats: ChatService) {
    super(injector);
    this.user = this.users.getUser();
    this.user_id = this.user.id;
  }

  async initialize(value) {
    await this.getChatRead(value);

    this.chats.getUnreadMsgCount()

    this.slug = value.slug;
    this.status = value.status;

    this.message = this.formatDescription(value.message);
  }

  formatDescription(description: string): string {
    if (!description) return '';
    return description.replace(/\n/g, '<br>');
  }

  ngOnInit() {}

  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  async getChatRead(item) {
    if (item.user_id != this.user_id) {
      if (item.is_read == 0) {
        this.events.publish('update-chat-list');
        let obj = { ids: [item.id] };
        await this.network.getChatRead(obj);
      }
    }
  }

  addReview(data) {
    this.chats.reviewCoursebyChat(data);

    // return;

    this.nav.push('/tabs/requests', data);
  }
}
