import { Injectable } from '@angular/core';

import { UsersService } from '../users.service';
import { NetworkService } from '../network.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalFavCoursesService extends NgrxCrudService<any> {  

  ngrxModelName: string = 'GlobalFavCoursesModel';

  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  getGlobalFavCoursesFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavCoursesIds();
      this.setState(() => res);
      resolve(true);
    });
  }

  async addFavorites(obj: any, user) {

    let ite = {
      user_id: user.id,
      course_id: obj.id,
    };

    const res = await this.network.addCourseFav(ite);
    console.log(res);
    const d = res.data;

    if(d){
      this.setItem(d)
    }



  }

  async removeFavorites(obj: any, user: any) {

    let ite = {
      user_id: user.id,
      course_id: obj.id,
    };
    const res = await this.network.removeCourseFav(ite);
    console.log(res)
    if(res.data && res.data.id){
      this.removeItem(res.data.id)
    }

  }

}
