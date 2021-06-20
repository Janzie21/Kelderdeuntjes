import Header from "../components/Header";
import Image from "next/image";
import Link from "next/link";
import SimpleSlider from "../components/SimpleSlider";
import { knex } from "../components/Helper";
import { useState } from "react";
import slugify from "slugify";
import moment from "moment";

const Home = ({ future }) => {
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [em, setEm] = useState("");
  const submitForm = (e) => {
    e.preventDefault();

    fetch("/api/add_to_contact", {
      method: "post",
      body: JSON.stringify({
        Voornaam: fn,
        Naam: ln,
        "E-mail": em,
      }),
    })
      .then((resp) => resp.json())
      .then((text) => console.log(text));
  };
  return (
    <div id="home">
      <Header />
      <main>
        <section id="who-we-are" className="flex-columns">
          <div className="row">
            <div className="column">
              <div className="column-1">
                <Image
                  id="test"
                  src="/afbeeldingen/kelderdeuntjes2.jpg"
                  alt=""
                  width="5184"
                  height="3456"
                  layout="responsive"
                  objectFit="scale-down"
                />
              </div>
            </div>
            <div className="column">
              <div className="column-2 bg-primary">
                <h2>Who are we</h2>
                <p>
                  Kelderdeuntjes is a techno minimal concept that has been
                  rocking the dance floor since 2016. The first baby steps were
                  taken in the backstage room of the legendary club "La Rocca"!
                  <br />
                  <br />
                  It soon became clear that this concept was something special
                  and we moved to the ballroom of la rocca. Where legendary
                  evenings are etched in the memories of many techno lovers.
                  Such as evenings with Joyhauser, Amelie lens, Dense & pika,
                  Joran van pol and many more...
                  <br />
                  <br />
                  It became clear that we had to spread our wings and make our
                  mark in the Belgian techno scene starting in Antwerp. We had
                  events in: De Spiegeltent , club vague de and beautiful
                  collabs in zodiac with Antwerp techno & untz untz and one in
                  the shop with B-rave!
                  <br />
                  <br />
                  Besides all that party violence, we also try to be a platform
                  for upcoming DJ/producer within our capabilities.
                  <br />
                  <br />
                  Since the far-reaching measures, we have started a 2-weekly
                  podcast on soundcloud where national and international DJs
                  fire a podcast of +/- one hour at us!
                  <br />
                  <br />
                  We hope to see you back on our dance floor soon And don’t
                  forget ravers…. KEEP ON RAVING!!
                </p>
                <Link href="/Booking">
                  <a className="btn btn-outline">Hire us</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <SimpleSlider />;
        <section id="who-we-are" className="flex-columns flex-reverse">
          <div className="row">
            <div className="column">
              <div className="column-1 affiche">
                <Image
                  src={`/afbeeldingen/${future.Affiche}`}
                  alt="affiche"
                  width="auto"
                  height="auto"
                  layout="responsive"
                  objectFit="scale-down"
                  priority={true}
                />
              </div>
            </div>
            <div className="column">
              <div className="column-2 bg-primary">
                <h2>Upcoming event</h2>
                <h3>{future.Naam}</h3>
                <h3>{moment(future.Datum).format("DD/MM/YYYY")}</h3>
                <h4>{future.Locatie}</h4>
                <a
                  className="btn btn-outline-light"
                  href={`/event/${future.FeestID}/${slugify(future.Naam, {
                    strict: true,
                    lower: true,
                  })}`}
                >
                  <i className="fas fa-chevron"></i>
                  Info
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="newsletter bg bg-dark">
          <h2>Subscribe</h2>
          <p>
            Subscribe to our newsletter and don't miss out on the latest news
            and be first to book your tickets for upcoming events!
          </p>
          <div className="subscribe">
            <form className="newsletter" onSubmit={(e) => submitForm(e)}>
              <input
                type="text"
                value={fn}
                onChange={(e) => setFn(e.target.value)}
                placeholder="First Name"
                name="TxtFistName"
              />
              <input
                type="text"
                value={ln}
                onChange={(e) => setLn(e.target.value)}
                placeholder="Last Name"
                name="txtLastName"
              />
              <input
                type="email"
                value={em}
                onChange={(e) => setEm(e.target.value)}
                placeholder="Email adress"
                name="txtEmail"
              />
              <input
                type="submit"
                id="submit"
                value="submit"
                className="btn btn-outline-light"
              />
            </form>
            {/*    <a href="#" >
              <i className="fas fa-chevron"></i>
              Sign up
            </a> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  //2. Query uitvoeren //
  const data = await knex("feestjes")
    .where("Datum", ">=", new Date())
    .orderBy("Datum", "ASC");

  const future = JSON.parse(JSON.stringify(data[0]));

  return {
    props: {
      future,
    },
  };
}
