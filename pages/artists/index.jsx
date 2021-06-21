import Image from "next/image";
import { knex } from "../../components/Helper";
import Link from "next/link";
import slugify from "slugify";
import * as React from "react";

const Artists = ({ artists }) => {
  return (
    <>
      <header className="artistheader">
        <div className="content">
          <h1>Artists</h1>
        </div>
      </header>
      <>
        <div className="gallery">
          {artists.map(({ArtistID, Profielfoto, Naam, Rol, Width, Height, Alt }) => (
            <div key={ArtistID} className="info">
              <Image
                src={`/afbeeldingen/${Profielfoto}`}
                priority={true}
                width={Width}
                height={Height}
                alt={Alt}
                objectFit="fill"
              />
              <h1>{Naam}</h1>
              <h4>{Rol}</h4>
              <Link
                href={`/artist/${ArtistID}/${slugify(Naam, {
                  strict: true,
                  lower: true,
                })}`}
              >
                <a className="btn btn-outline-light">Learn more</a>
              </Link>
            </div>
          ))}
        </div>
      </>
      );
    </>
  );
};

export default Artists;

export async function getServerSideProps() {
  //2. Query uitvoeren //
  const data = await knex("artists")
    .where("Rol", "=", "Resident")
    .orWhere("Rol", "=", "Founder");
  const artists = JSON.parse(JSON.stringify(data));
  return {
    props: {
      artists,
    },
  };
}
