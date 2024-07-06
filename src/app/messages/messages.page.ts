import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage extends BasePage implements OnInit {
  @ViewChild('scroll', { read: ElementRef }) public scrollableDiv!: ElementRef<any>;
  @Input('item') item: any;
  chat;
  user_id;
  flag;
  time;
  user;
  message;
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;
  constructor(injector: Injector) {
    super(injector)


  }

  ngOnInit() {
    this.scrollToBottomOnInit();
    // console.log(this.item, "ncsgghs");
    this.initialize();
    this.user = this.users.getUser();
    this.user_id = this.user.id;
    this.flag = this.getFlag();
    this.messageReceivedViaPusher()

  }


  async initialize() {

    let roomId = this.item.chat_room_id;
    let res = await this.network.getMessages(roomId);
    this.chat = res.messages;
    this.getChatRead(this.chat)

  }

  async getChatRead(chat) {
    console.log(chat);

    const ids = chat.filter(x => x.is_read == 0).map(y => y.id)
    console.log(ids);
    let obj = {
      ids: ids
    }

    let res = await this.network.getChatRead(obj);
    console.log('====================================');
    console.log(res);
    console.log('====================================');


  }


  messageReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    this.events.subscribe('message-received-via-pusher', this.updateChatsByMessageReceived.bind(this))
  }

  updateChatsByMessageReceived(data: any) {
    console.log(data);
    if (!data) {
      return;
    }

    const dm = data;

    console.log(dm.chat_room_id, this.item.chat_room_id, dm.chat_room_id == this.item.chat_room_id)
    if (dm.chat_room_id == this.item.chat_room_id) {
      this.chat.push(dm);
      setTimeout(() => {
        this.scrollToBottom()
      }, 200);

    }

  }
  scrollToBottom(): void {
    try {
      console.log(this.scrollableDiv)
      if (this.scrollableDiv) {
        this.scrollableDiv.nativeElement.scrollTop = this.scrollableDiv.nativeElement.scrollHeight;
      }

    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  getFlag() {
    if (this.item && this.item.user.student && this.item.user.student.country) {
      const flag = this.item.user.student.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    }
    else if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;

      if (flag) {
        return flag.toLowerCase();
      } else {
        return ""
      }
    } else {
      return ""
    }

  }


  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  onKeyUp(event: any) {
    this.message = event.target.value
  }

  async sendMessage() {

    if (!this.message) {
      return;
    }
    let obj = {
      chat_room_id: this.item.chat_room_id,
      user_id: this.user.id,
      message: this.message
    }
    // console.log(obj);

    let res = await this.network.sendMessage(obj);

    console.log(res);
    this.initialize();


  }

  back() {
    this.modals.dismiss();
  }
  scrollToBottomOnInit() {
    setTimeout(() => {
      this.myContent.scrollToBottom(100);
    }, 1000);
  }
}
