import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserSqService {
  users: any[] = [];

  constructor(private storageService: StorageService) {}

  async setTeacherData(user) {

    const sanitizeValue = (value) => (value === undefined ? null : value);
    // Insert into teachers table
    const teacherSql = `INSERT INTO teachers (teacher_id, user_id, country_id, state_id, phone_number, city, zip_code, title, description, photo_id, status, qualification_description, started_teaching, experience_description, hourly_rate, travel_policy_id, converted_hourly_rate, converted_currency, total_rating, avg_rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    await this.storageService.executeQuery(teacherSql, [
      sanitizeValue(user.teacher.teacher_id),
      sanitizeValue(user.id),
      sanitizeValue(user.teacher.country.id),
      sanitizeValue(user.teacher.state.id),
      sanitizeValue(user.teacher.phone_number),
      sanitizeValue(user.teacher.city),
      sanitizeValue(user.teacher.zip_code),
      sanitizeValue(user.teacher.title),
      sanitizeValue(user.teacher.description),
      sanitizeValue(user.teacher.photo_id),
      sanitizeValue(user.teacher.status),
      sanitizeValue(user.teacher.qualification_description),
      sanitizeValue(user.teacher.started_teaching),
      sanitizeValue(user.teacher.experience_description),
      sanitizeValue(user.teacher.hourly_rate),
      sanitizeValue(user.teacher.travel_policy_id),
      sanitizeValue(user.teacher.converted_hourly_rate),
      sanitizeValue(user.teacher.converted_currency),
      sanitizeValue(user.teacher.total_rating),
      sanitizeValue(user.teacher.avg_rating),
    ]);

    // Insert into teacher_languages table
    for (let language of user.teacher.languages) {
      const languageSql = `INSERT INTO teacher_languages (teacher_id, language_id)
       VALUES (?, ?);`;
      await this.storageService.executeQuery(languageSql, [
        sanitizeValue(user.teacher.teacher_id),
        sanitizeValue(language.id),
      ]);
    }

    // Insert into teacher_subjects table
    for (let subject of user.teacher.subjects) {
      const subjectSql = `INSERT INTO teacher_subjects (teacher_id, subject_id)
      VALUES (?, ?);`;
      await this.storageService.executeQuery(subjectSql, [
        sanitizeValue(user.teacher.teacher_id),
        sanitizeValue(subject.id),
      ]);
    }
  }

  async insertStudent(user) {
    // Helper function to replace undefined values with null
    const sanitizeValue = (value) => value === undefined ? null : value;

    // SQL Insert Query with only country_id and state_id retained
    const studentSql = `
      INSERT INTO students (
        dob,
        country_id,
        state_id,
        city,
        zip_code,
        dial_code,
        phone_number,
        status,
        terms,
        profile_complete
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    // Execute the SQL query to insert student data
    let student = user.student;
    try {
      await this.storageService.executeQuery(studentSql, [
        sanitizeValue(student.dob),
        sanitizeValue(student.country.id), // Only country_id used
        sanitizeValue(student.state.id),   // Only state_id used
        sanitizeValue(student.city),
        sanitizeValue(student.zip_code),
        sanitizeValue(student.dial_code),
        sanitizeValue(student.phone_number),
        sanitizeValue(student.status),
        sanitizeValue(student.terms),
        sanitizeValue(student.profile_complete)
      ]);

      return { success: true };

    } catch (error) {
      console.error('Error inserting student data:', error);
      return { success: false, error: error.message };
    }
  }


  async setUserInDatabase(user) {
    console.log(user);

    const sanitizeValue = (value) => (value === undefined ? null : value);
    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Insert into users table
      const userSql = `INSERT INTO users (id, role_id, name, email, verified_on, timezone, timezone_offset, image, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      await this.storageService.executeQuery(userSql, [
        sanitizeValue(user.id),
        sanitizeValue(user.role_id),
        sanitizeValue(user.name),
        sanitizeValue(user.email),
        sanitizeValue(user.verified_on),
        sanitizeValue(user.timezone),
        sanitizeValue(user.timezone_offset),
        sanitizeValue(user.image),
        sanitizeValue(user.created_at),
      ]);

      if(user.teacher){
        await this.setTeacherData(user);
      }

      if(user.student){
        await this.insertStudent(user);
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
  async deleteUserById(id: string): Promise<boolean> {

    const sql = `DELETE FROM users WHERE id=${id}`;
    await this.storageService.executeQuery(sql);

    const sql2 = `DELETE FROM techers WHERE user_id=${id}`;
    await this.storageService.executeQuery(sql2);

    const sql3 = `DELETE FROM teacher_languages WHERE teacher_id=${id}`;
    await this.storageService.executeQuery(sql3);

    const sql4 = `DELETE FROM teacher_subjects WHERE teacher_id=${id}`;
    await this.storageService.executeQuery(sql4);

    const sql5 = `DELETE FROM students WHERE user_id=${id}`;
    await this.storageService.executeQuery(sql5);


    return true;

  }



}
