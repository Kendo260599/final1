from datetime import datetime
import os
import sys

# Ensure the project root is on sys.path so ``time_utils`` can be imported when
# tests are executed from within the ``tests`` directory.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from time_utils import to_utc

try:
    from zoneinfo import ZoneInfo
    UTC = ZoneInfo("UTC")
except Exception:  # pragma: no cover
    import pytz
    UTC = pytz.utc


def test_to_utc_asia_hcm():
    dt_local = datetime(2024, 1, 1, 12, 0)
    assert to_utc(dt_local, "Asia/Ho_Chi_Minh") == datetime(2024, 1, 1, 5, 0, tzinfo=UTC)


def test_to_utc_new_york_summer():
    dt_local = datetime(2024, 7, 1, 12, 0)
    assert to_utc(dt_local, "America/New_York") == datetime(2024, 7, 1, 16, 0, tzinfo=UTC)


def test_to_utc_new_york_winter():
    dt_local = datetime(2024, 1, 1, 12, 0)
    assert to_utc(dt_local, "America/New_York") == datetime(2024, 1, 1, 17, 0, tzinfo=UTC)