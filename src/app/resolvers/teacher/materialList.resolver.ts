import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { GlobalStudyMaterialService } from 'src/app/services/global-study-material.service';

export const materialListResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalStudyMaterialService);
  const router = inject(Router);

  
  

  let count = await service.getCountPromise();
  if (!count || count == 0) {
    service.getMyStudyMaterialFromApi('', 1);
  }

  return count;
  
};
