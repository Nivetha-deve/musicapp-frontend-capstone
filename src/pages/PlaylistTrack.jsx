/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const PlaylistTracks = ({ playlistId, market, fields, limit = 20, offset = 0, additionalTypes }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const url = `http://localhost:8000/api/playlist/${playlistId}?limit=${limit}&offset=${offset}${market ? `&market=${market}` : ''}${fields ? `&fields=${fields}` : ''}${additionalTypes ? `&additional_types=${additionalTypes}` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setTracks(data.items);
      } catch (err) {
        setError(err);
      }
    };

    fetchTracks();
  }, [playlistId, market, fields, limit, offset, additionalTypes]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (tracks.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Playlist Tracks</h1>
      <ul>
        {tracks.map((item, index) => (
          <li key={index}>
            {item.track.name} by {item.track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistTracks;