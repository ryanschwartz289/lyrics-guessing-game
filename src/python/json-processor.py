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

# Regex for section headers
section_re = re.compile(
    r"\[(Chorus|Intro|Verse|Bridge|Refrain|Hook|Outro|Pre-Chorus|Interlude|Break|Drop)[^\]]*\]",
    re.IGNORECASE,
)


# Helper to split lyrics into all sections (allow duplicates)
def split_sections(lyric):
    sections = []
    titles = set()
    matches = list(section_re.finditer(lyric))
    for i, match in enumerate(matches):
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(lyric)
        section_title = match.group(0)
        section_content = lyric[start:end].strip()
        if section_title.split(":")[0].strip() not in titles:
            titles.add(section_title.split(":")[0].strip())
            sections.append(
                {
                    "title": section_title,
                    "content": section_content,
                }
            )
    return sections


out_lyrics = [split_sections(lyric) for lyric in lyrics]

songs = [
    {"title": title, "lyrics": lyric_sections}
    for title, lyric_sections in zip(song_titles, out_lyrics)
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
