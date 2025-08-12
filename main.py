from __future__ import annotations

import argparse

from astro_calc import compute_chart
from storage import BirthInfoRepository
from validate import validate


def main() -> None:
    parser = argparse.ArgumentParser(description="Birth info CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    save_p = sub.add_parser("save", help="Save birth information")
    save_p.add_argument("name", help="Person's name")
    save_p.add_argument("birth_date", help="Birth date in YYYY-MM-DD format")

    chart_p = sub.add_parser("chart", help="Compute chart for a stored name")
    chart_p.add_argument("name", help="Person's name")

    args = parser.parse_args()

    repo = BirthInfoRepository("birth_info.db")
    try:
        if args.command == "save":
            info = validate(args.name, args.birth_date)
            repo.save(info)
            print("Saved")
        elif args.command == "chart":
            name = validate(args.name)
            info = repo.get_by_name(name)
            if info is None:
                raise SystemExit("No birth info found for that name")
            try:
                chart = compute_chart(info)
            except RuntimeError as exc:
                raise SystemExit(str(exc))
            for planet, pos in chart.planets.items():
                print(f"{planet}: {pos.sign} {pos.degree:.2f}")
    finally:
        repo.close()


if __name__ == "__main__":
    main()
