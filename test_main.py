"""Tests for the CLI entry point in :mod:`main`."""

from __future__ import annotations

import sys
from unittest.mock import patch

import main
from storage import BirthInfoRepository


def test_cli_closes_repository(tmp_path, monkeypatch):
    """Running the CLI should close the underlying repository."""

    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(sys, "argv", ["main.py", "save", "Alice", "2000-01-01"])

    with patch("main.BirthInfoRepository.close", autospec=True, wraps=BirthInfoRepository.close) as mocked:
        main.main()
        mocked.assert_called_once()
