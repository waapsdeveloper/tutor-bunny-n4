import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCoursesSqService {
  countries = [];

  constructor(private storageService: StorageService) {}

  async list(country_id, search = '', offset = 0, limit = 10) {
    let sql = `SELECT * FROM states`;
    const params = [];

    // Add WHERE clause if a country_id or search term is provided
    if (country_id) {
      sql += ` WHERE country_id = ?`;
      params.push(country_id);
    }

    if (search) {
      sql += country_id ? ` AND name LIKE ?` : ` WHERE name LIKE ?`;
      params.push(`%${search}%`);
    }

    // Add ORDER BY, LIMIT, and OFFSET clauses
    sql += ` ORDER BY name ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    // Execute the query and get results
    try {
      const res = await this.storageService.executeQuery(sql, params);
      return res; // Assuming res.rows returns the list of rows
    } catch (error) {
      console.error('Error executing list query:', error);
      return [];
    }
  }
}
