import { useState, useEffect } from 'react';

const Music = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const baseURL = 'http://localhost:8000/api/search';

  useEffect(() => {
    // Automatically initiate OAuth flow when the component mounts
    window.location.href = 'http://localhost:8000';
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${baseURL}?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data); 
      setSongs(data.data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    }
  };

  const playSong = (songPreviewUrl) => {
    setCurrentSong(songPreviewUrl);
  };

  return (
    <div className="App">
      <h1>Music Player</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a song"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="song-list">
        {songs.length === 0 ? (
          <p>No songs found. Try a different search term.</p>
        ) : (
          songs.map((song) => (
            <div key={song.id} className="song-item" onClick={() => playSong(song.preview)}>
              <p>{song.title} - {song.artist.name}</p>
            </div>
          ))
        )}
      </div>
      {currentSong && (
        <audio controls autoPlay>
          <source src={currentSong} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default Music;


// import { useState } from 'react';

// const Music = () => {
//   const [query, setQuery] = useState('');
//   const [songs, setSongs] = useState([]);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [error, setError] = useState('');

//   const baseURL = 'http://localhost:8000/api/search';

//   // Function to handle search input change
//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   // Function to handle search button click
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`${baseURL}?q=${encodeURIComponent(query)}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//         }
//       });

//       if (!response.ok) {
//         // Check for specific OAuth error
//         if (response.status === 401) {
//           throw new Error('Invalid OAuth access token');
//         } else {
//           throw new Error('Network response was not ok');
//         }
//       }

//       const data = await response.json();
//       console.log('Fetched data:', data);

//       if (data.error && data.error.code === 300) {
//         setError('Invalid OAuth access token. Please log in again.');
//         setSongs([]);
//       } else {
//         setSongs(data.data || []);
//         setError('');
//       }
//     } catch (error) {
//       console.error('Error fetching songs:', error);
//       setError(error.message);
//       setSongs([]);
//     }
//   };

//   // Function to handle song selection and play
//   const playSong = (songPreviewUrl) => {
//     setCurrentSong(songPreviewUrl);
//   };

//   return (
//     <div className="App">
//       <h1>Music Player</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search for a song"
//           value={query}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div className="song-list">
//         {error && <p className="error">{error}</p>}
//         {songs.length === 0 && !error ? (
//           <p>No songs found. Try a different search term.</p>
//         ) : (
//           songs.map((song) => (
//             <div key={song.id} className="song-item" onClick={() => playSong(song.preview)}>
//               <p>{song.title} - {song.artist.name}</p>
//             </div>
//           ))
//         )}
//       </div>
//       {currentSong && (
//         <audio controls autoPlay>
//           <source src={currentSong} type="audio/mp3" />
//           Your browser does not support the audio element.
//         </audio>
//       )}
//     </div>
//   );
// }

// export default Music;






  
