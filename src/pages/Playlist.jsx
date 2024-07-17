/* eslint-disable react/prop-types */

import  { useEffect, useState } from 'react';

const Playlist = ({ accessToken, playlistId, market }) => {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/api/playlist/${playlistId}?market=${market}`, {
          const response = await fetch(`https://musicapp-backend-capstone.onrender.com/api/playlist/${playlistId}?market=${market}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setPlaylist(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchPlaylist();
  }, [accessToken, playlistId, market]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>
      <p>Owner: {playlist.owner.display_name}</p>
      <p>Followers: {playlist.followers.total}</p>
      <img src={playlist.images[0]?.url} alt={playlist.name} width="300" />
      <ul>
        {playlist.tracks.items.map((item, index) => (
          <li key={index}>
            {item.track.name} by {item.track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
