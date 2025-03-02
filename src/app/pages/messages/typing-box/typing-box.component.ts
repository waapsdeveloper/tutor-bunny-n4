import { Component, OnInit, Input } from '@angular/core';
import { ChatMessegesService } from 'src/app/services/chat-messeges.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-typing-box',
  templateUrl: './typing-box.component.html',
  styleUrls: ['./typing-box.component.scss'],
})
export class TypingBoxComponent  implements OnInit {

  isUserTyping: boolean = false;
  @Input() chatItem: any;

  constructor(private events: EventsService, public chatMessageService: ChatMessegesService) { }

  ngOnInit() {
    this.events.subscribe('np-starts-typing', (data) => {
      console.log(data, this.chatItem);

      if(data.chat_room_id === this.chatItem.chat_room_id){
        this.isUserTyping = true;

        setTimeout(() => {
          this.isUserTyping = false;
        }, 2000);
      }
    });
  }

}
