# final1

## Interactive Compass

This repository now includes `compass.py`, a simple Python script that displays an interactive compass. Use the slider below the dial to rotate the needle to any angle.

### Requirements
- Python 3
- `matplotlib`
- `numpy`

Install dependencies with:
```bash
pip install matplotlib numpy
```

Run the compass:
```bash
python compass.py
```

## Database Migration

The `birth_info` table now includes a new `birth_time` column. For a fresh setup,
initialize the database with:

```bash
sqlite3 birth_info.db < schema.sql
```

For an existing database, add the column manually:

```sql
ALTER TABLE birth_info ADD COLUMN birth_time TEXT;
```

Alternatively, running any script that instantiates `BirthInfoRepository`
will apply the migration automatically.
