import { configureStore } from "@reduxjs/toolkit";
import UserRedux from "./reducer/UserRedux";


const store = configureStore({
    reducer: {
        user: UserRedux,
    }
})

export default store;