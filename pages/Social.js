import React from "react";
import { knex } from "../components/Helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSoundcloud,
  faInstagram,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Social({ data }) {
  console.log(data);

  return (
    <div className="social">
      {data.map((artiest) => (
        <>
          <ul>
            <li>
              {artiest.links.map((link) => (
                <p>{link.url}</p>
              ))}
            </li>
          </ul>
        </>
      ))}
      <a href={data} target="_blank">
        <span className="facebook">
          <FontAwesomeIcon icon={faFacebookF} className="fa-2x" />
        </span>
      </a>

      <a href={data}>
        <span className="insta">
          <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
        </span>
      </a>
      <a href={data}>
        <span className="soundcloud">
          <FontAwesomeIcon icon={faSoundcloud} className="fa-2x" />
        </span>
      </a>
      <a href={data}>
        <span className="email">
          <FontAwesomeIcon icon={faEnvelope} className="fa-2x" />
        </span>
      </a>
    </div>
  );
}

export default Social;

export async function getServerSideProps() {
  const sql =
    'SELECT artists.*, JSON_ARRAYAGG( JSON_OBJECT("url", `social-links`.`Url`, "id", `social-links`.id)) AS links, JSON_ARRAYAGG( JSON_OBJECT("id", services.ServicesID, "naam", `services`.`Naam`)) AS services FROM artists JOIN `social-links` ON artists.ArtistID = `social-links`.Artists_ArtistID JOIN `services` ON services.ServicesID = `social-links`.`Services_ServicesID` GROUP BY ArtistID';
  // const sql = knex
  //   .select(
  //     "a.ArtistID AS _id",
  //     "a.Naam AS _naam",
  //     "sl.id AS _social_id",
  //     "sl.Url AS _social_url",
  //     // "s.ServicesID AS _service_id",
  //     // "s.Naam AS _service_naam"
  //   )
  //   .from("artists AS a")
  //   .leftJoin("social-links AS sl", "a.ArtistID", "sl.Artists_ArtistID");
  // //.leftJoin("services AS s", "s.ServicesID", "sl.Services_ServicesID");

  const resp = await knex.raw(sql);
  //console.log(resp);
  return {
    props: {
      data: JSON.parse(JSON.stringify(resp[0])),
    },
  };
}
