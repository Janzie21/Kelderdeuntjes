import classes from "./Gallery.module.css";
import { knex } from "../components/Helper";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { SRLWrapper } from "simple-react-lightbox";
import Select from "react-select";

const Gallery = ({ images, feestjes }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = feestjes.map((feestje) => ({
    label: feestje.Naam,
    value: feestje.FeestID,
  }));

  const handleChange = ({ value }) => {
    setSelectedOption(value);
    console.log(typeof value, value);
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      color: "#000",
      width: "100",
      margin: "20px 50px",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#000",
      fontSize: "20px",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: "40vw",
      border: "1px solid #000",
      borderRadius: "10px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <>
      <header className={classes.galleryheader}>
        <div className={classes.content}>
          <h1>Gallery</h1>
        </div>
      </header>
      <div className="selector">
        <Select
          onChange={handleChange}
          options={options}
          instanceId="oma is geweldig"
          placeholder="Choose your event"
          styles={customStyles}
        />
      </div>
      <SRLWrapper>
        <div className={classes.gallery}>
          {images
            .filter((img) => {
              console.log(img.Feestjes_FeestID, selectedOption);
              if (selectedOption) {
                return img.Feestjes_FeestID === selectedOption;
              }

              return true;
            })
            .map(({ AfbeeldingID, Img, Width, Height, Alt }) => (
              <div key={AfbeeldingID} className={classes.info}>
                <Image
                  src={`/afbeeldingen/${Img}`}
                  priority={true}
                  width={Width}
                  height={Height}
                  alt={Alt}
                  objectFit="fill"
                  srl_gallery_image="true"
                />
              </div>
            ))}
        </div>
      </SRLWrapper>
    </>
  );
};

export default Gallery;

export async function getServerSideProps() {
  //2. Query uitvoeren //
  const data = await knex("afbeeldingen");
  const otherData = await knex("feestjes").where("Datum", "<", new Date());
  /*  console.log(data);
  console.log(otherData); */
  const images = JSON.parse(JSON.stringify(data));
  const feestjes = JSON.parse(JSON.stringify(otherData));

  return {
    props: {
      images,
      feestjes,
    },
  };
}
