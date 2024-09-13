import { Component, Injector, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { BasePage } from 'src/app/base-page/base-page';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage extends BasePage implements OnInit {
  constructor(injector: Injector, public chats: ChatService) {
    super(injector)
  }

  ngOnInit() {
  }


  async initialize() {

    // this.chats.getchatList()

  }

}
