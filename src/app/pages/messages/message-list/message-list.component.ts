import { Component, Injector, Input, input, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent extends BasePage implements OnInit {
  message
  private _chat: any;

  @Input('chat')
  public get chat() {
    return this._chat;
  };

  public set chat(value: any) {
    this._chat = value;
    this.getChatRead(value)
    this.initialize(value)
  }
  
  user;
  user_id;
  
  constructor(injector: Injector) {
    super(injector)
    this.user = this.users.getUser();
    this.user_id = this.user.id;
  }


  initialize(value){
    console.log(value);
    
    this.message = this.formatDescription(value.message);
  }
  
  formatDescription(description: string): string {
    if (!description) return '';
    return description.replace(/\n/g, '<br>');
  }

  ngOnInit() { }

  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  async getChatRead(item) {

    if (item.user_id != this.user_id) {
      if (item.is_read == 0) {
        let obj = { ids: [item.id] };
        await this.network.getChatRead(obj);
        this.events.publish('update-chat-list');
      }
      else {
      }
    }
    else {
    }
  }
}
