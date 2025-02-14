import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

const icons = {
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaInstagram: <FaInstagram />,
  FaLinkedin: <FaLinkedin />,
};

function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setSocials(json.footer.socials))
      .catch((error) => console.error("Error loading footer data:", error));
  }, []);

  return (
    <footer className="footer">
      <div className="social-icons">
        {socials
          .filter((social) => social.link && social.link.trim() !== "") // Filter out empty links
          .map((social, index) => (
            <a key={index} href={social.link} target="_blank" rel="noopener noreferrer">
              {icons[social.icon]}
            </a>
          ))}
      </div>
    </footer>
  );
}

export default Footer;
