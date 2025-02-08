import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';  // Your data service
import { ListTrialsService } from 'src/app/services/teacher/list-trials.service';

export const listTrialsResolver: ResolveFn<any> = async (route, state) => {
  const listTrialsService = inject(ListTrialsService);

  const count = await listTrialsService.getCountPromise();
  if (count == 0) {
    listTrialsService.getGlobalTeacherTrialFromApi('', 1, 500);
  }

};
