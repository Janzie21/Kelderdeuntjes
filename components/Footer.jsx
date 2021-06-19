import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSoundcloud,
  faInstagram,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Social from './Social';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
     <Social />
      <p>Copyright &copy; Nick Janssen</p>
    </footer>
  );
};

export default Footer;
