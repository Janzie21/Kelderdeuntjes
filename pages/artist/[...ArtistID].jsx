import { knex } from "../../components/Helper";
import Image from "next/image";
import classes from "../artists.module.css";
/*
{
  artist: { Profielfoto, Omschrijving, Naam, Width, Height, Alt, ArtistID },
  data,
}
*/
const ArtistDetail = ({
  data: { naam, omschrijving, profielfoto, width, height, alt, socialLinks },
}) => {
  const htmlomschrijving = { __html: omschrijving };
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <header className={classes.artistheader}>
        <div className={classes.content}>
          <h1>{naam}</h1>
        </div>
      </header>
      <section className={classes.artistdetail}>
        <div className={classes.profile}>
          <Image
            src={`/afbeeldingen/${profielfoto}`}
            width={width}
            height={height}
            alt={alt}
            priority={true}
          />
        </div>
        <div className={classes.artistdetails}>
          <div dangerouslySetInnerHTML={htmlomschrijving}></div>
          {socialLinks.map((socialLink) => {
            <div key={socialLink.id}>
              <h1>{socialLink.naam}</h1>
              <p>{socialLink.url}</p>;
            </div>;
          })}
        </div>
      </section>
    </>
  );
};

export default ArtistDetail;

export async function getServerSideProps(context) {
  const NestHydrationJS = require("nesthydrationjs")();
  const queryResult = await knex
    .select(
      "a.ArtistID         AS  id",
      "a.Naam             AS  naam",
      "a.Omschrijving     AS  omschrijving",
      "a.Profielfoto      AS profielfoto",
      "a.Width            AS width",
      "a.Height           AS height",
      "a.Alt              AS alt",
      "sl.id              AS  sociallink_id",
      "sl.Url             AS  sociallink_url",
      "se.Naam            AS  services_naam"
    )
    .from("artists AS a")
    .leftJoin("social-links AS sl", "sl.Artists_ArtistID", "=", "a.ArtistID")
    .leftJoin("services AS se", "se.ServicesID", "=", "sl.Services_ServicesID")
    .where("a.ArtistID", parseInt(context.query.ArtistID));

  const definition = {
    id: { column: "id" },
    naam: { column: "naam" },
    omschrijving: { column: "omschrijving" },
    profielfoto: { column: "profielfoto" },
    width: { column: "width" },
    height: { column: "height" },
    alt: { column: "alt" },
    socialLinks: [
      {
        id: { column: "sociallink_id" },
        url: { column: "sociallink_url" },
        serviceNaam: { column: "services_naam" },
      },
    ],
  };

  const data = NestHydrationJS.nest(queryResult, definition);

  return {
    props: {
      data,
    },
  };

  // const sql =
  //   'SELECT artists.*, JSON_ARRAYAGG(JSON_OBJECT("url", `social-links`.`Url`, "id", `social-links`.id)) AS links, JSON_ARRAYAGG(JSON_OBJECT("id", services.ServicesID, "naam", `services`.`Naam`)) AS services FROM artists JOIN `social-links` ON artists.ArtistID = `social-links`.Artists_ArtistID JOIN `services` ON services.ServicesID = `social-links`.`Services_ServicesID` GROUP BY ArtistID';
  // const res = await knex.raw(sql);
  // const [id] = context.query.ArtistID;
  // console.log(id);
  // const resp = await knex("artists").where("ArtistID", parseInt(id)).first();
  // const artist = JSON.parse(JSON.stringify(resp));
  // console.log(artist);
  // return {
  //   props: {
  //     artist,
  //     data: JSON.parse(JSON.stringify(res[0])),
  //   },
  // };
}
