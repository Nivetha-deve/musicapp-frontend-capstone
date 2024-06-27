import { Link, Outlet } from "react-router-dom";



const links = [
    {
        name:"Home",
        path:"/",
        icon:<i className="fa-solid fa-house"></i>
    },
    {
        name:"Profile",
        path:"/profile",
        icon:<i className="fa-solid fa-user"></i>
    },
    {
        name:"Music",
        path:"/music",
        icon:<i className="fa-solid fa-music"></i>
    },
];

const Layout = () => {
    return(
        <>
        {links.map((link) => (
            <div key={link.path}>
              <Link to={link.path}>
              <span>{link.icon}</span>
              <span>{link.name}</span>
              <br />
              </Link>  
            </div>
        ))}
        <Outlet />
        </>
    )
}

export default Layout ;