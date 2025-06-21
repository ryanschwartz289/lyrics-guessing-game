# Future Lyrics

A web app for guessing the titles of Future songs based on their lyrics. Built with React, Vite, and Material UI.

## Features

- Randomly displays a section of lyrics from a Future song.
- Users guess the song title using an autocomplete search bar.
- Immediate feedback for correct/incorrect answers, with animations.
- Shows the correct answer if guessed incorrectly.
- Responsive and modern UI.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd future-lyrics
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```sh
npm run build
# or
yarn build
```

The output will be in the `dist/` folder.

## Project Structure

- `src/scripts/components/` — React components (e.g., `Lyrics.jsx`, `SearchBar.jsx`)
- `src/data/` — Song data in JSON format
- `src/styles/` — CSS files
- `public/` — Static assets
- `src/python/` — Python scripts for data processing

## Data

- Song data is stored in `src/data/future.json` and `src/data/titles-and-lyrics.json`.
- To update or process data, use the Python scripts in `src/python/`.

## License

MIT
