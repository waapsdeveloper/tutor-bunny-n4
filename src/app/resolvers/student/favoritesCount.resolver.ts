import { inject } from '@angular/core';
import { ResolveFn} from '@angular/router'; // Your data service
import { GlobalFavCoursesService } from 'src/app/services/global-fav-courses.service';
import { GlobalFavMaterialService } from 'src/app/services/global-fav-material.service';




export const favoritesCountResolver: ResolveFn<any> = async (route, state) => {
  const serviceFav = inject(GlobalFavCoursesService);
  const serviceMat = inject(GlobalFavMaterialService);

  serviceFav.getGlobalFavCoursesFromApi();
  serviceMat.getGlobalFavMaterialFromApi();


  return 0;
  
};
