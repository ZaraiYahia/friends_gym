import React, { useState, useEffect } from "react";
import Data from "./AboutUsData";
import "./AboutUss.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
const AboutUss = () => {
  const [aboutUsImages, setCoach] = useState(Data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = aboutUsImages.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, aboutUsImages]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="app__aboutus-section">
      <div className="app__aboutus_section-center" id="aboutus">
        {aboutUsImages.map((image, imageIndex) => {
          const { id, Image } = image;
          let position = "nextSlide";
          if (imageIndex === index) {
            position = "activeSlide";
          }
          if (
            imageIndex === index - 1 ||
            (index === 0 && imageIndex === Data.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img
                src={require(`../../Images/${Image}`)}
                className="app__aboutus_section-img"
              />
            </article>
          );
        })}
        <div className="app__aboutus_section-title">
          <h2>About Us</h2>
        </div>
        <div className="app__aboutus_section-text-area">
          <p>
            welcome to Friends gym "known in the past as Club Des Amis",your
            number one source for Programe,Sports Equipement,etc.., We're
            dedicated to giving you the very best of gym things.<br />
            we hope you enjoy our section as much as we enjoy offering them to
            you,If you have any questions or comments,Please don't hesitate to
            contact Us <br />
            Sincerely,M.Mohamed Zarai.
          </p>
        </div>
        <button className="prevv" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="nextt" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default AboutUss;
