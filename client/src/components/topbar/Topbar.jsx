import React, { useContext } from "react";
import { Person, Mail } from "@material-ui/icons";
import "./topbar.scss";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
const Topbar = ({ menuOpen, setMenuOpen }) => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  return (
    <div className={"topbar " + (menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
            <Link className="logo" to="/">
             Yeh-hai.com
          </Link>
          {/* <div className="itemContainer">
            <Person className="icon" /> <span></span>
          </div> */}
          <div className="itemContainer">
            <Mail className="icon" /> <span>yeehhaaii@gmail.com</span>
          </div>
        </div>
        <div className="right">
          {user && (
            <>
              <Link className="link" to="/settings">
                <img
                  className="topImg"
                  src={PF + user.profilePic}
                  alt="User Image aani to cahiye"
                />
              </Link>
            </>
          )}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
