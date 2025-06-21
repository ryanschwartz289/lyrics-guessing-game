import json
import re

json_file = (
    "/Users/ryanschwartz/Desktop/Code/Websites/future-lyrics/src/data/future.json"
)
with open(json_file, "r", encoding="utf-8") as file:
    data = json.load(file)
artist_name = data.get("artist", "Unknown Artist")
song_titles = [song.get("title", "Unknown Title") for song in data.get("songs", [])]
lyrics = [song.get("lyrics", "No Lyrics") for song in data.get("songs", [])]


def clean_lyrics(lyric):
    # Find the first section marker like [Chorus], [Intro], [Verse], etc.
    match = re.search(
        r"\[(Chorus|Intro|Verse|Bridge|Refrain|Hook|Outro|Pre-Chorus|Interlude|Break|Drop)[^\]]*\]",
        lyric,
        re.IGNORECASE,
    )
    if match:
        return lyric[match.start() :].strip()
    # fallback: look for any [Section]
    match2 = re.search(r"\[.*?\]", lyric)
    if match2:
        return lyric[match2.start() :].strip()
    return lyric.strip()


out_lyrics = [clean_lyrics(lyric) for lyric in lyrics]

songs = [
    {"title": title, "lyrics": lyric}
    for title, lyric in zip(song_titles, out_lyrics)
    if "remix" not in title.lower()
]
songs = sorted(songs, key=lambda x: x["title"].lower())

# Write to new JSON file
with open(
    "/Users/ryanschwartz/Desktop/Code/Websites/future-lyrics/src/data/titles-and-lyrics.json",
    "w",
    encoding="utf-8",
) as outfile:
    json.dump(songs, outfile, ensure_ascii=False, indent=2)
