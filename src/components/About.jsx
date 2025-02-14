import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card } from "react-bootstrap";
import { FaReact, FaNodeJs, FaGitlab, FaJenkins, FaBootstrap } from "react-icons/fa";
import { SiMongodb, SiJira, SiJavascript } from "react-icons/si";
import "../styles/About.css";

const iconMap = {
  "React": <FaReact />,
  "JavaScript": <SiJavascript />,
  "Node.js": <FaNodeJs />,
  "MongoDB": <SiMongodb />,
  "Bootstrap": <FaBootstrap />,
  "Jira": <SiJira />,
  "GitLab": <FaGitlab />,
  "Jenkins": <FaJenkins />
};

function About() {
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
      .then((json) => setData(json.about))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <section id="about" className="about">
      <h2 data-aos="fade-in">{data.title}</h2>
      <p id="p1" data-aos="fade-up">{data.description}</p>

      <div className="cards-container">
        {/* Skills Card */}
        <Card className="skills-card" data-aos="zoom-in">
          <Card.Body>
            <Card.Title>My Skills</Card.Title>
            <div className="skills-grid">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="icon">{iconMap[skill.name]}</div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* DevOps Tools Card */}
        <Card className="skills-card" data-aos="zoom-in">
          <Card.Body>
            <Card.Title>DevOps & Tools</Card.Title>
            <div className="skills-grid">
              {data.devops.map((tool, index) => (
                <div key={index} className="skill-item">
                  <div className="icon">{iconMap[tool.name]}</div>
                  <p>{tool.name}</p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}

export default About;
