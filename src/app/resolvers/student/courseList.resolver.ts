import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { of } from 'rxjs';
import { GlobalCoursesService } from 'src/app/services/global-courses.service';

export const courseListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalCoursesService);
  const router = inject(Router);

  
  

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getGlobalCoursesFromApi('', 1);
  }

  return count;
  
};
