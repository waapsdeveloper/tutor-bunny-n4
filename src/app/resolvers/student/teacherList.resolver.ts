import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { GlobalTeacherService } from 'src/app/services/global-teacher.service';

export const teacherListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalTeacherService);
  const router = inject(Router);

  
  

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getGlobalTeachersFromApi('', 1);
  }

  return count;
  
};
