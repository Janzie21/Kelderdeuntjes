import classes from "./Booking.module.css";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Social from "../components/Social";
import Bookingform from "./Bookingform";

const Booking = () => {
  return (
    <body id="booking" className={classes.booking}>
      <header className={classes.bookingheader}></header>
      <div className={classes.overlayText}>
        <h2 id="topText">Hire Us</h2>
      </div>

      <ReactPlayer
        url={"https://www.youtube.com/watch?v=4NlM3HhMOjg"}
        width="100%"
        height="100vh"
        config={{
          youtube: {
            playerVars: {
              showinfo: false,
              autoplay: true,
              controls: false,
              modestbranding: true,
              loop: true,
            },
          },
        }}
      />

      <section id="contact" className="contact flex-columns">
        <div className="row">
          <div className="column">
            <div className="column-1 bg-dark">
              <div className={classes.contactdetails} className="bg-dark">
                <div className={classes.display}>
                  <h2>Contact details</h2>
                  <p>
                    <FontAwesomeIcon icon={faPhone} />
                    +32(0)494676492
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faEnvelope} />
                    michael@kelderdeuntjes.be
                  </p>
                  <Social />
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="column-2 bg-dark">
              <h2>Booking form</h2>
              <Bookingform />
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Booking;
