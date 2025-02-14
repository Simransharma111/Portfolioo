import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Project.css";

function Project() {
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
      .then((json) => setData(json.projects))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <section id="projects" className="projects">
      <h2 data-aos="fade-in">{data.title}</h2>
      <div className="project-list">
        {data.list.map((project, index) => (
          <div key={index} className="project-card" data-aos="flip-up">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <img src={project.image} alt={project.name} className="project-img" />
            </a>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Project;
