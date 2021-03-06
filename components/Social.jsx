import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSoundcloud,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Social() {

  return (
    <div className="social">
        <a href="https://www.facebook.com/KDeventsBel" target="_blank">
          <span className="facebook">
            <FontAwesomeIcon icon={faFacebookF} className="fa-2x" />
          </span>
        </a>
        <a href="https://www.instagram.com/kelderdeuntjes/">
          <span className="insta">
            <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
          </span>
        </a>
        <a href="https://soundcloud.com/user-978626890">
          <span className="soundcloud">
            <FontAwesomeIcon icon={faSoundcloud} className="fa-2x" />
          </span>
        </a>
        <a href="mailto:kelderdeuntjes@gmail.com">
          <span className="email">
            <FontAwesomeIcon icon={faEnvelope} className="fa-2x" />
          </span>
        </a>
      </div>
  );
}

export default Social;


