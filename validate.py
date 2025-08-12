from __future__ import annotations

"""Input validation helpers."""

from datetime import date, datetime
from typing import overload

from storage import BirthInfo

@overload
def validate(name: str) -> str:
    ...

@overload
def validate(name: str, birth_date: str) -> BirthInfo:
    ...

def validate(name: str, birth_date: str | None = None):
    """Validate user input.

    Parameters
    ----------
    name:
        Person's name. Must be a non-empty string.
    birth_date:
        Optional birth date in ``YYYY-MM-DD`` format. When provided, a
        :class:`~storage.BirthInfo` instance is returned.

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

        # ``BirthInfo`` requires additional fields which are not part of the
    # validation concerns.  Provide sensible defaults so callers interested
    # only in name and birth date can still receive a full object without
    # needing to supply extraneous information.
    return BirthInfo(
        name=clean_name,
        birth_date=bd,
        gender="",
        datetime_utc=datetime.min,
        latitude=0.0,
        longitude=0.0,
    )
