import { Injectable } from '@angular/core';

import { UsersService } from './users.service';
import { NetworkService } from './network.service';
import { NgrxCrudService } from './abstract/ngrx-crud.service';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ListChatsService extends NgrxCrudService<any> {

  ngrxModelName: string = 'ListChatsModel';

  chats;
  chatCount = 0;

  constructor() { 
    super()
  }
}
