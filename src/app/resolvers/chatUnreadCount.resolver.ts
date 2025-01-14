import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { ChatService } from '../services/chat.service';

export const chatUnreadCountResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(ChatService);
  const router = inject(Router);
  let count = await service.getUnreadCountPromise();
  if (!count || count == 0) {
    service.getUnreadMsgCount()
  }

  // return count;
  return count;
  
};
