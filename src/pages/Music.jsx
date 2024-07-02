// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addSongToPlaylist } from '../playlistForm';
// import ReactPlayer from 'react-player';
// import { handleLikeSong } from './store/MusicUtils';
// import { addcomment } from './store/musicAction';

// const Music = () => {
//   const [query, setQuery] = useState('');
//   const [type, setType] = useState('track');
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currentSongIndex, setCurrentSongIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [shuffle, setShuffle] = useState(false);
//   const [repeat, setRepeat] = useState(false);
//   const [currentUrl, setCurrentUrl] = useState('');
//   const [comment, setComment] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const playlists = useSelector(state => state.playlists && state.playlists.playlists);
//   const currentPlaylist = playlists && playlists['My Playlist'] ? playlists['My Playlist'] : [];
//   const comments = useSelector((state) => state.music.comments || []);
//   const likedSongs = useSelector((state) => state.music.likedSongs || []);

//   useEffect(() => {
//     setCurrentSongIndex(0); // Reset current song index when playlist changes
//     setPlaying(true); // Auto play the first song when playlist changes
//   }, [currentPlaylist]);

//   const searchMusic = async () => {
//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:8000/api/albums/${query}/tracks`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();
//       setResults(data || []);
//     } catch (error) {
//       console.error('Error fetching data from server:', error.message);
//       setError('Failed to fetch data from server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddSong = (song) => {
//     dispatch(addSongToPlaylist({ song }));
//     navigate("/playlists");
//   };

//   const togglePlayPause = () => {
//     setPlaying(!playing);
//   };

//   const playPrevSong = () => {
//     let newIndex = currentSongIndex - 1;
//     if (shuffle) {
//       newIndex = Math.floor(Math.random() * results.length);
//     } else if (repeat && newIndex < 0) {
//       newIndex = results.length - 1;
//     }

//     if (newIndex < 0) {
//       setPlaying(false); // Stop playing when playlist ends
//     } else {
//       setCurrentSongIndex(newIndex);
//       setCurrentUrl(results[newIndex]?.preview_url || '');
//       setPlaying(true); // Auto play the previous song
//     }
//   };

//   const playNextSong = () => {
//     let newIndex = currentSongIndex + 1;
//     if (shuffle) {
//       newIndex = Math.floor(Math.random() * results.length);
//     } else if (repeat && newIndex >= results.length) {
//       newIndex = 0;
//     }

//     if (newIndex >= results.length) {
//       setPlaying(false); // Stop playing when playlist ends
//     } else {
//       setCurrentSongIndex(newIndex);
//       setCurrentUrl(results[newIndex]?.preview_url || '');
//       setPlaying(true); // Auto play the next song
//     }
//   };

//   const handleEnded = () => {
//     playNextSong();
//   };

//   const toggleShuffle = () => {
//     setShuffle(!shuffle);
//   };

//   const toggleRepeat = () => {
//     setRepeat(!repeat);
//   };

//   const handlePlayPauseClick = (url, index) => {
//     if (currentUrl === url && playing) {
//       setPlaying(false);
//     } else {
//       setCurrentSongIndex(index);
//       setCurrentUrl(url);
//       setPlaying(true);
//     }
//   };

//   const handleCommentFormSubmit = (index, e) => {
//     e.preventDefault();
//     const commentValue = comment[index];
//     dispatch(addcomment(commentValue));

//     const newComments = [...comment];
//     newComments[index] = ''; // Clear the comment field
//     setComment(newComments);
//   }

//   const handleCommentChange = (index, e) => {
//     const newComments = [...comment];
//     newComments[index] = e.target.value;
//     setComment(newComments);
//   };

