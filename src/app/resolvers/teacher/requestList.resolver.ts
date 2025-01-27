import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { ListRequestsService } from 'src/app/services/teacher/list-requests.service';

export const requestListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(ListRequestsService);
  const router = inject(Router);

  
  

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getRequests(1, '');
  }

  return count;
  
};
