/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSongToPlaylist } from '../playlistForm';
import ReactPlayer from 'react-player';
import { handleLikeSong } from './store/MusicUtils.js';
import { addcomment } from './store/musicAction.js';

const Music = () => {
  const [query, setQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = useState('track');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [comment, setComment] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector(state => state.playlists && state.playlists.playlists);
  const currentPlaylist = playlists && playlists['My Playlist'] ? playlists['My Playlist'] : [];
  const comments = useSelector((state) => state.music.comments || {});
  const likedSongs = useSelector((state) => state.music.likedSongs || []);


  useEffect(() => {
    setCurrentSongIndex(0); 
  }, [currentPlaylist]);

  const searchMusic = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://musicapp-backend-capstone.onrender.com/api/search?q=${query}&type=${type}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data[type + "s"]?.items || []);
    } catch (error) {
      console.error('Error fetching data from server:', error.message);
      setError('Failed to fetch data from server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = (song) => {
    dispatch(addSongToPlaylist({ song }));
    navigate("/playlists");
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
    } else {
      setCurrentSongIndex(index);
      setCurrentUrl(url);
      setPlaying(true);
    }
  };

  const handleCommentFormSubmit = (index, e) => {
    e.preventDefault();
    const commentValue = comment[index];
    if (commentValue) {
    dispatch(addcomment({ index, comment: commentValue }));
    setComment(prev => ({ ...prev, [index]: '' }));
  }
}

  const handleCommentChange = (index, e) => {
  setComment(prev => ({ ...prev, [index]: e.target.value }));
  };


  return (
    <div className="music-search">
      <h1 className='music-title'>Search Music</h1>
      <div className='music-play'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${type}s...`}
        />
        <button className='btn' onClick={searchMusic} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      <div className='music-main'>
        {error && <p style={{ color: 'black' }}>{error}</p>}
        {loading && <p>Loading...</p>}
        <div className="results">
          {results.map((item, index) => (
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
                      value={comment[index] || ""}
                      onChange={(e) => handleCommentChange(index, e)}
                      placeholder="Add a comment..."
                    />
                    <button type="submit">Submit</button>
                  </form>
                   {comments[index] && comments[index].map((commentText, commentIndex) => (
                   <p key={commentIndex}>Comment: {commentText}</p> 
                  ))}
                </>
                )}
                    </div>
                  ))}
            </div>
      <div className="player-controls">
        <button className='btn' onClick={playPrevSong}>Prev</button>
        <button className='btn' onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <button className='btn' onClick={playNextSong}>Next</button>
        <button className='btn' onClick={toggleShuffle}>{shuffle ? 'Shuffle On' : 'Shuffle Off'}</button>
        <button className='btn' onClick={toggleRepeat}>{repeat ? 'Repeat On' : 'Repeat Off'}</button>
      </div>
    </div>
    </div>
  );
};


export default Music;



  
