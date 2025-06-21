import lyricsgenius

genius = lyricsgenius.Genius()
artist_name = "Future"
artist = genius.search_artist(artist_name, max_songs=100, sort="popularity")
artist.save_lyrics(f"/Users/ryanschwartz/Desktop/Code/Websites/future-lyrics/src/data/{artist_name.lower()}.json")  # type: ignore
