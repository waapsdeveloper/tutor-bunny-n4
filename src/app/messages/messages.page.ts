import { Component, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage extends BasePage implements OnInit, ViewWillEnter {
  @ViewChild('scroll', { read: ElementRef }) public scrollableDiv!: ElementRef<any>;
  @ViewChild('messageInput') messageInput!: ElementRef;
  // @Input('item') item: any;
  item;
  chat: any[] = [];
  user_id;
  flag;
  time;
  days;
  messageIds = [];
  user;
  message = '';
  image;
  displayName;
  params;
  @ViewChild(IonContent, { read: IonContent, static: false }) myContent: IonContent;

  constructor(injector: Injector) {
    super(injector)
  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.item) {
      this.item = JSON.parse(this.params.item);
      console.log(this.item);
      this.scrollToBottomOnInit();
      this.initialize();
      this.user = this.users.getUser();
      this.user_id = this.user.id;
      this.flag = this.getFlag();
      this.messageReceivedViaPusher();

    }
  }


  ngOnInit() {

  }

  async initialize() {
    let roomId = this.item.chat_room_id;
    let res = await this.network.getMessages(roomId) as any;
    console.log(res);
    this.days = res.data;
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.image = this.item.user.image;

  }



  messageReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    this.events.subscribe('message-received-via-pusher', this.updateChatsByMessageReceived.bind(this))
  }

  updateChatsByMessageReceived(data: any) {
    this.initialize();

    const dm = data;
    if (dm.chat_room_id == this.item.chat_room_id) {
      this.chat.push(dm);
      setTimeout(() => {
        this.scrollToBottom()
      }, 200);
    }
  }

  scrollToBottom(): void {
    try {
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
      return flag ? flag.toLowerCase() : "";
    } else if (this.item && this.item.user.teacher && this.item.user.teacher.country) {
      const flag = this.item.user.teacher.country.iso2;
      return flag ? flag.toLowerCase() : "";
    } else {
      return "";
    }
  }

  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  onKeyUp(event: any) {
    this.message = event.target.value;
  }

  async sendMessage() {
    if (!this.message) {
      return;
    }

    let newMesg = {
      date: '',
      messages: [
        {
          chat_room_id: this.item.chat_room_id,
          created_at: new Date(),
          id: -1,
          is_read: 0,
          message: this.message,
          updated_at: new Date(),
          user_id: this.user.id,
        }
      ]
    }
    console.log(newMesg);
    this.days.push(newMesg);
    this.scrollToBottomOnInit();

    let obj = {
      chat_room_id: this.item.chat_room_id,
      user_id: this.user.id,
      message: this.message
    }
    this.message = '';
    this.messageInput.nativeElement.value = '';
    let res = await this.network.sendMessage(obj);

  }

  back() {
    this.nav.pop();
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      this.myContent.scrollToBottom(100);
    }, 500);
  }
}
