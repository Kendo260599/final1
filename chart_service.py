from __future__ import annotations

import json
import sys

from storage import BirthInfoRepository
from astro_calc import compute_chart


def main() -> None:
    if len(sys.argv) != 3:
        print(json.dumps({"error": "usage: chart_service.py <db_path> <name>"}))
        return
    db_path, name = sys.argv[1], sys.argv[2]
    repo = BirthInfoRepository(db_path)
    try:
        info = repo.get_by_name(name)
        if info is None:
            print(json.dumps({"error": "not found"}))
            return
        chart = compute_chart(info)
        data = {
            "planets": {
                planet: {
                    "sign": pos.sign,
                    "degree": pos.degree,
                }
                for planet, pos in chart.planets.items()
            }
        }
        print(json.dumps(data))
    finally:
        repo.close()


if __name__ == "__main__":
    main()
