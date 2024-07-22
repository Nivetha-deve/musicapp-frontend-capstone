//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handlenavigate = () => {
        navigate("/music");
    };


    return(
<div className="home-container">
      <h1 className="title">Music Streaming  Application</h1>
      <button className='btn' onClick={handlenavigate} >
        Click to view Music
      </button>
    </div>
  );
};

export default Home;