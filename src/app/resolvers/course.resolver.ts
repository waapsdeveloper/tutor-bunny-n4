import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router'; // Your data service
import { of } from 'rxjs';
import { GlobalCoursesService } from '../services/global-courses.service';

export const courseResolver: ResolveFn<any> = async (route, state) => {
  const service = inject(GlobalCoursesService);
  const router = inject(Router);

  const courseId = route.queryParams['course_id'];
  console.log(courseId);



  if (!courseId) {
    router.navigate(['..']);
    return of(null);
  }

  let item = await service.getItemPromise(courseId);
  if (!item) {
    const res = await service.getcourseById(courseId);

    if (!res) {
      router.navigate(['..']);
      return of(null);
    }

    service.setItem(res);

  }

  return courseId;

  // const user = usersService.getUser();
  // if(user){
  //   return user;
  // } else {
  //   router.navigate(['/splash']);
  //   return of(null)
  // }
};
