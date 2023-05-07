import React, { useState, useEffect } from "react";
import Card from "../Card/DataCardT";
import "./Coach.css";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Coach = () => {
  const [coach, setCoach] = useState(Card);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = coach.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, coach]);
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Coach
        </h2>
      </div>
      <div className="section-center">
        {coach.map((card, cardIndex) => {
          const { id, Image, Name, quote } = card;
          let position = "nextSlide";
          if (cardIndex === index) {
            position = "activeSlide";
          }
          if (
            cardIndex === index - 1 ||
            (index === 0 && cardIndex === coach.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img
                src={require(`../../Images/${Image}`)}
                alt={Name}
                className="person-img"
              />
              <h4>{Name}</h4>
              <FaQuoteLeft className="icon " />
              <p>{quote}</p>
             
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Coach;
