-- SQL schema for BirthInfo repository
CREATE TABLE IF NOT EXISTS birth_info (
    name TEXT PRIMARY KEY,
    birth_date TEXT NOT NULL
);