import { knex } from "../../components/Helper";
import Image from "next/image";
import Link from "next/link";
import classes from "../Events.module.css";
import moment from "moment";

const EventDetail = ({
  event: { Affiche, Ticketing_url, Prijs, Naam, Width, Height, Alt, Datum },
  timetable,
}) => {
  return (
    <>
      <header className={classes.eventheader}>
        <div className={classes.content}>
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
        <div className={classes.eventdetail}>
          <h1>{Naam}</h1>
          <h1>{moment(Datum).format("DD/MM/YYYY")}</h1>
          <h1>Price: {Prijs}</h1>
          <Link href={Ticketing_url}>
            <a className="btn btn-outline-light">Tickets</a>
          </Link>
        </div>
        <div className={classes.timetable} key={timetable.id}>
          <h1>Timetable</h1>
          <div className="time">
            <p>Artist:</p>
            <p>From: {timetable.From}</p>
            <p>Till: {timetable.Till}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetail;

export async function getServerSideProps(context) {
  const [id] = context.query.FeestID;
  console.log(id);
  const resp = await knex("feestjes").where("FeestID", parseInt(id)).first();
  const res = await knex("timetable");
  const event = JSON.parse(JSON.stringify(resp));
  const timetable = JSON.parse(JSON.stringify(res));

  return {
    props: {
      event,
      timetable,
    },
  };
}
