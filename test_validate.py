"""Tests for :mod:`validate` functions."""

from __future__ import annotations

from datetime import date, datetime

import pytest

from storage import BirthInfo
from validate import validate

try:
    from zoneinfo import ZoneInfo
    UTC = ZoneInfo("UTC")
except Exception:  # pragma: no cover
    import pytz
    UTC = pytz.utc


def test_validate_trims_name_only():
    assert validate("  John  ") == "John"


def test_validate_parses_date_and_returns_birthinfo():
    result = validate("  Jane  ", "2000-05-17")
    assert isinstance(result, BirthInfo)
    assert result.name == "Jane"
    assert result.birth_date == date(2000, 5, 17)
    assert result.datetime_utc == datetime(2000, 5, 17, 0, 0, tzinfo=UTC)


def test_validate_rejects_empty_name():
    with pytest.raises(ValueError):
        validate("   ")


def test_validate_rejects_bad_date():
    with pytest.raises(ValueError):
        validate("John", "2020-13-01")
        

def test_validate_converts_local_time_and_timezone():
    result = validate("Bob", "2024-01-01", "12:00", "America/New_York")
    assert result.datetime_utc == datetime(2024, 1, 1, 17, 0, tzinfo=UTC)


def test_validate_rejects_invalid_timezone():
    with pytest.raises(ValueError, match="Unknown timezone: Invalid/Timezone"):
        validate("Bob", "2024-01-01", "12:00", "Invalid/Timezone")
