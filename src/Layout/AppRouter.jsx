/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "../pages/Login.jsx";
import RegisterForm from "../pages/Register.jsx";
import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Music from "../pages/Music.jsx";


const ProtectedRoute = ({element}) => {

    const isLoggedIn = Boolean(localStorage.getItem("token"));

    if(isLoggedIn){
        return element;
    }
    return <Navigate to="/login" />;  
};

const AppRouter = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
            <Route index element={< Home/>} />
            <Route path="profile" element={<Profile />} /> 
            <Route path= "music" element={<Music/>} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;