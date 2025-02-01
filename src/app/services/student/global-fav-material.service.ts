import { Injectable } from '@angular/core';

import { UsersService } from '../users.service';
import { NetworkService } from '../network.service';
import { NgrxCrudService } from '../abstract/ngrx-crud.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalFavMaterialService extends NgrxCrudService<any>  {
  
  ngrxModelName: string = 'GlobalFavCoursesModel';

  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  getGlobalFavMaterialFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavMaterialIds();
      this.setList(res, 1, -1, res.length)
      resolve(true);
    });
  }


  

  
  async addFavorites(obj: any, user) {    

    let ite = {
      user_id: user.id,
      study_material_id: obj.id,
    };
    const res = await this.network.addMaterialFav(ite);

    // console.log(res);
    if (res && res.data) {
      this.setItem(res.data);
    }
  }

  async removeFavorites(obj: any, user: any) {   

    let ite = {
      user_id: user.id,
      study_material_id: obj.id,
    };

    const res = await this.network.removeMaterialFav(ite);
    console.log(res)
    if(res.data && res.data.id){
      this.removeItem(res.data.id)
    }
  }

}
