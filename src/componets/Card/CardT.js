import React, { useEffect } from "react";
import "./CardT.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Card from "../Card/DataCardT";

const CardT = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="app__cardsection">
      {Card.map((Card) => {
        const { id, Image, Name, Style, fade,quote } = Card;
        return (
          <div className={Style} key={id} data-aos={fade}>
            <img
              className="card-img-top"
              src={require(`../../Images/${Image}`)}
            />
            <div className="card-body">
              <h5>{Name}</h5>
              <p >{quote}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardT;
