import { createSlice } from '@reduxjs/toolkit';

const initialState ={
  'My Playlist': []
};

const playlistForm = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const playlistName = action.payload;
      if (!state.playlists[playlistName]) {
        state.playlists[playlistName] = [];
      }
    },
    addSongToPlaylist: (state, action) => {
      const { playlistName = 'My Playlist', song } = action.payload;
      if (!state[playlistName]) {
        state[playlistName] = [];
      }
      state[playlistName].push(song);
    },
    removeSongFromPlaylist: (state, action) => {
      const { playlistName, songId } = action.payload;
      //if (state[playlistName]) {
      state[playlistName] = state[playlistName].filter(song => song.id !== songId);
    }
  }
  //}
});

export const { createPlaylist, addSongToPlaylist, removeSongFromPlaylist } = playlistForm.actions;
export default playlistForm.reducer;