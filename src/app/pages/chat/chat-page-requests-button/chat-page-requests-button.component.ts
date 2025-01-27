import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';
import { ListRequestsService } from 'src/app/services/teacher/list-requests.service';

@Component({
  selector: 'app-chat-page-requests-button',
  templateUrl: './chat-page-requests-button.component.html',
  styleUrls: ['./chat-page-requests-button.component.scss'],
})
export class ChatPageRequestsButtonComponent  implements OnInit {


  requestCount$;

  constructor(public nav: NavService, public listRequestsService: ListRequestsService) { }

  ngOnInit() {
    this.listRequestsService.getCount().subscribe( (data) => {
      console.log('count-data')
      this.requestCount$ = data;
    });

  }

  async showRequests() {
    this.nav.push('chat-requests');
  }

}
