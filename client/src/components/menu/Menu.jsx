import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./menu.scss";
const Menu = ({ menuOpen, setMenuOpen }) => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <Link className="link" to="/">
            HOME
          </Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link className="link" to="/write">
            WRITE
          </Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>CONTACT</li>
        <li onClick={() => setMenuOpen(false)}>ABOUT</li>
        {user ? (
          <li onClick={(() => setMenuOpen(false),handleLogout)} style={{cursor:"pointer"}}>LOGOUT</li>
        ) : (
          <>
            <li onClick={() => setMenuOpen(false)}>
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
