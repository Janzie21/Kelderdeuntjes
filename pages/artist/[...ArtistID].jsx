import { knex } from "../../components/Helper";
import Image from "next/image";
import Test from "../Social";

const ArtistDetail = ({
  artist: { Profielfoto, Omschrijving, Naam, Width, Height, Alt },
}) => {
  const omschrijving = { __html: Omschrijving };
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
          {/* <Test /> */}
        </div>
      </section>
    </>
  );
};

export default ArtistDetail;

export async function getServerSideProps(context) {
  const [id] = context.query.ArtistID;
  console.log(id);
  const resp = await knex("Artists").where("ArtistID", parseInt(id)).first();
  const artist = JSON.parse(JSON.stringify(resp));
  console.log(artist);
  return {
    props: {
      artist,
    },
  };
}
