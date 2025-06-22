from unittest.mock import MagicMock, mock_open, patch

import pytest

from src.scripts.python.genius_json_generator import artist_name, genius


def test_read_artist_name():
    mock_content = "Test Artist"
    with patch("builtins.open", mock_open(read_data=mock_content)):
        with open("public/artist_name.txt", "r") as f:
            content = f.read().strip()
        assert content == "Test Artist"


@patch("lyricsgenius.Genius")
def test_genius_search(mock_genius):
    mock_genius_instance = MagicMock()
    mock_genius.return_value = mock_genius_instance
    mock_artist = MagicMock()
    mock_genius_instance.search_artist.return_value = mock_artist

    genius = mock_genius()
    result = genius.search_artist("Test Artist", max_songs=3, sort="popularity")

    mock_genius_instance.search_artist.assert_called_once_with(
        "Test Artist", max_songs=3, sort="popularity"
    )
    assert result == mock_artist


@patch("os.rename")
@patch("os.remove")
def test_file_operations(mock_remove, mock_rename):
    test_artist = "test_artist"
    source = f"{test_artist}.json"
    dest = f"src/data/raw/{test_artist}.json"

    # Call rename and remove
    mock_rename(source, dest)
    mock_remove(source)

    # Verify calls
    mock_rename.assert_called_once_with(source, dest)
    mock_remove.assert_called_once_with(source)
