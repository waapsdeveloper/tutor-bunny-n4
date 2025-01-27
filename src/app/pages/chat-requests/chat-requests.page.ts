import { Component, Injector, OnInit } from '@angular/core';
import { ListPage } from 'src/app/base-page/list-page';
import { ChatService } from 'src/app/services/chat.service';
import { ListRequestsService } from 'src/app/services/teacher/list-requests.service';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.page.html',
  styleUrls: ['./chat-requests.page.scss'],
})
export class ChatRequestsPage extends ListPage {  

  list$;
  request;
  user
  count;

  // public chats: ChatService

  constructor(injector:Injector, private listRequestsService: ListRequestsService  ){
    super(injector);
    
    this.listRequestsService.getList().subscribe( (data) => {
      this.list$ = data;
    })

   }

   async fetchList(page: number, search: string, status: string): Promise<{ list: any[]; page: number; last_page: number; total: number }> {
    const res = await this.listRequestsService.getRequests(page, search, status);
    return {
      list: res.result.data,
      page: res.result.current_page,
      last_page: res.result.last_page,
      total: res.result.total
    };
  }


}
