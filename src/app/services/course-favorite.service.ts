import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { FavoriteCoursesSqService } from './sqlite/favorite-courses-sq.service';

@Injectable({
  providedIn: 'root'
})
export class CourseFavoriteService {

  constructor(private network: NetworkService, private events: EventsService, private favCoursesSqService: FavoriteCoursesSqService) { }

  async addFavorites(obj: any, user) {

    const flag = await this.favCoursesSqService.addFavorite(user.id, obj.id);
    console.log(flag);

    const count = await this.favCoursesSqService.getFavoriteCount(user.id);
    this.events.publish('update-course-fav-count', {count})
    this.events.publish('update-course-item-like', {
      user_id: user.id,
      course_id: obj.id,
      liked: true
    })


    let ite = {
      user_id: user.id,
      course_id: obj.id,
    };
    const res = await this.network.addCourseFav(ite);
  }

  async removeFavorites(obj: any, user: any) {

    const flag = await this.favCoursesSqService.removeFavorite(user.id, obj.id);
    console.log(flag);

    const count = await this.favCoursesSqService.getFavoriteCount(user.id);
    this.events.publish('update-course-fav-count', {count})

    this.events.publish('update-course-item-like', {
      user_id: user.id,
      course_id: obj.id,
      liked: false
    })

    let ite = {
      user_id: user.id,
      course_id: obj.id,
    };
    const res = await this.network.removeCourseFav(ite);
  }

  async getFavCount(user_id: number): Promise<any>{
    console.log(user_id)
    const count = await this.favCoursesSqService.getFavoriteCount(user_id);
    return count;

  }


}
