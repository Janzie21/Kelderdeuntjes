import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSoundcloud,
  faInstagram,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { knex } from "../components/Helper";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


const Social = ({ data }) => {
  console.log(data);
  return (
    <div className="social">
      {/* {data.links.map((link) => link.id === data.services.id)(
        <a href={link.url} target="_blank">
          <span className="facebook">
            <FontAwesomeIcon icon={faFacebookF} className="fa-2x" />
          </span>
        </a>
      )} */}

      <a href={data}>
        <span className="insta">
          <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
        </span>
      </a>
      {/*   <a href={Url}>
        <span className="spotify">
          <FontAwesomeIcon icon={faSpotify} className="fa-2x" />
        </span>
      </a> */}
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
};

export default Social;

export async function getServerSideProps() {
  const sql =
    'SELECT artists.*, JSON_ARRAYAGG( JSON_OBJECT("url", `social-links`.`Url`, "id", `social-links`.id)) AS links, JSON_ARRAYAGG( JSON_OBJECT("id", services.ServicesID, "naam", `services`.`Naam`)) AS services FROM artists JOIN `social-links` ON artists.ArtistID = `social-links`.Artists_ArtistID JOIN `services` ON services.ServicesID = `social-links`.`Services_ServicesID` GROUP BY ArtistID';

  const resp = await knex.raw(sql);
  const data = JSON.parse(JSON.stringify(resp[0]))
  console.log(data);
  return {
    props: {
      data
    },
  };
}
