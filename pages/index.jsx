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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  pariatur error ad cupiditate rerum labore iste excepturi illo
                  molestiae itaque laborum optio, aut sed illum. Aliquam minus
                  quae officiis perferendis? Sint illo aliquid asperiores autem
                  expedita vitae voluptates reiciendis nostrum, nisi possimus
                  ipsum impedit ullam porro. Odit, autem itaque consectetur,
                  eligendi excepturi nobis, sunt repudiandae iste necessitatibus
                  nostrum fuga nisi. Molestias, ma gni? Aspernatur incidunt
                  velit odit rerum quo blanditiis inventore voluptatibus,
                  commodi enim ad sit assumenda debitis quaerat nemo iusto
                  mollitia minima dolorum excepturi, unde explicabo.
                  Voluptatibus libero iure tenetur! At quasi ipsa, voluptates
                  reiciendis voluptas qui vitae suscipit eos error? Animi,
                  architecto? Numquam recusandae rem obcaecati. Quibusdam quos
                  porro obcaecati ut voluptate consequuntur modi libero enim,
                  dignissimos maxime aspernatur. Nam voluptatum doloribus
                  nesciunt explicabo voluptatibus nemo ipsum deserunt
                  consectetur voluptatem rerum. Explicabo porro maxime officia,
                  laboriosam id perferendis molestias quasi provident, dolores
                  sed doloribus corrupti labore qui, animi in. Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Ex voluptates
                  accusamus dolorem! Nihil dolores qui amet, reprehenderit
                  perspiciatis porro, neque eos quasi ducimus id similique
                  distinctio veniam eum asperiores? Non? Fugit at quibusdam
                  dignissimos eos officia ea ut nihil voluptates voluptas
                  quaerat ratione quam delectus quae consequuntur illo, quas
                  odio vel corporis explicabo molestias quia vitae tempore modi
                  sequi. Asperiores! Nesciunt, ab incidunt. Esse nisi quisquam
                  corporis iusto neque. Eum obcaecati, sapiente nihil blanditiis
                  repellendus saepe possimus vel, cumque hic enim sit fugit
                  doloribus corrupti veniam quisquam laborum culpa pariatur!
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
