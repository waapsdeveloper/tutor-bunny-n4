import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { ListChatsService } from '../services/list-chats.service';
// import { ChatService } from '../services/chat.service';

export const chatListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(ListChatsService);
  const router = inject(Router);


  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getchatsFromApi('', 1, false);
  }

  // return count;
  return 0;
  
};
