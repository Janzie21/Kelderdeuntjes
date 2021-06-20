import classes from "../Events.module.css";
import { useState } from "react";
import slugify from "slugify";
import Image from "next/image";
import Link from "next/link";
import { knex } from "../../components/Helper";
import moment from "moment";

const Events = ({ passed, future }) => {
  const [events, setEvents] = useState(true);
  const [active, setActive] = useState(true);

  function EventDateHandler(e) {
    setEvents(events ? !events : null);
    setActive(active ? !active : null);
  }

  function newDateHandler(e) {
    setEvents({ events: (prevState) => prevState.events });
    setActive({ active: (prevState) => prevState.active });
  }

  return (
    <>
      <header className={classes.eventheader}>
        <div className={classes.content}>
          <h1>Events</h1>
        </div>
      </header>
      <section className={classes.eventsection}>
        <div className={classes.topbuttons}>
          <a
            className={active ? "btn btn-outline-light" : "btn btn-outline"}
            onClick={newDateHandler}
          >
            Passed
          </a>
          <a
            className={active ? "btn btn-outline" : "btn btn-outline-light"}
            onClick={EventDateHandler}
          >
            Upcoming
          </a>
        </div>
        <div className={classes.gallery}>
          {events
            ? passed.map(
                ({ Naam, Locatie, Affiche, FeestID, Width, Height, Alt }) => (
                  <div key={FeestID} className={classes.info}>
                    <Image
                      src={`/afbeeldingen/${Affiche}`}
                      priority={true}
                      width={Width}
                      height={Height}
                      alt={Alt}
                    />

                    <h1>{Naam}</h1>
                    <h3>{Locatie}</h3>

                    <Link href="/Gallery/">
                      <a className="btn btn-outline-light">Pics</a>
                    </Link>
                  </div>
                )
              )
            : future.map(
                ({
                  Naam,
                  Locatie,
                  Affiche,
                  FeestID,
                  Width,
                  Height,
                  Alt,
                  Datum,
                }) => (
                  <div key={FeestID} className={classes.info}>
                    <Image
                      src={`/afbeeldingen/${Affiche}`}
                      priority={true}
                      width={Width}
                      height={Height}
                      alt={Alt}
                    />

                    <h1>{Naam}</h1>
                    <h3>{Locatie}</h3>
                    <h3>{moment(future.Datum).format("DD/MM/YYYY")}</h3>

                    <Link
                      href={`/event/${FeestID}/${slugify(Naam, {
                        strict: true,
                        lower: true,
                      })}`}
                    >
                      <a className="btn btn-outline-light">Info</a>
                    </Link>
                  </div>
                )
              )}
        </div>
      </section>
    </>
  );
};

export default Events;

export async function getServerSideProps() {
  //2. Query uitvoeren //
  const data = await knex("feestjes").where("Datum", ">=", new Date());

  const otherData = await knex("feestjes").where("Datum", "<", new Date());

  const future = JSON.parse(JSON.stringify(data));
  const passed = JSON.parse(JSON.stringify(otherData));
  return {
    props: {
      passed,
      future,
    },
  };
}
