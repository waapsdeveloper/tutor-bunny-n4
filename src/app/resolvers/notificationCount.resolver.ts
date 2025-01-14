import { inject } from '@angular/core';
import { ResolveFn} from '@angular/router'; // Your data service
import { NotificationsService } from '../services/notifications.service';

export const notificationCountResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(NotificationsService);
  let count = await service.getNotificationUnreadCount();
  return count;
  
};
