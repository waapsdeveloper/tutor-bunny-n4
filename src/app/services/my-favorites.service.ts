import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class MyFavoritesService {

  public favorites: any[] = [];

  constructor(private network: NetworkService) { }

  async setFavToApi(){


    let obj = {
      liked: true
    }

    const res = await this.network.getAllFavCourses(obj) as any;
    const data = res.result;
    const d = data.data;
    // this.showLiked = d.length > 0;

  }

  async removeFavorite(obj: any, user) {
    const index = this.favorites.indexOf(obj);
    if (index > -1) {
      this.favorites.splice(index, 1);
      console.log(`Removed favorite:`, obj);
    } else {
      console.log(`Favorite not found:`, obj);
    }


    let ite = {
      user_id: user.id,
      course_id: obj.id
    }
    const res = await this.network.removeCourseFav(ite)

  }

  async addFavorite(obj: any, user) {
    if (!this.favorites.includes(obj)) {
      this.favorites.push(obj);
      console.log(`Added favorite:`, obj);
    } else {
      console.log(`Favorite already exists:`, obj);
    }

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
