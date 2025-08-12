from __future__ import annotations␊
␊
"""Astrological chart computation utilities."""␊
␊
from dataclasses import dataclass␊
from datetime import datetime, time␊
from typing import Dict␊
␊
try:  # pragma: no cover - requires external dependency␊
    import swisseph as swe␊
except Exception as exc:  # pragma: no cover - dependency not available␊
    swe = None  # type: ignore[assignment]␊
    _import_error = exc␊
else:␊
    _import_error = None␊
␊
from storage import BirthInfo␊
␊
ZODIAC_SIGNS = [␊
    "Aries",␊
    "Taurus",␊
    "Gemini",␊
    "Cancer",␊
    "Leo",␊
    "Virgo",␊
    "Libra",␊
    "Scorpio",␊
    "Sagittarius",␊
    "Capricorn",␊
    "Aquarius",␊
    "Pisces",␊
]␊
␊
PLANETS = {␊
    "Sun": getattr(swe, "SUN", None),␊
    "Moon": getattr(swe, "MOON", None),␊
    "Mercury": getattr(swe, "MERCURY", None),␊
    "Venus": getattr(swe, "VENUS", None),␊
    "Mars": getattr(swe, "MARS", None),␊
    "Jupiter": getattr(swe, "JUPITER", None),␊
    "Saturn": getattr(swe, "SATURN", None),␊
}␊
␊
␊
@dataclass␊
class PlanetPosition:␊
    """Position of a planet in the zodiac."""␊
␊
    longitude: float␊
    sign: str␊
    degree: float␊
␊
␊
@dataclass␊
class ChartData:␊
    """Container for computed chart positions."""␊
␊
    planets: Dict[str, PlanetPosition]␊
␊
␊
def compute_chart(info: BirthInfo) -> ChartData:␊
    """Compute planetary positions for the given ``BirthInfo``.␊
␊
    When ``info.birth_time`` is ``None`` the calculation assumes a default␊
    time of **12:00 UTC**.␊
␊
    Parameters␊
    ----------␊
    info:␊
        Birth information including date. ``birth_time`` is optional and␊
        defaults to ``12:00 UTC`` when not supplied.␊
␊
    Returns␊
    -------␊
    ChartData␊
        Computed positions of major planets.␊
␊
    Notes␊
    -----␊
    This function requires the ``pyswisseph`` package. A :class:`RuntimeError`␊
    is raised if the dependency is missing.␊
    """␊
␊
    if swe is None:  # pragma: no cover - dependency not available
        raise RuntimeError(
            "pyswisseph is required for compute_chart"  # noqa: TRY003 - simple runtime message
        ) from _import_error

    if info.birth_time is not None:␊
        dt = datetime.combine(info.birth_date, info.birth_time.time())
    else:
        dt = datetime.combine(info.birth_date, time(12, 0))
    jd = swe.julday(dt.year, dt.month, dt.day, dt.hour + dt.minute / 60.0)
␊
    positions: Dict[str, PlanetPosition] = {}␊
    for name, pid in PLANETS.items():␊
        if pid is None:␊
            continue␊
        lon = swe.calc_ut(jd, pid)[0]␊
        sign_index = int(lon // 30)␊
        sign = ZODIAC_SIGNS[sign_index]␊
        degree = lon % 30␊
        positions[name] = PlanetPosition(longitude=lon, sign=sign, degree=degree)␊
␊
    return ChartData(planets=positions)␊
␊
␊
