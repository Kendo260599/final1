from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime
from typing import List, Optional
import sqlite3


@dataclass
class BirthInfo:
    """Simple data structure representing a person's birth information."""

    name: str
    birth_date: date
    gender: str
    datetime_utc: datetime
    latitude: float
    longitude: float
    source_note: Optional[str] = None


class BirthInfoRepository:
    """Persistence layer for :class:`BirthInfo` using SQLite."""

    def __init__(self, db_path: str = ":memory:") -> None:
        self._conn = sqlite3.connect(db_path)
        self._create_table()

    def _create_table(self) -> None:
        self._conn.execute(
            """
            CREATE TABLE IF NOT EXISTS birth_info (
                name TEXT PRIMARY KEY,
                birth_date TEXT NOT NULL,
                gender TEXT NOT NULL,
                datetime_utc TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                source_note TEXT
            )
            """
        )
        # Ensure existing databases have the new columns
        cols = {row[1] for row in self._conn.execute("PRAGMA table_info('birth_info')")}
        column_defs = {
            "gender": "TEXT NOT NULL DEFAULT ''",
            "datetime_utc": "TEXT NOT NULL DEFAULT ''",
            "latitude": "REAL NOT NULL DEFAULT 0",
            "longitude": "REAL NOT NULL DEFAULT 0",
            "source_note": "TEXT",
        }
        for col, col_def in column_defs.items():
            if col not in cols:
                self._conn.execute(f"ALTER TABLE birth_info ADD COLUMN {col} {col_def}")
        self._conn.execute("PRAGMA user_version = 2")
        self._conn.commit()

    def save(self, info: BirthInfo) -> None:
        """Insert or update a :class:`BirthInfo` record."""

        with self._conn:
            self._conn.execute(
                """
                INSERT OR REPLACE INTO birth_info (
                    name, birth_date, gender, datetime_utc, latitude, longitude, source_note
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    info.name,
                    info.birth_date.isoformat(),
                    info.gender,
                    info.datetime_utc.isoformat(),
                    info.latitude,
                    info.longitude,
                    info.source_note,
                ),
            )

    def get_by_name(self, name: str) -> Optional[BirthInfo]:
        """Retrieve a :class:`BirthInfo` by name."""

        cur = self._conn.execute(
            """
            SELECT name, birth_date, gender, datetime_utc, latitude, longitude, source_note
            FROM birth_info WHERE name = ?
            """,
            (name,),
        )
        row = cur.fetchone()
        if row is None:
            return None
        return BirthInfo(
            row[0],
            date.fromisoformat(row[1]),
            row[2],
            datetime.fromisoformat(row[3]),
            row[4],
            row[5],
            row[6],
        )

    def list_all(self) -> List[BirthInfo]:
        """Return all stored :class:`BirthInfo` records."""

        cur = self._conn.execute(
            """
            SELECT name, birth_date, gender, datetime_utc, latitude, longitude, source_note
            FROM birth_info ORDER BY name
            """
        )
        rows = cur.fetchall()
        return [
            BirthInfo(
                name,
                date.fromisoformat(bd),
                gender,
                datetime.fromisoformat(dt),
                lat,
                lon,
                note,
            )
            for name, bd, gender, dt, lat, lon, note in rows
        ]

    def close(self) -> None:
        """Close the underlying database connection."""

        self._conn.close()
