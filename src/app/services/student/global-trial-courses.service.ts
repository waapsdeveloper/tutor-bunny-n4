import { Injectable } from '@angular/core';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';
import { NetworkService } from '../network.service';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalTrialCoursesService extends NgrxCrudService<any> {
  
  ngrxModelName: string = 'TrialCoursesModel';

  constructor(private network: NetworkService, private users: UsersService) { 
    super();
  }

  getGlobalStudentTrialFromApi(search = '', page = 1, perpage = 10) {
    return new Promise(async (resolve) => {
      const user = await this.users.getUser();
      const params: any = { student_id: user.id };
      if (search) params.search = search;
      if (page) params.page = page;
      if (perpage) params.perpage = perpage;

      let res = await this.network.geStudentTrialList(params);
      const data = res.result;
      this.setList(data.data, data.current_page, data.last_page, data.total);
      resolve(res);
    });
  }

  requestTrial(course_id, user_id, message = '') {
    return new Promise(async (resolve) => {
      let ite = {
        user_id: user_id,
        course_id: course_id,
        message: message,
      };
      let res = await this.network.requestTrail(ite);
      const trialo = res.trialo;
      delete trialo['course'];
      console.log(trialo);
      this.setItem(trialo);
      resolve(trialo);
    });
  }

  cancelTrail(course_id, user_id) {
    return new Promise(async (resolve) => {
      let ite = {
        user_id: user_id,
        course_id: course_id,
      };
      let res = await this.network.cancelTrail(ite);
      console.log(res);

      const trialo = res.trialo;
      delete trialo['course'];
      console.log(trialo);

      this.removeItem(trialo.id);
      resolve(trialo);
    });
  }

  

}
