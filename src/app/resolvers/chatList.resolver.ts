import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { ChatService } from '../services/chat.service';

export const chatListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(ChatService);
  const router = inject(Router);


  // let count = await service.getCountPromise();
  // if (!count || count == 0) {
  //   service.getchatList('', 1, false);
  // }

  // return count;
  return 0;
  
};
