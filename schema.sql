-- SQL schema for BirthInfo repository
CREATE TABLE IF NOT EXISTS birth_info (
    name TEXT PRIMARY KEY,
    birth_date TEXT NOT NULL,
    gender TEXT NOT NULL,
    datetime_utc TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    source_note TEXT
);
