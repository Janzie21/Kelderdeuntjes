import { knex } from "../../components/Helper";
import Image from "next/image";

const ArtistDetail = ({
  artist: { Profielfoto, Omschrijving, Naam, Width, Height, Alt, ArtistID },
  data,
}) => {
  const omschrijving = { __html: Omschrijving };
  console.log(data);
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
            src={`/afbeeldingen/${Profielfoto}`}
            width={Width}
            height={Height}
            alt={Alt}
            priority={true}
          />
        </div>
        <div className="artist-detail">
          <div dangerouslySetInnerHTML={omschrijving}></div>
          {data.map((artiest) => (
            <>
              <ul>
                <li key={artiest.ArtistID}>
                  {artiest.links
                    .filter((link) => artiest.ArtistID === ArtistID)
                    .map((link) => (
                      <div>
                        <a href={link.url}>{link.url}</a>
                      </div>
                    ))}
                </li>
              </ul>
            </>
          ))}
        </div>
      </section>
    </>
  );
};

export default ArtistDetail;

export async function getServerSideProps(context) {
  const sql =
    'SELECT artists.*, JSON_ARRAYAGG(JSON_OBJECT("url", `social-links`.`Url`, "id", `social-links`.id)) AS links, JSON_ARRAYAGG(JSON_OBJECT("id", services.ServicesID, "naam", `services`.`Naam`)) AS services FROM artists JOIN `social-links` ON artists.ArtistID = `social-links`.Artists_ArtistID JOIN `services` ON services.ServicesID = `social-links`.`Services_ServicesID` GROUP BY ArtistID';
  const res = await knex.raw(sql);
  const [id] = context.query.ArtistID;
  console.log(id);
  const resp = await knex("artists").where("ArtistID", parseInt(id)).first();
  const artist = JSON.parse(JSON.stringify(resp));
  console.log(artist);
  return {
    props: {
      artist,
      data: JSON.parse(JSON.stringify(res[0])),
    },
  };
}
