import {
  Component,
  ElementRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import * as moment from 'moment';
import { ImageViewComponent } from './image-view/image-view.component';
import { ChatService } from '../services/chat.service';

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
  user_id;
  flag;
  image;
  user;
  displayName;
  role_id;
  params;

  constructor(injector: Injector, public chats: ChatService) {
    super(injector);
  }

  adjustHeight(textArea: HTMLTextAreaElement): void {
    textArea.style.height = '50px';
    textArea.style.height = `${textArea.scrollHeight}px`;
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
        },
      ],
    };
    this.chats.days.push(newMesg);
    console.log(this.chats.days);

    console.log(newMesg);

    this.scrollToBottomOnInit();

    let obj = {
      chat_room_id: this.item.chat_room_id,
      user_id: this.user.id,
      message: this.message,
    };
    this.message = '';
    this.messageInput.nativeElement.value = '';
    this.adjustHeight(this.messageInput.nativeElement);

    let res = await this.network.sendMessage(obj);
    this.initialize();
  }

  async ionViewWillEnter() {
    this.params = this.nav.getQueryParams();
    if (this.params.item) {
      this.item = JSON.parse(this.params.item);
      this.scrollToBottomOnInit();
      this.initialize();
      this.user = this.users.getUser();
      this.role_id = this.user.role_id;
      this.user_id = this.user.id;
      this.flag = this.getFlag();
      this.messageReceivedViaPusher();
    }
  }

  ngOnInit() {}

  async initialize() {
    let roomId = this.item.chat_room_id;
    this.chats.getChatMessages(roomId);
    this.displayName = this.utility.getAmericanName(this.item.user.name);
    this.image = this.item.user.image;
  }

  messageReceivedViaPusher() {
    this.events.registerPusherEvent(this.user.id);
    this.events.subscribe(
      'message-received-via-pusher',
      this.updateChatsByMessageReceived.bind(this)
    );
  }

  updateChatsByMessageReceived(data: any) {
    this.initialize();

    const dm = data;
    if (dm.chat_room_id == this.item.chat_room_id) {
      this.chat.push(dm);
      setTimeout(() => {
        this.scrollToBottom();
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
    this.nav.pop();
  }

  openImage(image) {
    this.modals.present(ImageViewComponent, image);
  }

  scrollToBottomOnInit() {
    setTimeout(() => {
      this.myContent.scrollToBottom(100);
    }, 500);
  }
}
