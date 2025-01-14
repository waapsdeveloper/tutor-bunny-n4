import { inject } from '@angular/core';
import { ResolveFn} from '@angular/router'; // Your data service
import { GlobalFavCoursesService } from 'src/app/services/global-fav-courses.service';
import { GlobalFavMaterialService } from 'src/app/services/global-fav-material.service';




export const favoritesCountResolver: ResolveFn<any> = async (route, state) => {
  const serviceFav = inject(GlobalFavCoursesService);
  const serviceMat = inject(GlobalFavMaterialService);

  let countFav = await serviceFav.getGlobalFavCoursesFromApi() as any[];
  let countMat = await serviceMat.getGlobalFavMaterialFromApi() as any[];

  let length = countFav.length + countMat.length; 


  return length;
  
};
