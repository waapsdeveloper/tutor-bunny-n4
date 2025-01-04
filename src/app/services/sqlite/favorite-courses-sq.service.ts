import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class FavoriteCoursesSqService {
  countries = [];

  constructor(private storageService: StorageService) {}

  async addFavorite(user_id: number, course_id: number) {
    const sql = `INSERT INTO favorite_courses (user_id, course_id) VALUES (?, ?)`;
    const params = [user_id, course_id];

    try {
      // Attempt to insert into the table
      await this.storageService.executeQuery(sql, params);

      return true;
    } catch (error) {
      // Handle constraint violation for unique constraint
      if (error.message.includes('UNIQUE constraint failed')) {
        console.warn('Favorite already exists, skipping duplicate.');
        return false;
      } else {
        console.error('Error adding favorite:', error);
        throw error;
      }
    }
  }

  async removeFavorite(user_id: number, course_id: number) {
    const sql = `DELETE FROM favorite_courses WHERE user_id = ? AND course_id = ?`;
    const params = [user_id, course_id];

    try {
      // Attempt to delete the record
      await this.storageService.executeQuery(sql, params);

      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  }

  async list(user_id: number) {
    let sql = `SELECT * FROM favorite_courses where user_id = ?`;
    const params = [user_id];

    // Execute the query and get results
    try {
      const res = await this.storageService.executeQuery(sql, params);
      return res;
    } catch (error) {
      console.error('Error executing list query:', error);
      return [];
    }
  }

  async getFavoriteCount(user_id: number): Promise<number> {

    try {
      const sql = `SELECT COUNT(*) as count FROM favorite_courses where user_id = ?`;
      const res = await this.storageService.executeQuery(sql, [user_id]);

      if(res && res.length > 0){
        return res[0].count;
      }
      return 0;
    } catch (error) {
      console.error('Error executing count query:', error);
      return 0;
    }
  }


}
