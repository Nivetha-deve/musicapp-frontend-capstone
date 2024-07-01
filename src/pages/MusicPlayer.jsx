import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { useDispatch } from 'react-redux';
import { removeSongFromPlaylist } from '../playlistForm';


const MusicPlayer = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlists.playlists);
  
    const currentPlaylist = playlists['My Playlist'] || [];
  
    useEffect(() => {
      setCurrentSongIndex(0); // Reset current song index when playlist changes
      setPlaying(true); // Auto play the first song when playlist changes
    }, [currentPlaylist]);
  
    const togglePlayPause = () => {
      setPlaying(!playing);
    };
  
    const playNextSong = () => {
      let newIndex = currentSongIndex + 1;
      if (shuffle) {
        newIndex = Math.floor(Math.random() * currentPlaylist.length);
      } else if (repeat && newIndex >= currentPlaylist.length) {
        newIndex = 0;
      }
  
      if (newIndex >= currentPlaylist.length) {
        setPlaying(false); // Stop playing when playlist ends
      } else {
        setCurrentSongIndex(newIndex);
        setPlaying(true); // Auto play the next song
      }
    };
  
    const handleEnded = () => {
      playNextSong();
    };
  
    const handleRemoveSong = (songId) => {
      dispatch(removeSongFromPlaylist({ playlistName: 'My Playlist', songId }));
    };
  
    const toggleShuffle = () => {
      setShuffle(!shuffle);
    };
  
    const toggleRepeat = () => {
      setRepeat(!repeat);
    };
  
    return (
      <div className="music-player">
        <h2>Now Playing</h2>
        <ReactPlayer
          url={currentPlaylist[currentSongIndex]?.url || ''}
          playing={playing}
          controls={true}
          onEnded={handleEnded}
        />
        <div className="player-controls">
          <button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={playNextSong}>Next</button>
          <button onClick={() => handleRemoveSong(currentPlaylist[currentSongIndex]?.id)}>Remove from Playlist</button>
          <button onClick={toggleShuffle}>{shuffle ? 'Shuffle On' : 'Shuffle Off'}</button>
          <button onClick={toggleRepeat}>{repeat ? 'Repeat On' : 'Repeat Off'}</button>
        </div>
      </div>
    );
  };

export default MusicPlayer;
