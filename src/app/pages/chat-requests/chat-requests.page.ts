import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.page.html',
  styleUrls: ['./chat-requests.page.scss'],
})
export class ChatRequestsPage extends BasePage implements OnInit {
  request;
  user
  count;
  constructor(injector:Injector, public chats: ChatService ){
    super(injector)
    this.user = this.users.getUser();
    this.initialize()

   }

  ngOnInit() {

  }

  initialize(){
    this.chats.getChatRequsts()
  }

  async getRequstList() {
    let res = await this.network.getRequestMessagesRoom(this.user.id);
    this.count = res.total;
    this.request = res.data;
  }



}
