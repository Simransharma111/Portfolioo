import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Contact.css";

function Contact() {
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
      .then((json) => setData(json.contact))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <section id="contact" className="contact">
      <h2 data-aos="fade-in">{data.title}</h2>
      <p data-aos="slide-up">Email: {data.email}</p>
    </section>
  );
}

export default Contact;
