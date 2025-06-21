import lyricsgenius

genius = lyricsgenius.Genius()
artist = genius.search_artist("Future", max_songs=100, sort="popularity")
print(artist.save_lyrics("future.json"))  # type: ignore
