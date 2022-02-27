import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import Image from 'next/image';

import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/teaser-box/dist/TeaserBox.js';
import { Section } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';

//@ts-ignore
const Home: NextPage = ({ tracks }) => {
  return (
    <div>
      <Head>
        <title>Personal page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Personal page of TSNM / Jonas Ulrich. Musings about music and Dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Section mode="list" width="wide">
          <div className="logo">
            <Image className="logo__image" src="https://i1.sndcdn.com/avatars-000003159261-cat82d-t200x200.jpg" alt="tsnm Logo" width={90} height={90} />
            <span className="logo__text">Personal homepage of TSNM / Jonas Ulrich</span>
          </div>
          <h2>Have a look at the last songs I&apos;ve saved on Spotify:</h2>
        </Section>

        <Section mode="default" width="wide">
          {tracks.map((track: any, index: number) =>
            <TeaserBox
              image={track.cover}
              ratio="1:1"
              key={index}
              topic={track.artists}
              text={`**Track**: ${track.title}\n\n---\n\n**Genre**: ${track.genres}`}
              darkStyle
           />
          )}
        </Section>
      </main>
    </div>
  )
}
  
export async function getStaticProps({ req }: any) {
  const accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const { errors: savedTracksErrors, data: savedTracksData } = await NetlifyGraph.fetchSpotifySavedTracksQuery(
    {},
    { accessToken: accessToken }
  );

  const tracks = await Promise.all(savedTracksData.spotify?.me?.savedTracks.nodes?.map(async (track) => {
    const { errors: coverErrors, data: coverData } = await NetlifyGraph.fetchSpotifyArtistCoverQuery(
      {
        artistId: track.artists[0].id
      },
      { accessToken: accessToken }
    );  

    return {
      artists: track.artists.map((artist) => artist.name).join(', '),
      title: track.name,
      cover: coverData.spotify.artist.images[0].url,
      genres: coverData.spotify.artist.genres.join(', '),
    }
  }));

  return {
    props: {
      tracks
    },
  };
}

export default Home;
