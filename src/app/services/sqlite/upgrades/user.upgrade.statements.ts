export class UpgradeStatements {
  userUpgrades = [
    {
      toVersion: 1,
      statements: [
        `CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY,
          role_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          verified_on TEXT,
          timezone TEXT,
          timezone_offset TEXT,
          image TEXT,
          created_at TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS teachers(
          teacher_id INTEGER PRIMARY KEY,
          user_id INTEGER NOT NULL,
          country_id INTEGER,
          state_id INTEGER,
          phone_number TEXT,
          city TEXT,
          zip_code TEXT,
          title TEXT,
          description TEXT,
          photo_id TEXT,
          status TEXT,
          qualification_description TEXT,
          started_teaching TEXT,
          experience_description TEXT,
          hourly_rate REAL,
          travel_policy_id INTEGER,
          converted_hourly_rate REAL,
          converted_currency TEXT,
          total_rating INTEGER,
          avg_rating REAL,
          FOREIGN KEY(user_id) REFERENCES users(id),
          FOREIGN KEY(country_id) REFERENCES countries(id),
          FOREIGN KEY(state_id) REFERENCES states(id)
        );`,
        `CREATE TABLE IF NOT EXISTS countries(
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          iso3 TEXT,
          numeric_code TEXT,
          iso2 TEXT,
          phonecode TEXT,
          capital TEXT,
          currency TEXT,
          currency_name TEXT,
          currency_symbol TEXT,
          tld TEXT,
          native TEXT,
          region TEXT,
          subregion TEXT,
          latitude TEXT,
          longitude TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS states(
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          country_id INTEGER,
          latitude TEXT,
          longitude TEXT,
          FOREIGN KEY(country_id) REFERENCES countries(id)
        );`,
        `CREATE TABLE IF NOT EXISTS languages(
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS subjects(
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS teacher_languages(
          teacher_id INTEGER,
          language_id INTEGER,
          FOREIGN KEY(teacher_id) REFERENCES teachers(teacher_id),
          FOREIGN KEY(language_id) REFERENCES languages(id)
        );`,
        `CREATE TABLE IF NOT EXISTS teacher_subjects(
          teacher_id INTEGER,
          subject_id INTEGER,
          FOREIGN KEY(teacher_id) REFERENCES teachers(teacher_id),
          FOREIGN KEY(subject_id) REFERENCES subjects(id)
        );`
      ]
    }

    /* add new statements below for next database version when required*/
    /*
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
    }
    */
  ]
}
