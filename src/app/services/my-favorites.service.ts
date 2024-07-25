import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { resolve } from 'path';
import { GlobalCoursesService } from './global-courses.service';

@Injectable({
  providedIn: 'root'
})
export class MyFavoritesService {

  page = 1;
  last_page = -1;
  public favorites: any[] = [];

  constructor(private network: NetworkService, private gC: GlobalCoursesService ) { }

  async setFavToApi(search = '', page = 1, liked = true){

    return new Promise( async resolve => {

      let obj = {
        search: search,
        page: page,
        liked: true
      }

      const res = await this.network.getAllFavCourses(obj) as any;
      const result = res.result;
      // this.favorites = data.data;
      this.page = result.current_page;
      this.last_page = result.last_page;

      if (this.page == 1) {
        this.favorites = result["data"];
      } else {
        this.favorites = [...this.favorites, ...result["data"]]
      }

      resolve(true)

    })

    // this.showLiked = d.length > 0;

  }

  async removeFavorite(obj: any, user) {
    const index = this.favorites.findIndex(x => x.id == obj.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      console.log(`Removed favorite:`, obj);
    } else {
      console.log(`Favorite not found:`, obj);
    }

    this.gC.removeFavorite(obj, user)


    let ite = {
      user_id: user.id,
      course_id: obj.id
    }
    const res = await this.network.removeCourseFav(ite)

  }

  async addFavorite(obj: any, user) {
    const index = this.favorites.findIndex(x => x.id == obj.id);
    if (index == -1) {
      this.favorites.push(obj);
      console.log(`Added favorite:`, obj);
    } else {
      console.log(`Favorite already exists:`, obj);
    }

    this.gC.addFavorite(obj, user)

    let ite = {
      user_id: user.id,
      course_id: obj.id
    }
    const res = await this.network.addCourseFav(ite)


  }

  getAllFavorites(): any[] {
    return this.favorites;
  }





}
