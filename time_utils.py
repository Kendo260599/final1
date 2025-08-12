from __future__ import annotations␊
␊
from datetime import datetime␊
␊
try:␊
    from zoneinfo import ZoneInfo␊
    _USE_ZONEINFO = True␊
except Exception:  # pragma: no cover - fallback for older Python␊
    _USE_ZONEINFO = False␊
    import pytz␊
␊
␊
def to_utc(dt_local: datetime, tz: str) -> datetime:␊
    """Convert a local time to UTC.␊
␊
    Parameters␊
    ----------␊
    dt_local: datetime␊
        A naive or timezone-aware :class:`datetime` object representing the␊
        local time.␊
    tz: str␊
        IANA timezone string such as ``"Asia/Ho_Chi_Minh"``.␊
␊
    Returns␊
    -------␊
    datetime␊
        A timezone-aware datetime in UTC.␊
    """␊
␊
    if _USE_ZONEINFO:␊
        try:␊
            tzinfo = ZoneInfo(tz)␊
        except Exception as exc:  # pragma: no cover - error path␊
            raise ValueError(f"Unknown timezone: {tz}") from exc␊
        if dt_local.tzinfo is None:␊
            dt_local = dt_local.replace(tzinfo=tzinfo)␊
        else:␊
            dt_local = dt_local.astimezone(tzinfo)␊
        return dt_local.astimezone(ZoneInfo("UTC"))␊
    else:  # pragma: no cover - executed only when zoneinfo isn't available␊
        try:␊
            tzinfo = pytz.timezone(tz)␊
        except Exception as exc:  # pragma: no cover - error path␊
            raise ValueError(f"Unknown timezone: {tz}") from exc␊
        if dt_local.tzinfo is None:␊
            dt_local = tzinfo.localize(dt_local)␊
        else:␊
            dt_local = dt_local.astimezone(tzinfo)␊
        return dt_local.astimezone(pytz.utc)␊
