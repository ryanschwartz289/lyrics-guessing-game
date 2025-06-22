# Data Folder

This folder contains all data files used by the project. The structure is organized to separate raw and processed data, and to provide clear examples for contributors.

## Structure

- `raw/` — Contains the original, unmodified data files as obtained from external sources.
- `processed/` — Contains data files that have been cleaned, transformed, or otherwise processed for use in the application.

## Elvis Example Files

Only the Elvis Presley files are included in version control as examples:

- `raw/elvis_presley.json` — The original data for Elvis Presley, as downloaded from the source.
- `processed/elvis_presley.json` — The processed version of the Elvis Presley data, ready for use in the app.

All other artist data files are ignored by git to keep the repository lightweight and to avoid sharing copyrighted or large datasets.

## Data Source

The data in this folder is sourced from the [Genius API](https://docs.genius.com/), which provides song and lyric information for various artists. Data collection and processing is performed using the [lyricsgenius](https://github.com/johnwmillr/LyricsGenius) Python module, along with custom scripts in `src/scripts/python/`.

If you wish to add your own data, use `src/scripts/python/genius_json_generator.py`

## Notes

- Only Elvis Presley example files are tracked in git. All other data files are ignored.
- Do not commit large or copyrighted datasets.
- For more information on generating or processing data, see the scripts in `src/scripts/python/`.
- The [lyricsgenius](https://github.com/johnwmillr/LyricsGenius) Python module is required for data collection from Genius.
