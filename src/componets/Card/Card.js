import React, { useEffect } from "react";
import "./Card.css";
import Cardd from "../Card/DataCard";

const Card = () => {
  return (
    <div className="CardSection">
      {Cardd.map((Card) => {
        const { id, Image, Title, Style } = Card;
        console.log();
        return (
          <div className={Style} key={id}>
            <img
              className="card-img-top"
              src={require(`../../Images/${Image}`)}
            />
            <div className="card-body">
              <h5>{Title}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
