import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsService } from './events.service';
import { GlobalFavCoursesService } from './global-fav-courses.service';
import { NetworkService } from './network.service';
import { FavoriteCoursesSqService } from './sqlite/favorite-courses-sq.service';

@Injectable({
  providedIn: 'root'
})
export class CourseFavoriteService {



  constructor(private network: NetworkService, private events: EventsService, private globalFavCoursesService: GlobalFavCoursesService) { }

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
      course_id: obj.id,
    };
    const res = await this.network.addCourseFav(ite);

    console.log(res);
    if(res.data){
      this.globalFavCoursesService.setItem(res.data)
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
      course_id: obj.id,
    };
    const res = await this.network.removeCourseFav(ite);
    console.log(res)
    if(res.data){
      this.globalFavCoursesService.setRemove(res.data)
    }

  }




}
