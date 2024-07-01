import { Link, Outlet } from "react-router-dom";

const links = [
    {
        name:"Home",
        path:"/",
        icon:<i className="fa-solid fa-house nav-icon"></i>
    },
    {
        name:"Profile",
        path:"/profile",
        icon:<i className="fa-solid fa-user nav-icon"></i>
    },
    {
        name:"Music",
        path:"/music",
        icon:<i className="fa-solid fa-music nav-icon"></i>
    },
    {
      name: "PlayList",
      path:"/playlists",
      iocn:<i className="fa-solid fa-plus-minus nav-icon"></i>
    },
];

const Layout = () => {
    return(
        <div>
            <div className="nav-container">
            {links.map((link) => (
            <Link to={link.path} className="nav-item" key={link.path}>
            <span>{link.icon}</span>
            <span>{link.name}</span>
            </Link>  
        ))}
        </div>
        <Outlet />
        </div>
    )
}

export default Layout;