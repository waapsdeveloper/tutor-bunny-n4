import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { of } from 'rxjs';
import { GlobalTrialCoursesService } from 'src/app/services/student/global-trial-courses.service';

export const listTrialsResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalTrialCoursesService);
  const router = inject(Router);

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getGlobalStudentTrialFromApi('', 1, 500);
  }

  return count;
  
};
