
import { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSongToPlaylist } from '../playlistForm';
import ReactPlayer from 'react-player';
//import Playlist from './Playlist';
//import PlaylistPage from './PlaylistPage';

//import ReactPlayer from 'react-player';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlists = useSelector(state => state.playlists && state.playlists.playlists);

  const currentPlaylist = playlists && playlists['My Playlist'] ? playlists['My Playlist'] : [];


  useEffect(() => {
    setCurrentSongIndex(0); // Reset current song index when playlist changes
    setPlaying(true); // Auto play the first song when playlist changes
  }, [currentPlaylist]);


  const searchMusic = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/api/search?q=${query}&type=${type}`);
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
  

  return (
    <div className="music-search">
      <h1>Search Music</h1>
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
      {error && <p style={{ color: 'black' }}>{error}</p>}
      {loading && <p>Loading...</p>}
      <div className="results">
         {results.map((item, index) => (
          <div key={item.id}>
            {type === 'track' && (
              <>
                <p>{item.name} by {item.artists.map(artist => artist.name).join(', ')}</p>
                {item.preview_url && <ReactPlayer controls playing={playing && currentSongIndex === index} url={item.preview_url} onEnded={handleEnded} />}
                <button onClick={() => handleAddSong(item)}>+</button>
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
      <div className="player-controls">
        <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={playNextSong}>Next</button>
        <button onClick={toggleShuffle}>{shuffle ? 'Shuffle On' : 'Shuffle Off'}</button>
        <button onClick={toggleRepeat}>{repeat ? 'Repeat On' : 'Repeat Off'}</button>
    </div>
    </div>
  );
};

export default Music;




  
