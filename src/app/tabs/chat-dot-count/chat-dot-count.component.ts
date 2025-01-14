import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-dot-count',
  templateUrl: './chat-dot-count.component.html',
  styleUrls: ['./chat-dot-count.component.scss'],
})
export class ChatDotCountComponent {

  unreadChatCount$;

  constructor(public chatService: ChatService,) { 
    this.chatService.getUnreadCount().subscribe( data => {
      this.unreadChatCount$ = data;
    })
  }

}
