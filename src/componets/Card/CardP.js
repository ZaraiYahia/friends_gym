import React from "react";
import "./CardP.css";
import Card from "./DataCardP";

const CardP = () => {
  return (
    <div className="CardSection">
      {Card.map((Card) => {
        const { id, Image, ProductName, Style } = Card;
        console.log();
        return (
          <div className={Style} key={id}>
            <img
              className="card-img-top"
              src={require(`../../Images/${Image}`)}
            />
            <div className="card-body">
              <h5>{ProductName}</h5>
              <p></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardP;
