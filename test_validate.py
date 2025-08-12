"""Tests for :mod:`validate` functions."""

from __future__ import annotations

from datetime import date

import pytest

from storage import BirthInfo
from validate import validate


def test_validate_trims_name_only():
    assert validate("  John  ") == "John"


def test_validate_parses_date_and_returns_birthinfo():
    result = validate("  Jane  ", "2000-05-17")
    assert isinstance(result, BirthInfo)
    assert result.name == "Jane"
    assert result.birth_date == date(2000, 5, 17)


def test_validate_rejects_empty_name():
    with pytest.raises(ValueError):
        validate("   ")


def test_validate_rejects_bad_date():
    with pytest.raises(ValueError):
        validate("John", "2020-13-01")
