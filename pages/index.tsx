import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button } from '@backlight-dev/selection-inventory-n5vl9.blank-kztxz1qm/button/dist/Button.js';
import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.blank-kztxz1qm/teaser-box/dist/TeaserBox.js';

//@ts-ignore
const Home: NextPage = ({ data }: { data: NetlifyGraph.SpotifySavedTracksQuery['data'] }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Personal page of TSNM / Jonas Ulrich. Musings about music and Dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="logo">
          <Image className="logo__image" src="https://i1.sndcdn.com/avatars-000003159261-cat82d-t200x200.jpg" alt="tsnm Logo" width={90} height={90} />
          <span className="logo__text">Personal homepage of TSNM</span>
        </div>

        <h2>Have a look at the last songs I&apos;ve saved on Spotify:</h2>

        <div className={styles.grid}>
          {data?.spotify?.me?.savedTracks?.nodes.map((track: any, index: number) =>
            <TeaserBox
              key={index}
              topic={`Artists: ${track.artists.map((artist: any) => artist.name).join(', ')}`}
              text={`Track: ${track.name}`}
              darkStyle
            />
          )}
        </div>
      </main>
    </div>
  )
}
  
export async function getServerSideProps({ req }: any) {
  const accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const { errors, data } = await NetlifyGraph.fetchSpotifySavedTracksQuery(
    {},
    { accessToken: accessToken }
  );

  return {
    props: {
      data,
    },
  };
}

export default Home;
