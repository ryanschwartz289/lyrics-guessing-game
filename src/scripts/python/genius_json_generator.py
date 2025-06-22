"""
This script uses the Genius API to fetch lyrics for a specific artist and saves them in a JSON file.
Run this script from the root of the project.
"""

import os

import lyricsgenius
from process_json import process_json

# print(f"Current working directory: {os.getcwd()}")
with open(
    "public/artist_name.txt",
    "r",
    encoding="utf-8",
) as file:
    artist_name = file.read().strip()
# print(artist_name)
genius = lyricsgenius.Genius()
artist = genius.search_artist(artist_name, max_songs=20, sort="popularity")
artist_name = artist_name.replace(" ", "_").lower()
artist.save_lyrics(artist_name.lower(), overwrite=True)  # type: ignore

# Debug: Print current working directory and check if file exists

source_path = f"{artist_name}.json"
dest_path = f"src/data/raw/{artist_name}.json"

os.rename(source_path, dest_path)
# remove the original file if it exists
if os.path.exists(source_path):
    os.remove(source_path)


process_json()
