import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import aboutUs from "../../assest/aboutus.png"

export default function Sidebar() {
  const [cat,setCat] = useState([]);

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("http://localhost:5000/api/categories")
      setCat(res.data);
    }
    getCats()
  },[]);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>
        <img
          src={aboutUs}
          alt=""
        />
        <p>
        As of now this site is not responsive and some components are not in place, so for better user experience try it with large screen devices.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
        {cat.map((c)=>(
          <li className="sidebarListItem">
            <Link className="link" to={`/posts?cat=${c.name}`}>
              {c.name}
            </Link>
          </li>

        ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
