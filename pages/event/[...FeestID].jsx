import { knex } from "../../components/Helper";
import Image from "next/image";
import Link from "next/link";

const EventDetail = ({
  event: { Affiche, Ticketing_url, Prijs, Naam, Width, Height, Alt }, timetable
}) => {
  return (
    <>
      <header className="artistheader">
        <div className="content">
          <h1>{Naam}</h1>
        </div>
      </header>
      <section className="artistdetail">
        <div className="profile">
          <Image
            src={`/afbeeldingen/${Affiche}`}
            width={Width}
            height={Height}
            alt={Alt}
            priority={true}
            objectFit="contain"
          />
        </div>
        <div className="timetable" key={timetable.id}>
          From: {timetable.From}
          Till: {timetable.Till}
        </div>
        <div className="event-detail">
          <h1>{Naam}</h1>
          <div className="timetable"></div>
          <h1>Price: {Prijs}</h1>
          <Link href={Ticketing_url}>
            <a className="btn btn-outline-light">Tickets</a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default EventDetail;

export async function getServerSideProps(context) {
  const [id] = context.query.FeestID;
  console.log(id);
  const resp = await knex("Feestjes").where("FeestID", parseInt(id)).first();
  const res = await knex("timetable");
  const event = JSON.parse(JSON.stringify(resp));
  const timetable = JSON.parse(JSON.stringify(res));

  return {
    props: {
      event,
      timetable
    },
  };
}
