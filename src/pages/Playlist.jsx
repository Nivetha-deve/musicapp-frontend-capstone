
import { useSelector, useDispatch } from 'react-redux';
import { removeSongFromPlaylist } from "../playlistForm"

const Playlist = () => {
  const playlists = useSelector(state => state.playlists);
  const dispatch = useDispatch();

  const handleRemoveSong = (songId, playlistName) => {
    dispatch(removeSongFromPlaylist({ playlistName, songId }));
  };

  return (
    <div className="playlist-page">
    <h2>Playlists</h2>
    {Object.keys(playlists).length === 0 ? (
      <p>No playlists available.</p>
    ) : (
      Object.keys(playlists).map(playlistName => (
        <div key={playlistName}>
          <h3>{playlistName}</h3>
          <ul>
            {playlists[playlistName].map(song => (
              <li key={song.id}>
                {song.name} by {song.artists.map(artist => artist.name).join(', ')}
                <button onClick={() => handleRemoveSong(playlistName, song.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ))
    )}
  </div>
);
};

export default Playlist;
