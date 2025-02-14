import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowDown } from "react-icons/fa";
import "../styles/Home.css";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((json) => setData(json.home))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <section id="home" className="home">
      <div className="content">
      <h1 className="home-name" data-aos="fade-in">Hi, I'm <span>{data.name}</span></h1>
        {/* <h2 data-aos="fade-in">{data.title}</h2> */}
        <p data-aos="slide-up">{data.subtitle}</p>
      </div>

      {/* Scroll Down Arrow */}
      <div className="scroll-down" onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}>
        <FaArrowDown />
      </div>
    </section>
  );
}

export default Home;
