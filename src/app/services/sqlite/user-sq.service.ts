import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserSqService {
  users: any[] = [];

  constructor(private storageService: StorageService) {}

  async setUserInDatabase(user) {
    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Insert into users table
      const userSql = `INSERT INTO users (id, role_id, name, email, verified_on, timezone, timezone_offset, image, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      await this.storageService.executeQuery(userSql, [
        user.id,
        user.role_id,
        user.name,
        user.email,
        user.verified_on,
        user.timezone,
        user.timezone_offset,
        user.image,
        user.created_at,
      ]);

      // Insert into teachers table
      const teacherSql = `INSERT INTO teachers (teacher_id, user_id, country_id, state_id, phone_number, city, zip_code, title, description, photo_id, status, qualification_description, started_teaching, experience_description, hourly_rate, travel_policy_id, converted_hourly_rate, converted_currency, total_rating, avg_rating)
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      await this.storageService.executeQuery(teacherSql, [
        user.teacher.teacher_id,
        user.id,
        user.teacher.country.id,
        user.teacher.state.id,
        user.teacher.phone_number,
        user.teacher.city,
        user.teacher.zip_code,
        user.teacher.title,
        user.teacher.description,
        user.teacher.photo_id,
        user.teacher.status,
        user.teacher.qualification_description,
        user.teacher.started_teaching,
        user.teacher.experience_description,
        user.teacher.hourly_rate,
        user.teacher.travel_policy_id,
        user.teacher.converted_hourly_rate,
        user.teacher.converted_currency,
        user.teacher.total_rating,
        user.teacher.avg_rating,
      ]);

      // Insert into teacher_languages table
      for (let language of user.teacher.languages) {
        const languageSql = `INSERT INTO teacher_languages (teacher_id, language_id)
                             VALUES (?, ?);`;
        await this.storageService.executeQuery(languageSql, [
          user.teacher.teacher_id,
          language.id,
        ]);
      }

      // Insert into teacher_subjects table
      for (let subject of user.teacher.subjects) {
        const subjectSql = `INSERT INTO teacher_subjects (teacher_id, subject_id)
                            VALUES (?, ?);`;
        await this.storageService.executeQuery(subjectSql, [
          user.teacher.teacher_id,
          subject.id,
        ]);
      }

      // Commit the transaction if all inserts succeed
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };
    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }

  async loadUsers(): Promise<any> {
    const sql = 'SELECT * FROM users;';
    const res = await this.storageService.executeQuery(sql);
    return res;
    // this.userList.next(users);
  }
  async getUsers() {
    await this.loadUsers();
    // this.isUserReady.next(true);
  }
  async addUser(name: string) {
    const sql = `INSERT INTO users (name) VALUES (?);`;
    await this.storageService.executeQuery(sql, [name]);
    await this.getUsers();
  }

  async updateUserById(id: string, active: number) {
    const sql = `UPDATE users SET active=${active} WHERE id=${id}`;
    await this.storageService.executeQuery(sql);
    await this.getUsers();
  }
  async deleteUserById(id: string) {
    const sql = `DELETE FROM users WHERE id=${id}`;
    await this.storageService.executeQuery(sql);
    await this.getUsers();
  }
}
