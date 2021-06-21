import classes from "./Podcasts.module.css";
import { knex } from "../components/Helper";
import ReactPlayer from "react-player";

const Podcasts = ({ podcasts }) => {
  return (
    <>
      <header className={classes.podcastheader}>
        <div className={classes.content}>
          <h1>Podcasts</h1>
        </div>
      </header>
      <div className={classes.podcastsection}>
        {podcasts.map(({ id, Stream_title, Path, Img, Width, Heigth, Alt }) => (
          <div key={id} className={classes.podcast}>
            <div className={classes.podcastinfo}>
              <h1>{Stream_title}</h1>
              <ReactPlayer url={Path} height={200} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Podcasts;

export async function getServerSideProps() {
  //2. Query uitvoeren //
  const data = await knex("podcasts");
  console.log(data);
  const podcasts = JSON.parse(JSON.stringify(data));
  return {
    props: {
      podcasts,
    },
  };
}
