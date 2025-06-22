# Guess the Song from the Lyrics

Guess the Song from the Lyrics is a web application that lets users explore, search, and interact with song lyrics from various artists. The project demonstrates data collection, processing, and visualization using modern web technologies and the Genius API.

## Features

- Search and autocomplete for song titles with artist images
- Interactive lyric guessing and scoring
- Adjustable number of songs to display
- Clean, modern UI with Material-UI (MUI)
- Example data for Elvis Presley included; other data is ignored for copyright and size reasons

## Project Structure

- `src/` — Main application source code
  - `components/` — React components (SearchBar, Lyrics, Score, SongCountInput, etc.)
  - `data/` — Data files (see `src/data/README.md` for details)
  - `scripts/python/` — Python scripts for data collection and processing
- `public/` — Static assets
- `tests/` — Test files for Python scripts

## Data

- Data is sourced from the [Genius API](https://docs.genius.com/) using the [lyricsgenius](https://github.com/johnwmillr/LyricsGenius) Python module.
- Only Elvis Presley example files are included in version control.
- See `src/data/README.md` for more information about the data structure and processing.

## Dependencies

### JavaScript/React

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (for fast development and build)
- [@mui/material](https://mui.com/) (Material-UI components)

### Python (for data processing)

- [lyricsgenius](https://github.com/johnwmillr/LyricsGenius)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **(Optional) Process data:**
   - Install Python dependencies: `pip install lyricsgenius`
   - Use scripts in `src/scripts/python/` to fetch and process data

## License

This project is for educational and demonstration purposes. Please respect the terms of use for the Genius API and do not distribute copyrighted data.
