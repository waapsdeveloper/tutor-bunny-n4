import { Injectable } from '@angular/core';

import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { UsersService } from './users.service';
import { NetworkService } from './network.service';

export interface GlobalFavMaterailModel {
  user_id: number;
  course_id: number;
}
export type GlobalFavMaterailModelState = Array<GlobalFavMaterailModel>;
@Injectable({
  providedIn: 'root',
})
export class GlobalFavMaterialService extends NgSimpleStateBaseRxjsStore<GlobalFavMaterailModelState> {
  
  constructor(private users: UsersService, private network: NetworkService) {
    super();
  }

  storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalFavMaterailModel',
    };
  }

  initialState(): GlobalFavMaterailModelState {
    return [];
  }

  getList() {
    return this.selectState((state) => state);
  }

  getCount() {
    return this.selectState((state) => state.length);
  }

  getCountPromise() {
    return new Promise((resolve) => {
      this.selectState((state) => state.length).subscribe((res) => {
        resolve(res);
      });
    });
  }
  getGlobalFavMaterialFromApi() {
    return new Promise(async (resolve) => {
      let res = await this.network.getAllFavMaterialIds();

      this.setState(() => res);
      resolve(true);
    });
  }

  setList(list: any[]){
    this.setState((state) => {
      return list.length > 0 ? [...list] : [];
    })
  }
  
  setItem(obj: any) {
    this.setState((state) => {
      const exists = state.some((item: any) => item.id === obj.id);
      if (exists) {
        // Update existing item
        return state.map((item: any) => (item.id === obj.id ? obj : item));
      } else {
        // Add new item
        return [...state, obj];
      }
    });
  }

  setRemove(study_material_id) {
    this.setState((state) => state.filter((item: any) => item.study_material_id !== study_material_id));
  }

  isItemExist(study_material_id){
    return this.selectState(
      (state) => state.filter((item: any) => item.study_material_id === study_material_id).length
    );
  }

  
  async addFavorites(obj: any, user) {
    // const flag = await this.globalFavCoursesService.addFavorite(user.id, obj.id);
    // const count = await this.globalFavCoursesService.getFavoriteCount(user.id);
    // this.events.publish('update-course-fav-count', {count})
    // this.events.publish('update-course-item-like', {
    //   user_id: user.id,
    //   course_id: obj.id,
    //   liked: true
    // })

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
    // const flag = await this.globalFavCoursesService.removeFavorite(user.id, obj.id);

    // const count = await this.globalFavCoursesService.getFavoriteCount(user.id);
    // this.events.publish('update-course-fav-count', {count})

    // this.events.publish('update-course-item-like', {
    //   user_id: user.id,
    //   course_id: obj.id,
    //   liked: false
    // })

    let ite = {
      user_id: user.id,
      study_material_id: obj.id,
    };

    const res = await this.network.removeMaterialFav(ite);
    // console.log(res)
    if (res) {
      this.setRemove(obj.id);
    }
  }

}
