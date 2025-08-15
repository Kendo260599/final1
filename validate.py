from __future__ import annotations

"""Input validation helpers."""

from datetime import date, datetime, time
from typing import overload

from time_utils import to_utc
from storage import BirthInfo

@overload
def validate(name: str) -> str:
    ...

@overload
def validate(name: str, birth_date: str, local_time: str = ..., timezone: str = ...) -> BirthInfo:
    ...

def validate(
    name: str,
    birth_date: str | None = None,
    local_time: str = "00:00",
    timezone: str = "UTC",
):
    """Validate user input.

    Parameters
    ----------
    name:
        Person's name. Must be a non-empty string.
    birth_date:
        Optional birth date in ``YYYY-MM-DD`` format. When provided, a
        :class:`~storage.BirthInfo` instance is returned.
    local_time:
        Local time in ``HH:MM`` or ``HH:MM:SS`` format. Defaults to midnight
        when omitted.
    timezone:
        IANA timezone string such as ``"Asia/Ho_Chi_Minh"``. Defaults to UTC.

    Returns
    -------
    str or BirthInfo
        Validated name or a :class:`BirthInfo` object when ``birth_date`` is
        supplied.
    """
    clean_name = name.strip()
    if not clean_name:
        raise ValueError("name cannot be empty")

    if birth_date is None:
        return clean_name

    try:
        bd = date.fromisoformat(birth_date)
    except ValueError as exc:
        raise ValueError("birth_date must be in YYYY-MM-DD format") from exc

    try:
        lt = time.fromisoformat(local_time)
    except ValueError as exc:
        raise ValueError("local_time must be in HH:MM[:SS] format") from exc

    dt_local = datetime.combine(bd, lt)
    dt_utc = to_utc(dt_local, timezone)

    # ``BirthInfo`` requires additional fields which are not part of the
    # validation concerns.  Provide sensible defaults so callers interested
    # only in name and birth date can still receive a full object without
    # needing to supply extraneous information.
    return BirthInfo(
        name=clean_name,
        birth_date=bd,
        gender="",
        datetime_utc=dt_utc,
        latitude=0.0,
        longitude=0.0,
        birth_time=dt_local,
    )
