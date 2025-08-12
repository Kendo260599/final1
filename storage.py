from __future__ import annotations␊
␊
from dataclasses import dataclass␊
from datetime import date␊
from typing import List, Optional␊
import sqlite3␊
␊
␊
@dataclass␊
class BirthInfo:␊
    """Simple data structure representing a person's birth information."""␊
␊
    name: str␊
    birth_date: date␊
␊
␊
class BirthInfoRepository:␊
    """Persistence layer for :class:`BirthInfo` using SQLite."""␊
␊
    def __init__(self, db_path: str = ":memory:") -> None:␊
        self._conn = sqlite3.connect(db_path)␊
        self._create_table()␊
␊
    def _create_table(self) -> None:␊
        self._conn.execute(␊
            """␊
            CREATE TABLE IF NOT EXISTS birth_info (␊
                name TEXT PRIMARY KEY,␊
                birth_date TEXT NOT NULL␊
            )␊
            """␊
        )␊
        self._conn.commit()␊
␊
    def save(self, info: BirthInfo) -> None:␊
        """Insert or update a :class:`BirthInfo` record."""␊
␊
        with self._conn:␊
            self._conn.execute(␊
                "INSERT OR REPLACE INTO birth_info (name, birth_date) VALUES (?, ?)",␊
                (info.name, info.birth_date.isoformat()),␊
            )␊
␊
    def get_by_name(self, name: str) -> Optional[BirthInfo]:␊
        """Retrieve a :class:`BirthInfo` by name."""␊
␊
        cur = self._conn.execute(␊
            "SELECT name, birth_date FROM birth_info WHERE name = ?",␊
            (name,),␊
        )␊
        row = cur.fetchone()␊
        if row is None:␊
            return None␊
        return BirthInfo(row[0], date.fromisoformat(row[1]))␊
␊
    def list_all(self) -> List[BirthInfo]:␊
        """Return all stored :class:`BirthInfo` records."""␊
␊
        cur = self._conn.execute("SELECT name, birth_date FROM birth_info ORDER BY name")␊
        rows = cur.fetchall()␊
        return [BirthInfo(name, date.fromisoformat(bd)) for name, bd in rows]␊
␊
    def close(self) -> None:␊
        """Close the underlying database connection."""␊
␊
        self._conn.close()
