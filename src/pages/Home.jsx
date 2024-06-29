import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handlenavigate = () => {
        navigate("/music");
    };

    const image =[
        "https://png.pngtree.com/thumb_back/fh260/background/20221224/pngtree-blue-musical-notes-background-image_1530362.jpg",
        "https://png.pngtree.com/background/20210717/original/pngtree-blue-creative-music-background-picture-image_1438100.jpg",
        "https://i.pinimg.com/736x/ae/f0/4d/aef04dfe189d04b1e2124899ff205529.jpg",
        "https://img.freepik.com/premium-photo/abstract-music-background-blue-abstract-background-with-music-notes_1028938-4323.jpg",
        "https://st2.depositphotos.com/4510363/6778/i/450/depositphotos_67782203-stock-photo-treble-clef-surrounded-by-musical.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % image.length);
        },5000)

        return () => clearInterval(interval);
    }, [image.length]);

    return(
        <div>
        <div>
            <img src={image[currentImage]} alt={`Slide ${currentImage}`} style={{width:800, height:400 }}></img>
        </div>
        <h1>Welcome to Music App</h1>
        <button onClick={handlenavigate}>Click here to view Music</button>
        </div>
    );
}

export default Home;