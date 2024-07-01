import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handlenavigate = () => {
        navigate("/music");
    };

    const image =[
            "https://t4.ftcdn.net/jpg/02/05/69/11/360_F_205691115_iJyspHIl91dt7Hv9ReSsvjRoMqrt740f.jpg",
            "https://png.pngtree.com/png-clipart/20200701/original/pngtree-red-creative-texture-abstract-musical-note-png-image_5351202.jpg",
            "https://www.kindpng.com/picc/m/10-101867_transparent-music-notes-clipart-png-music-notes-clipart.png",
            "https://e7.pngegg.com/pngimages/645/309/png-clipart-musical-note-staff-clave-de-sol-music-notes-love-miscellaneous.png",
            "https://png.pngtree.com/background/20210712/original/pngtree-gradient-light-blue-abstract-musical-notes-background-picture-image_1178006.jpg"  
          ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % image.length);
        },5000)

        return () => clearInterval(interval);
    }, [image.length]);

    return(
<div className="home-container">
      <div className="image-wrapper">
        <img
          src={image[currentImage]}
          alt={`Slide ${currentImage}`}
          className="image"
        />
      </div>
      <h1 className="title">Music App</h1>
      <button onClick={handlenavigate} className="btn-music">
        Click to view Music
      </button>
    </div>
  );
};

export default Home;