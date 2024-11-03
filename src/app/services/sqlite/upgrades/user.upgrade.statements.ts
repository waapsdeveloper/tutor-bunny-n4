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
          avg_rating REAL
        );`,
        `CREATE TABLE IF NOT EXISTS countries(
          id INTEGER PRIMARY KEY,
          name TEXT,
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
          region_id INTEGER,
          subregion TEXT,
          subregion_id INTEGER,
          nationality TEXT,
          timezones TEXT,
          translations TEXT,
          latitude TEXT,
          longitude TEXT,
          emoji TEXT,
          emojiU TEXT,
          status INTEGER,
          created_at TEXT,
          updated_at TEXT,
          flag INTEGER,
          wikiDataId TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS states(
          id INTEGER PRIMARY KEY,
          name TEXT,
          country_id INTEGER,
          country_code TEXT,
          fips_code TEXT,
          iso2 TEXT,
          type TEXT,
          latitude TEXT,
          longitude TEXT,
          created_at TEXT,
          updated_at TEXT,
          flag INTEGER,
          wikiDataId TEXT
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
          language_id INTEGER
        );`,
        `CREATE TABLE IF NOT EXISTS teacher_subjects(
          teacher_id INTEGER,
          subject_id INTEGER
        );`,
        `CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            user_id,
            dob TEXT,
            country_id INTEGER,
            state_id INTEGER,
            city TEXT,
            zip_code TEXT,
            dial_code INTEGER,
            phone_number TEXT,
            status INTEGER,
            terms INTEGER,
            profile_complete INTEGER
        );`,
        `CREATE TABLE IF NOT EXISTS favorite_courses (
            user_id INTEGER,
            course_id INTEGER,
            UNIQUE(user_id, course_id)
        );`

      ],
    },

    /* add new statements below for next database version when required*/
    /*
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
    }
    */
  ];
}
