import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { GlobalFavMaterialService } from './global-fav-material.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialFavoriteService {



  constructor(private network: NetworkService, private events: EventsService, private globalFavMaterialService: GlobalFavMaterialService) { }

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
      material_id: obj.id,
    };
    // const res = await this.network.addMaterialFav(ite);

    // console.log(res);
    if(ite){
const  h =  this.globalFavMaterialService.setItem(ite)
      console.log( h);
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
      material_id: obj.id,
    };
    
   // const res = await this.network.removeMaterialFav(ite);
   // console.log(res)
    if(ite){
  const   h =   this.globalFavMaterialService.setRemove(ite);
  console.log( h);

    }

  }




}
