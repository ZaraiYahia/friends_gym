import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app__footer" id="contactus">
      <div className="app__footer-continer">
        <div className="app__footer-row ">
          <div className="app__footer-col background1">
            <h3>Contact Us</h3>
            <ul className="app__footer_col-contact">
              <li>Adresse</li>
              <li>Adresse e-mail</li>
              <li>Fix</li>
              <li>Phone Number</li>
            </ul>
          </div>
          <div className="app__footer-col background2">
            <h3>Links</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">What we do provide?</a>
              </li>
              <li>
                <a href="#">What we do belevie In</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
            </ul>
          </div>
          <div className="app__footer-col background3">
            <h3>Social Media</h3>
            <ul className="app__footer_col-icons">
              <li>
                <TiSocialFacebook />
                <a href="#">Facebook</a>
              </li>
              <li>
                <TiSocialInstagram />
                <a href="#">Instagram</a>
              </li>
              <li>
                <TiSocialTwitter />
                <a href="#">Twitter</a>
              </li>
              <li>
                <TiSocialYoutube />
                <a href="#">Youtube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
