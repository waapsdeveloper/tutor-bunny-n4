import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import * as moment from 'moment';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage extends BasePage implements OnInit, ViewWillEnter {
  @ViewChild('scroll', { read: ElementRef })
  public scrollableDiv!: ElementRef<any>;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild(IonContent, { read: IonContent, static: false })
  myContent: IonContent;

  message = '';
  days = [];
  item: any;
  chat: any[] = [];
  loading = false;
  user_id;
  flag;
  newMesg = {};
  image;
  user;
  displayName;
  role_id;
  params;
  emptyValue;

  combineMessages = [];

  constructor(injector: Injector, public chats: ChatService) {
    super(injector);
    this.chats.getchatList();
  }

  ngOnInit() {
    this.events.subscribe('scroll-to-bottom', () => {
      this.scrollToBottomOnInit();
    });
  }

  async ionViewWillEnter() {
    this.loading = true;
    this.params = this.nav.getQueryParams();

    if (!this.params.chat_room_id) {
      this.nav.pop();
      return;
    }

    const roomId = this.params.chat_room_id;
    this.initialize(roomId);

    this.events.publish('update-chat-count');

    this.messageReceivedViaPusher();
    // }
    this.loading = false;

    this.events.publish('update-chat-count');
  }

  async initialize(roomId) {
    this.loading = true;
    this.loadResolvers();
    this.user = this.dataR.user;
    const ch = await this.chats.getChatRoomInfo(roomId);
    console.log(ch);
    if (!ch) {
      this.nav.pop();
      return;
    }
    await this.chats.getChatMessages(roomId);
    this.item = ch;
    this.displayName = this.utility.getAmericanName(ch.user.name);
    this.image = ch.user.image;
    this.loading = false;
    setTimeout(() => {
      this.myContent.scrollToBottom(100);
      console.log('scroll');
    }, 500);
  }

  messageReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    this.events.subscribe(
      'message-received-via-pusher',
      this.updateChatsByMessageReceived.bind(this)
    );
  }

  updateChatsByMessageReceived(data: any) {
    const dm = data;
    console.log(dm);

    if (dm.chat_room_id == this.item.chat_room_id) {
      console.log(this.chats.days);

      let newMesg = {
        date: 'new message',
        messages: [
          {
            chat_room_id: dm.chat_room_id,
            created_at: new Date(),
            id: dm.id,
            is_read: 0,
            message: dm.message,
            updated_at: new Date(),
            user_id: dm.user_id,
          },
        ],
      };
      this.chats.days.push(newMesg);
      setTimeout(() => {
        this.scrollToBottomOnInit();
      }, 200);
    }
  }

  scrollToBottom(): void {
    try {
      if (this.scrollableDiv) {
        this.scrollableDiv.nativeElement.scrollTop =
          this.scrollableDiv.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  getFlag() {
    if (this.item && this.item.user.student && this.item.user.student.country) {
      const flag = this.item.user.student.country.iso2;
      return flag ? flag.toLowerCase() : '';
    } else if (
      this.item &&
      this.item.user.teacher &&
      this.item.user.teacher.country
    ) {
      const flag = this.item.user.teacher.country.iso2;
      return flag ? flag.toLowerCase() : '';
    } else {
      return '';
    }
  }

  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  back() {
    this.events.publish('clear-chat-data');
    this.nav.pop();
  }

  ngOnDestroy() {
    this.events.publish('clear-params-chat');
  }

  openImage(image) {
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      this.myContent.scrollToBottom(100);
      console.log('scroll');
    }, 500);
  }
  adjustHeight(textArea: HTMLTextAreaElement): void {
    textArea.style.height = '50px';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }
  onKeyUp(event: any) {
    this.message = event.target.value;
  }
  async sendMessage() {
    if (!this.message) return;

    this.newMesg = {
      date: 'Sending...',
      messages: [
        {
          chat_room_id: this.item.chat_room_id,
          created_at: new Date(),
          id: -1,
          is_read: 0,
          message: this.message,
          updated_at: new Date(),
          user_id: this.user.id,
        },
      ],
    };
    this.chats.days.push(this.newMesg);

    this.scrollToBottomOnInit();

    let obj = {
      chat_room_id: this.item.chat_room_id,
      user_id: this.user.id,
      message: this.message,
    };

    this.chats.getchatList();

    this.message = '';
    this.messageInput.nativeElement.value = '';
    this.adjustHeight(this.messageInput.nativeElement);

    let res = await this.network.sendMessage(obj);
    console.log(res);

    await this.chats.getChatMessages(this.item.chat_room_id);
  }
}
