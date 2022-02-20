import type { NextPage } from 'next';
import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button } from '@backlight-dev/selection-inventory-n5vl9.blank-kztxz1qm/button/dist/Button.js';
//import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.blank-kztxz1qm/teaser-box/dist/TeaserBox.js';

const Home: NextPage = ({ spotifySavedTracks }: any) =>
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
        {spotifySavedTracks?.data?.spotify?.me?.savedTracks?.nodes.map((track: any, index: number) =>
          <a key={index} href="https://nextjs.org/docs" className={styles.card}>
            <h2>Artists: {track.artists.map((artist: any) => artist.name).join(', ')}</h2>
            <p>Track: {track.name}</p>
            <br/>
            <Button
              label="Listen"
              variant="outline"
            />
          </a>
        )}
      </div>
    </main>
  </div>;

export async function getServerSideProps({ req }: any) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

  const response = await fetch(`${baseUrl}/api/SpotifySavedTracksQuery`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const spotifySavedTracks = await response.json();

  return {
    props: {
      spotifySavedTracks,
    },
  };
}

export default Home;
