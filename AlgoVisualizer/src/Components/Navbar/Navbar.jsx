import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo1 from "../../assets/logo1.png";
import winner2 from "../../assets/winner2.png";
import algovid from "../../assets/algovid.mp4";

function Navbar() {
  const [text, setText] = useState("");
  const fullText = "See Algorithms in Action";

  useEffect(() => {
    let index = 0;
    const typingSpeed = 100;

    const typeText = () => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
        setTimeout(typeText, typingSpeed);
      }
    };

    typeText();
  }, []);

  return (
    <>
      <div className="parent">
        <div className="container">
          <div className="left">
            <img src={logo1} alt="Logo" />
            <p>AlgoVizPro</p>
          </div>
          <div className="right">
            <button>ContactUS</button>
          </div>
        </div>
        <div id="navbody">
          <div className="nav-left">
            {/* <h1>Algo<span>VizPro</span></h1> */}
            <p>
              AlgoViz is a cutting-edge platform dedicated to visualizing data
              structures and algorithms (DSA). Our goal is to simplify complex
              concepts through intuitive animations and interactive
              demonstrations, making it easier for learners and professionals
              alike to understand and master algorithms. Whether you're a
              student looking to enhance your understanding or a developer
              seeking to refine your skills, AlgoViz offers a comprehensive and
              engaging way to explore the world of DSA.
            </p>
              <div className="btn-container">
                <Link to="/algorithm">
                  Get Started Algos <span>&#8594;</span>
                </Link>
                <Link to="/linkedlist" >       
                  Get Started DS <span>&#8594;</span>
                </Link>
              </div>
          </div>
          <div className="nav-right">
            {/* <video src={algovid} autoPlay loop muted /> */}
            <img src={winner2} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
