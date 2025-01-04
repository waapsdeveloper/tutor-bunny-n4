import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-message-boxd',
  templateUrl: './message-boxd.component.html',
  styleUrls: ['./message-boxd.component.scss'],
})
export class MessageBoxdComponent  implements OnInit {

  constructor(public nav: NavService, public chats: ChatService) { }

  ngOnInit() {

  }

  async showRequests() {
    this.nav.push('chat-requests');
  }

}
