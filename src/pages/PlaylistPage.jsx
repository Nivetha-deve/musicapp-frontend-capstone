import { useSelector } from 'react-redux';

const PlaylistPage = () => {
  const playlists = useSelector(state => state.playlists);

  if (!playlists) {
    return <div>Loading...</div>;
  }

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
                </li>
            ))}
          </ul>
        </div>
      ))
    )}
    </div>
  );
};

export default PlaylistPage;