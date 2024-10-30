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
    ) {

  }

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }
        // Initialize the myuserdb database
        const DB_TUTORBUNNY = 'tutorbunny11'
        await this.storageService.initializeDatabase(DB_TUTORBUNNY);
        // Here Initialize MOCK_DATA if required

        // Initialize whatever database and/or MOCK_DATA you like

        if( this.sqliteService.platform === 'web') {
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

    const sanitizeValue = (value) => value === undefined ? null : value;
    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Prepare the SQL insert statement
      const countrySql = `INSERT INTO countries
        (id, name, iso3, numeric_code, iso2, phonecode, capital, currency, currency_name, currency_symbol, tld, native, region, region_id, subregion, subregion_id, nationality, timezones, translations, latitude, longitude, emoji, emojiU, status, created_at, updated_at, flag, wikiDataId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      // Loop through the country array and insert each country object
      for (const country of countryArray) {
        await this.storageService.executeQuery(countrySql, [
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
+         sanitizeValue(country.created_at),
          sanitizeValue(country.updated_at),
          sanitizeValue(country.flag),
          sanitizeValue(country.wikiDataId)
        ]);
      }

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
    // Helper function to replace undefined values with null
    const sanitizeValue = (value) => value === undefined ? null : value;

    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Prepare the SQL insert statement
      const stateSql = `INSERT INTO states
        (id, name, country_id, country_code, fips_code, iso2, type, latitude, longitude, created_at, updated_at, flag, wikiDataId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      // Loop through the state array and insert each state object
      for (const state of stateArray) {
        await this.storageService.executeQuery(stateSql, [
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
        ]);
      }

      // Commit the transaction
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };

    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }

  async insertLanguages(languageArray) {
    // Helper function to replace undefined values with null
    const sanitizeValue = (value) => value === undefined ? null : value;

    // Start a transaction to ensure atomicity
    await this.storageService.executeQuery('BEGIN TRANSACTION;');

    try {
      // Prepare the SQL insert statement
      const languageSql = `INSERT INTO languages
        (id, name)
        VALUES (?, ?);`;

      // Loop through the language array and insert each language object
      for (const language of languageArray) {
        await this.storageService.executeQuery(languageSql, [
          sanitizeValue(language.id),
          sanitizeValue(language.name)
        ]);
      }

      // Commit the transaction
      await this.storageService.executeQuery('COMMIT;');
      return { success: true };

    } catch (error) {
      // Rollback in case of error
      await this.storageService.executeQuery('ROLLBACK;');
      return { success: false, error: error.message };
    }
  }



  async initializeGenericTables(): Promise<any>{

    const countryArray = await this.network.getAllCountries();
    const res = await this.insertCountries(countryArray);

    const stateArray = await this.network.getAllStates();
    const res2 = await this.insertStates(stateArray)

    const languagesArray = await this.network.getAllLanguages();
    const res3 = await this.insertLanguages(languagesArray)

    console.log(res3);
    //const res3 = await this.insertStates(languagesArray)


  }

}
