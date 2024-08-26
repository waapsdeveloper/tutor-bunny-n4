import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.page.html',
  styleUrls: ['./chat-requests.page.scss'],
})
export class ChatRequestsPage extends BasePage implements OnInit {
  request;
  user
  count;
  constructor(injector:Injector) {
    super(injector)
    this.user = this.users.getUser();
    this.initialize()

   }

  ngOnInit() {
  }

  initialize(){
    this.getRequstList()
  }

  async getRequstList() {
    let res = await this.network.getRequestMessagesRoom(this.user.id);
    console.log(res);
    this.count = res.total;
    this.request = res.data;
  }

  reloadList() {
    this.getRequstList();
    this.initialize()
  }

}
