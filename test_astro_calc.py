from datetime import date, datetime

import astro_calc
from storage import BirthInfo


def test_birth_time_affects_positions(monkeypatch):
    class DummySwe:
        SUN = 0
        def julday(self, year, month, day, hour):
            return hour
        def calc_ut(self, jd, pid):
            return (jd + pid,)
    dummy = DummySwe()
    monkeypatch.setattr(astro_calc, "swe", dummy)
    monkeypatch.setattr(astro_calc, "PLANETS", {"Sun": dummy.SUN})

    base = {
        "name": "Test",
        "birth_date": date(2000, 1, 1),
        "gender": "",
        "datetime_utc": datetime(2000, 1, 1),
        "latitude": 0.0,
        "longitude": 0.0,
    }
    info_default = BirthInfo(**base)
    info_with_time = BirthInfo(**base, birth_time=datetime(2000, 1, 1, 6, 0))

    chart_default = astro_calc.compute_chart(info_default)
    chart_with_time = astro_calc.compute_chart(info_with_time)

    assert chart_default.planets["Sun"].longitude != chart_with_time.planets["Sun"].longitude
