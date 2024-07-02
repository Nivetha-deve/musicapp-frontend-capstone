import { configureStore } from "@reduxjs/toolkit";
import UserRedux from "./reducer/UserRedux";
import playlistForm from "../../playlistForm";
import musicReducer from "./reducer/MusicReducer";


const store = configureStore({
    reducer: {
        user: UserRedux,
        playlists: playlistForm,
        music: musicReducer,
    },
        devTools: true,
})

export default store;