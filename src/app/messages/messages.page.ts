import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage extends BasePage implements OnInit {

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
    console.log(this.item,"ncsgghs");
    this.initialize();
    this.user = this.users.getUser();
    this.user_id = this.user.id;
    this.flag = this.getFlag();
   
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
    else if(this.item && this.item.user.teacher && this.item.user.teacher.country){
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
  async initialize() {

    let roomId = this.item.chat_room_id;
    let res = await this.network.getMessages(roomId);
    this.chat = res.messages;
    console.log(this.chat);
    


  }

  getTime(time){
    return moment(time).format('hh:mm a');
  }

  onKeyUp(event: any) {
    this.message = event.target.value
  }

  async sendMessage(){
    
    if (!this.message) {
      return;
    }
    let obj= {
      chat_room_id: this.item.chat_room_id,
      user_id: this.user.id,
      message: this.message
    }
    console.log(obj);

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
