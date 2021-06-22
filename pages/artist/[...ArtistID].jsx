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
  console.log(socialLinks);
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
            return (
              <div key={socialLink.id}>
                <p>
                 <a href={socialLink.url}>{socialLink.url}</a>
                </p>
              </div>
            );
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
}
