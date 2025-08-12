"""Tests for the :mod:`storage` module."""

from __future__ import annotations

from datetime import date, datetime

import pytest

from storage import BirthInfo, BirthInfoRepository


def _make_info(name: str, year: int = 2000, birth_time: datetime | None = None) -> BirthInfo:
    """Create a :class:`BirthInfo` instance for testing."""

    return BirthInfo(
        name=name,
        birth_date=date(year, 1, 1),
        gender="F",
        datetime_utc=datetime(year, 1, 1, 0, 0),
        latitude=1.0,
        longitude=2.0,
        birth_time=birth_time,
    )


def test_save_and_get_by_name(tmp_path):
    repo = BirthInfoRepository(str(tmp_path / "db.sqlite"))
    info = _make_info("Alice", 1990, birth_time=datetime(1990, 1, 1, 5, 30))
    repo.save(info)

    # The record can be retrieved by name and matches what was saved
    assert repo.get_by_name("Alice") == info

    # Saving again with the same name replaces the record
    updated = _make_info("Alice", 1995, birth_time=datetime(1995, 1, 1, 6, 45))
    repo.save(updated)
    assert repo.get_by_name("Alice") == updated
    repo.close()


def test_list_all_returns_sorted_records(tmp_path):
    repo = BirthInfoRepository(str(tmp_path / "db.sqlite"))
    repo.save(_make_info("Charlie", 1992, birth_time=datetime(1992, 1, 1, 3)))
    repo.save(_make_info("Bob", 1991, birth_time=datetime(1991, 1, 1, 2)))
    repo.save(_make_info("Alice", 1990, birth_time=datetime(1990, 1, 1, 1)))

    infos = repo.list_all()
    assert [info.name for info in infos] == ["Alice", "Bob", "Charlie"]
    assert [info.birth_time for info in infos] == [
        datetime(1990, 1, 1, 1),
        datetime(1991, 1, 1, 2),
        datetime(1992, 1, 1, 3),
    ]
