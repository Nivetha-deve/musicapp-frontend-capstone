import { configureStore } from "@reduxjs/toolkit";
import UserRedux from "./reducer/UserRedux";
import playlistForm from "../../playlistForm";


const store = configureStore({
    reducer: {
        user: UserRedux,
        playlists: playlistForm,
    },
        devTools: true,
})

export default store;