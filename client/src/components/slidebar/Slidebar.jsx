import React, { useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../../assest/arrow.png";
import "./slidebar.scss";
const Slidebar = ({ top5 }) => {
  const PF = "http://localhost:5000/images/";
  const data = top5;
  console.log(data);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleClikc = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };
  return (
    <div className="sliderbar">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {top5.map((d) => (
          <div className="container">
          <Link to={`/post/${d._id}`} className="link">
            <div className="item">
                <div className="imgContainer">
                  <img src={PF + d.photo} alt="" />
                </div>
              <h2>{d.title}</h2>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <img
        src={arrow}
        alt=""
        className="arrow left"
        onClick={() => handleClikc("left")}
      />
      <img
        src={arrow}
        alt=""
        className="arrow right"
        onClick={() => handleClikc("right")}
      />
    </div>
  );
};

export default Slidebar;
