import { Component, Injector, Input, input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BasePage } from 'src/app/base-page/base-page';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent extends BasePage implements OnInit {
  private _chat: any;

  @Input('chat')
  public get chat() {
    return this._chat;
  };

  public set chat(value: any) {
    this._chat = value;
    // console.log(value);
    this.getChatRead(value)

  }

  user;
  user_id;

  constructor(injector: Injector) {
    super(injector)
    this.user = this.users.getUser();
    this.user_id = this.user.id;
    console.log(this.chat);
    

  }

  ngOnInit() { }

  getTime(time) {
    return moment(time).format('hh:mm a');
  }

  async getChatRead(item) {
    
    if(item.user_id != this.user_id){
      if(item.is_read == 0){
        let obj = { ids: [item.id] };
        console.log(obj);
        // return
        
        await this.network.getChatRead(obj, this.user_id);
      }
      else{
        console.log("SDdsfdsfsd");
      }
    }
    else{
      console.log("12345678");
    }

  }


}