//   return (
//     <div className="music-search">
//       <h1>Search Music</h1>
//       <div className='music-play'>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder={`Search ${type}s...`}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="track">Song Title</option>
//           <option value="artist">Artist</option>
//           <option value="album">Album</option>
//         </select>
//         <button onClick={searchMusic} disabled={loading}>
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       <div className='music-main'>
//         {error && <p style={{ color: 'black' }}>{error}</p>}
//         {loading && <p>Loading...</p>}
//         <div className="results">
//           {results.map((item, index) => (
//             <div key={item.id}>
//               {type === 'track' && (
//                 <>
//                   <p>{item.name} by {item.artists.map(artist => artist.name).join(', ')}</p>
//                   {item.preview_url && (
//                     <ReactPlayer
//                       controls
//                       playing={currentUrl === item.preview_url && playing}
//                       url={item.preview_url}
//                       onEnded={handleEnded}
//                       onPlay={() => {
//                         if (currentUrl !== item.preview_url) {
//                           setCurrentSongIndex(index);
//                           setCurrentUrl(item.preview_url);
//                           setPlaying(true);
//                         }
//                       }}
//                       onPause={() => {
//                         if (currentUrl === item.preview_url) {
//                           setPlaying(false);
//                         }
//                       }}
//                     />
//                   )}
//                   <button onClick={() => handleAddSong(item)}>+</button>
//                   <button onClick={() => handlePlayPauseClick(item.preview_url, index)}>
//                     {currentUrl === item.preview_url && playing ? 'Pause' : 'Play'}
//                   </button>
//                   <button onClick={() => handleLikeSong(dispatch, index)}>
//                     <i className={likedSongs.includes(index) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
//                   </button>
//                   <form onSubmit={(e) => handleCommentFormSubmit(index, e)}>
//                     <input
//                       type="text"
//                       name="comment"
//                       value={comment[index] || ""}
//                       onChange={(e) => handleCommentChange(index, e)}
//                       placeholder="Add a comment..."
//                     />
//                     <button type="submit">Submit</button>
//                   </form>
//                   {/* Display comments */}
//                   {comments[index] && (
//                     <p>Comment: {comments[index]}</p>
//                   )}
//                 </>
//               )}
//               {type === 'artist' && (
//                 <p>{item.name}</p>
//               )}
//               {type === 'album' && (
//                 <p>{item.name} by {item.artists.map(artist => artist.name).join(', ')}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="player-controls">
//         <button onClick={playPrevSong}>Prev</button>
//         <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
//         <button onClick={playNextSong}>Next</button>
//         <button onClick={toggleShuffle}>{shuffle ? 'Shuffle On' : 'Shuffle Off'}</button>
//         <button onClick={toggleRepeat}>{repeat ? 'Repeat On' : 'Repeat Off'}</button>
//       </div>
//     </div>
//   );
// };

// export default Music;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSongToPlaylist } from '../playlistForm';
import ReactPlayer from 'react-player';
import { handleLikeSong } from './store/MusicUtils';
import { addcomment } from './store/musicAction';

