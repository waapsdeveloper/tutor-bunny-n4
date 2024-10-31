import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CountrySqService {
  countries = [];

  constructor(private storageService: StorageService) {}

  async list(search = '', offset = 0, limit = 10) {
    let sql = `SELECT * FROM countries`;

    // Add a WHERE clause if a search term is provided
    if (search) {
      sql += ` WHERE name LIKE ?`;
    }

    // Add ORDER BY, OFFSET, and LIMIT clauses
    sql += ` ORDER BY name ASC LIMIT ? OFFSET ?`;

    // Prepare the parameters for the query
    const params = search ? [`%${search}%`, limit, offset] : [limit, offset];

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
