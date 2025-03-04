import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import * as moment from 'moment';
import { ChatService } from 'src/app/services/chat.service';
import { ListChatsService } from 'src/app/services/list-chats.service';
import { ListRequestsService } from 'src/app/services/teacher/list-requests.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage extends BasePage implements OnInit {

  list$;
  requestList$;

  isSearchBarShow = false;
  search;
  showChat = 'inbox';
  activeUser;

  // request;
  // time;
  // params;
  // teacher
  // student;
  // count;
  // user_1;
  // user;
  // role_id;
  // chat_room_id;
  // chat_;
  // other_user_id;

  // public chats: ChatService
  constructor(injector: Injector, private listChatService: ListChatsService, private listRequestsService: ListRequestsService  ) {
    super(injector); 

    // this.initialize();
    // this.activeUser = this.users.getUser();

    this.listChatService.getList().subscribe( (data) => {
      this.list$ = data;
    });
    
    this.listRequestsService.getList().subscribe( (data) => {
      this.requestList$ = data;
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

  ngOnInit(): void {
    //
    this.activeUser = this.users.getUser();
  }
  

  // ngOnDestroy() {
  //   this.user = null;
  //   this.other_user_id = null;
  // }


  // ionViewDidLeave() {
  //   this.user = null;
  //   this.other_user_id = null;
  // }

  // doSearch(event) {
  //   this.chats.getchatList(this.search, 1)
  // }



  // async initialize() {
  //   await this.chats.getchatList(this.search, 1);
  // }

  // async handleRefresh(event) {

  //   await this.chats.getchatList('', 1);
  //   event.target.complete();
  // }

  // getTime(time) {
  //   moment.updateLocale('en', {
  //     relativeTime: {
  //       future: "in %s",
  //       past: "%s ago",
  //       s: 'few seconds',
  //       ss: '%d s',
  //       m: "a minute",
  //       mm: "%d m",
  //       h: "an hour",
  //       hh: "%d h",
  //       d: "a day",
  //       dd: "%d d",
  //       M: "a month",
  //       MM: "%d M",
  //       y: "a year",
  //       yy: "%d y"
  //     }
  //   });
  //   this.time = moment(time).fromNow();
  //   return this.time
  // }

  // async gotoMessage(item) {
  //   this.initialize()
  // }

  // // async getRequstList() {
  // //   let res = await this.network.getRequestMessagesRoom(this.user_1.id);
  // //   this.request = res.data;
  // // }


  // ShowSearchBar(event) {
  //   this.isSearchBarShow = !this.isSearchBarShow;
  // }


}