const Music = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('track');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector((state) => state.playlists && state.playlists.playlists);
  const currentPlaylist = playlists && playlists['My Playlist'] ? playlists['My Playlist'] : [];

  const comments = useSelector((state) => state.music.comments);
  const likedSongs = useSelector((state) => state.music.likedSongs);

  useEffect(() => {
    setCurrentSongIndex(0); // Reset current song index when playlist changes
    setPlaying(true); // Auto play the first song when playlist changes
  }, [currentPlaylist]);

  const searchMusic = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/albums/${query}/tracks`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data || []);
    } catch (error) {
      console.error('Error fetching data from server:', error.message);
      setError('Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = (song) => {
    dispatch(addSongToPlaylist({ song }));
    navigate('/playlists');
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const playPrevSong = () => {
    let newIndex = currentSongIndex - 1;
    if (shuffle) {
      newIndex = Math.floor(Math.random() * results.length);
    } else if (repeat && newIndex < 0) {
      newIndex = results.length - 1;
    }

    if (newIndex < 0) {
      setPlaying(false); // Stop playing when playlist ends
    } else {
      setCurrentSongIndex(newIndex);
      setCurrentUrl(results[newIndex]?.preview_url || '');
      setPlaying(true); // Auto play the previous song
    }
  };

  const playNextSong = () => {
    let newIndex = currentSongIndex + 1;
    if (shuffle) {
      newIndex = Math.floor(Math.random() * results.length);
    } else if (repeat && newIndex >= results.length) {
      newIndex = 0;
    }

    if (newIndex >= results.length) {
      setPlaying(false); // Stop playing when playlist ends
    } else {
      setCurrentSongIndex(newIndex);
      setCurrentUrl(results[newIndex]?.preview_url || '');
      setPlaying(true); // Auto play the next song
    }
  };

  const handleEnded = () => {
    playNextSong();
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const handlePlayPauseClick = (url, index) => {
    if (currentUrl === url && playing) {
      setPlaying(false);
      //setPlaying(!playing);
    } else {
      setCurrentSongIndex(index);
      setCurrentUrl(url);
      setPlaying(true);
    }
  };

  const handleCommentFormSubmit = (index, e) => {
    e.preventDefault();
    const commentValue = comment[index];
    dispatch(addcomment(commentValue));

    const newComments = [...comment];
    newComments[index] = ''; // Clear the comment field
    setComment(newComments);
  };

  const handleCommentChange = (index, e) => {
    const newComments = [...comment];
    newComments[index] = e.target.value;
    setComment(newComments);
  };

  return (
    <div className="music-search">
      <h1>Search Music</h1>
      <div className="music-play">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${type}s...`}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="track">Song Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <button onClick={searchMusic} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div className="music-main">
        {error && <p style={{ color: 'black' }}>{error}</p>}
        {loading && <p>Loading...</p>}
        <div className="results">
          {results && results.length > 0 && results.map((item, index) => (
            <div key={item.id}>
              {type === 'track' && (
                <>
                  <p>{item.name} by {item.artists.map(artist => artist.name).join(', ')}</p>
                  {item.preview_url && (
                    <ReactPlayer
                      controls
                      playing={currentUrl === item.preview_url && playing}
                      url={item.preview_url}
                      onEnded={handleEnded}
                      onPlay={() => {
                        if (currentUrl !== item.preview_url) {
                          setCurrentSongIndex(index);
                          setCurrentUrl(item.preview_url);
                          setPlaying(true);
                        }
                      }}
                      onPause={() => {
                        if (currentUrl === item.preview_url) {
                          setPlaying(false);
                        }
                      }}
                    />
                  )}
                  <button onClick={() => handleAddSong(item)}>+</button>
                  <button onClick={() => handlePlayPauseClick(item.preview_url, index)}>
                    {currentUrl === item.preview_url && playing ? 'Pause' : 'Play'}
                  </button>
                  <button onClick={() => handleLikeSong(dispatch, index)}>
                    <i className={likedSongs.includes(index) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                  </button>
                  <form onSubmit={(e) => handleCommentFormSubmit(index, e)}>
                    <input
                      type="text"
                      name="comment"
                      value={comment[index] || ''}
                      onChange={(e) => handleCommentChange(index, e)}
                      placeholder="Add a comment..."
                    />
                    <button type="submit">Submit</button>
                  </form>
                  {comments[index] && (
                    <p>Comment: {comments[index]}</p>
                  )}
                </>
              )}
              {type === 'artist' && (
                <p>{item.name}</p>
              )}
              {type === 'album' && (
                <p>{item.name} by {item.artists.map(artist => artist.name).join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="player-controls">
        <button onClick={playPrevSong}>Prev</button>
        <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={playNextSong}>Next</button>
        <button onClick={toggleShuffle}>{shuffle ? 'Shuffle On' : 'Shuffle Off'}</button>
        <button onClick={toggleRepeat}>{repeat ? 'Repeat On' : 'Repeat Off'}</button>
      </div>
    </div>
  );
};

export default Music;




  
