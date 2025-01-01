import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';  // Your data service
import { of } from 'rxjs';
import { PendingTrialsService } from '../services/pending-trials.service';

export const pendingTrialsResolver: ResolveFn<any> = async (route, state) => {
  const pendingTrialsService = inject(PendingTrialsService);

  const count = await pendingTrialsService.getCountPromise();
  if(count == 0){
    pendingTrialsService.getPendingTrialsFromApi();
  }

};
