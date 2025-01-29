import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

export const courseListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalCoursesService);
  const router = inject(Router);

  
  

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getMyCoursesFromApi(1, '');
  }

  return count;
  
};
