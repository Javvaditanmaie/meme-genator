import React, { useEffect, useState } from "react";
import MemeCard from "../components/Card";
import { getAllmemes } from "../api/memes";
import "../styles/Home.css";

const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllmemes().then((res) => {
      if (res?.data?.memes) {
        setData(res.data.memes);
      }
    });
  }, []);

  return (
    <div className="home-container">
     
      

      <div className="slider-container">
        <div className="slider-track">
          {data.map((ele, index) => (
            <div className="slide meme-wrapper" key={index}>
              <MemeCard img={ele.url} title={ele.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
