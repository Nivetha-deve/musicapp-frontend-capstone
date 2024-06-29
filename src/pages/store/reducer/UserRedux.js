import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
};

const userRedux = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token",action.payload.token);
        },
        clearUser: (state) => {
            state.user = null;
            state.token = "";
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const {clearUser , setUser } = userRedux.actions;
export default  userRedux.reducer;