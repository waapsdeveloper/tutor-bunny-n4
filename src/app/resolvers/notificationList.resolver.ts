import { inject } from '@angular/core';
import { ResolveFn} from '@angular/router'; // Your data service
import { NotificationsService } from '../services/notifications.service';

export const notificationListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(NotificationsService);
  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getNotificationsFromApi('', 1);
  }

  return count;
  
};
