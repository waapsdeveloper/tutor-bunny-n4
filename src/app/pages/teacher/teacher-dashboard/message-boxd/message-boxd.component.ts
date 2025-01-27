import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavService } from 'src/app/services/nav.service';
import { ListRequestsService } from 'src/app/services/teacher/list-requests.service';

@Component({
  selector: 'app-message-boxd',
  templateUrl: './message-boxd.component.html',
  styleUrls: ['./message-boxd.component.scss'],
})
export class MessageBoxdComponent  implements OnInit {

  list$;

  constructor(public nav: NavService, public listRequestsService: ListRequestsService) { }

  ngOnInit() {
    this.listRequestsService.getList().subscribe( (data) => {
      this.list$ = data;
    })
  }

  async showRequests() {
    this.nav.push('chat-requests');
  }

}
