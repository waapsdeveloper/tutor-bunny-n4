import { Injectable } from '@angular/core';
import { NetworkService } from '../network.service';
import { SQLiteService } from './sqlite.service';

import { StorageService } from './storage.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private storageService: StorageService,
    private network: NetworkService
  ) {}

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        // Initialize the myuserdb database
        const DB_TUTORBUNNY = 'tutorbunny11';
        await this.storageService.initializeDatabase(DB_TUTORBUNNY);
        // Here Initialize MOCK_DATA if required

        // Initialize whatever database and/or MOCK_DATA you like

        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.saveToStore(DB_TUTORBUNNY);
        }

        this.isAppInit = true;
      } catch (error) {
        console.log(`initializeAppError: ${error}`);
        // await Toast.show({
        //   text: `initializeAppError: ${error}`,
        //   duration: 'long'
        // });
      }
    });
  }

  async insertCountries(countryArray) {
    const sanitizeValue = (value) => (value === undefined ? null : value);
    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Prepare the base SQL insert statement
      const baseCountrySql = `INSERT INTO countries
        (id, name, iso3, numeric_code, iso2, phonecode, capital, currency, currency_name, currency_symbol, tld, native, region, region_id, subregion, subregion_id, nationality, timezones, translations, latitude, longitude, emoji, emojiU, status, created_at, updated_at, flag, wikiDataId)
        VALUES `;

      // Accumulate placeholders and values for bulk insert
      const placeholders = [];
      const values = [];

      // Loop through the country array to construct the placeholders and values arrays
      for (const country of countryArray) {
        placeholders.push(
          '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        values.push(
          sanitizeValue(country.id),
          sanitizeValue(country.name),
          sanitizeValue(country.iso3),
          sanitizeValue(country.numeric_code),
          sanitizeValue(country.iso2),
          sanitizeValue(country.phonecode),
          sanitizeValue(country.capital),
          sanitizeValue(country.currency),
          sanitizeValue(country.currency_name),
          sanitizeValue(country.currency_symbol),
          sanitizeValue(country.tld),
          sanitizeValue(country.native),
          sanitizeValue(country.region),
          sanitizeValue(country.region_id),
          sanitizeValue(country.subregion),
          sanitizeValue(country.subregion_id),
          sanitizeValue(country.nationality),
          sanitizeValue(country.timezones),
          sanitizeValue(country.translations),
          sanitizeValue(country.latitude),
          sanitizeValue(country.longitude),
          sanitizeValue(country.emoji),
          sanitizeValue(country.emojiU),
          sanitizeValue(country.status),
          sanitizeValue(country.created_at),
          sanitizeValue(country.updated_at),
          sanitizeValue(country.flag),
          sanitizeValue(country.wikiDataId)
        );
      }

      // Join the base SQL with all placeholders, separated by commas
      const fullCountrySql = baseCountrySql + placeholders.join(', ');

      // Execute the single combined query with all values
      await this.storageService.executeQuery(fullCountrySql, values);

      // Commit the transaction
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };
    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }

  async insertStates(stateArray) {
    const sanitizeValue = (value) => (value === undefined ? null : value);
    const batchSize = 250;

    try {
      // Start a transaction to ensure atomicity
      await this.storageService.executeQuery('BEGIN TRANSACTION;');

      for (let i = 0; i < stateArray.length; i += batchSize) {
        // Get the current batch from the stateArray
        const batch = stateArray.slice(i, i + batchSize);

        // Prepare the base SQL insert statement
        const baseStateSql = `INSERT INTO states
                (id, name, country_id, country_code, fips_code, iso2, type, latitude, longitude, created_at, updated_at, flag, wikiDataId)
                VALUES `;

        // Accumulate placeholders and values for bulk insert in this batch
        const placeholders = [];
        const values = [];

        // Loop through the current batch to construct the placeholders and values arrays
        for (const state of batch) {
          placeholders.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
          values.push(
            sanitizeValue(state.id),
            sanitizeValue(state.name),
            sanitizeValue(state.country_id),
            sanitizeValue(state.country_code),
            sanitizeValue(state.fips_code),
            sanitizeValue(state.iso2),
            sanitizeValue(state.type),
            sanitizeValue(state.latitude),
            sanitizeValue(state.longitude),
            sanitizeValue(state.created_at),
            sanitizeValue(state.updated_at),
            sanitizeValue(state.flag),
            sanitizeValue(state.wikiDataId)
          );
        }

        // Join the base SQL with all placeholders, separated by commas
        const fullStateSql = baseStateSql + placeholders.join(', ');

        // Execute the single combined query for the current batch with all values
        await this.storageService.executeQuery(fullStateSql, values);
      }

      // Commit the transaction after all batches are inserted
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };
    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }

  async insertLanguages(languageArray) {
    const sanitizeValue = (value) => (value === undefined ? null : value);

    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Prepare the base SQL insert statement
      const baseLanguageSql = `INSERT INTO languages (id, name) VALUES `;

      // Accumulate placeholders and values for bulk insert
      const placeholders = [];
      const values = [];

      // Loop through the language array to construct the placeholders and values arrays
      for (const language of languageArray) {
        placeholders.push('(?, ?)');
        values.push(sanitizeValue(language.id), sanitizeValue(language.name));
      }

      // Join the base SQL with all placeholders, separated by commas
      const fullLanguageSql = baseLanguageSql + placeholders.join(', ');

      // Execute the single combined query with all values
      await this.storageService.executeQuery(fullLanguageSql, values);

      // Commit the transaction
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };
    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }

  async insertCourseFav(user_id, favArray) {
    const sanitizeValue = (value) => (value === undefined ? null : value);

    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      const deleteSql = `DELETE FROM favorite_courses WHERE user_id = ?`;
      await this.storageService.executeQuery(deleteSql, [user_id]);

      // Prepare the base SQL insert statement
      const baseSql = `INSERT INTO favorite_courses (user_id, course_id) VALUES `;

      // Accumulate placeholders and values for bulk insert
      const placeholders = [];
      const values = [];

      // Loop through the favArray to construct the placeholders and values arrays
      for (const favorite of favArray) {
        placeholders.push('(?, ?)');
        values.push(
          sanitizeValue(favorite.user_id),
          sanitizeValue(favorite.course_id)
        );
      }

      // Join the base SQL with all placeholders, separated by commas
      const fullSql = baseSql + placeholders.join(', ');

      // Execute the single combined query with all values
      await this.storageService.executeQuery(fullSql, values);

      // Commit the transaction
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };
    } catch (error) {
      // Check if the error is due to a UNIQUE constraint violation
      if (error.message.includes('UNIQUE constraint failed')) {
        console.warn('One or more entries already exist, skipping duplicates.');
        // Proceed with commit since the entries already exist (do not rollback)
        await this.storageService.executeQuery('COMMIT;');
        return { success: true, message: 'Duplicates skipped' };
      } else {
        // Rollback in case of other errors
        await this.storageService.executeQuery('ROLLBACK;');
        return { success: false, error: error.message };
      }
    }
  }

  async getCount(tableName: string): Promise<number> {

    try {
      const sql = `SELECT COUNT(*) as count FROM ${tableName}`;
      const res = await this.storageService.executeQuery(sql, []);

      return res;
    } catch (error) {
      console.error('Error executing count query:', error);
      return 0;
    }
  }

  async initializeGenericTables(): Promise<any> {
    // check if country table already has data then don't call api

    const countryCount = await this.getCount('countries')

    if(countryCount <= 0){
      const countryArray = await this.network.getAllCountries();
      const res = await this.insertCountries(countryArray);
    }

    const statesCount = await this.getCount('states');

    if(statesCount <= 0){
      // too long data to handle, leave it for the sake of bravity
      const stateArray = await this.network.getAllStates();
      const res2 = await this.insertStates(stateArray);
    }

    const languagesCount = await this.getCount('languages');

    if(languagesCount <= 0){
      const languagesArray = await this.network.getAllLanguages();
      const res3 = await this.insertLanguages(languagesArray);
    }




    return true;
    //const res3 = await this.insertStates(languagesArray)
  }

  initializeUserTables(user: any) {

    return new Promise(async (resolve) => {

      const favIds = await this.network.getAllFavCoursesIds();
      console.log(favIds);
      await this.insertCourseFav(user.id, favIds);

      let data = {};
      resolve(data);
    });
  }
}
