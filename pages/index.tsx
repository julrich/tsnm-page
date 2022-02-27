import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import Image from 'next/image';

import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/teaser-box/dist/TeaserBox.js';
import { Section } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';

const msToTime = (s:number) => {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;

  return mins + ':' + secs;
};

//@ts-ignore
const Home: NextPage = ({ tracks, repositories }) => {
  return (
    <>
      <Head>
        <title>Personal page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Personal page of TSNM / Jonas Ulrich. Musings about music and Dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section mode="list" width="max">
        <div className="logo">
          <Image className="logo__image" src="https://i1.sndcdn.com/avatars-000003159261-cat82d-t200x200.jpg" alt="tsnm Logo" width={90} height={90} />
          <h1 className="logo__text">Personal homepage of TSNM / Jonas Ulrich</h1>
        </div>
      </Section>

      <Section mode="slider" background="accent" width="max" headline={{
        level: 'h2',
        styleAs: 'h3',
        align: 'left',
        content: "Have a look at the last songs I've saved on Spotify...",
      }}>
        {tracks.map((track: any, index: number) =>
          <TeaserBox
            image={track.cover}
            ratio="1:1"
            key={index}
            topic={track.artists}
            text={`**Track**: ${track.title}\n\n**Length**: ${msToTime(track.length)} min\n\n---\n\n**Genre**: ${track.genres}`}
            darkStyle
            link={{
              label: 'Open on Spotify',
              size: 'medium',
              variant: 'solid-inverted',
              href: track.link,
            }}
          />
        )}
      </Section>

      <Section mode="slider" width="max" headline={{
        level: 'h2',
        styleAs: 'h3',
        align: 'left',
        content: "... or have a look at the last repositories I've saved on Github",
      }}>
        {repositories.map((repository: any, index: number) =>
          <TeaserBox
            ratio="16:9"
            key={index}
            topic={repository.node.nameWithOwner}
            text={`**Description**: ${repository.node.description || '*No description*'}\n\n---\n\n**Stars**: ${repository.node.stargazerCount}`}
            link={{
              label: 'Open on Github',
              size: 'medium',
              variant: 'outline',
              href: repository.node.url,
            }}
          />
        )}
      </Section>
    </>
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
      link: track.externalUrls.spotify,
      length: track.durationMs,
    }
  }));

  const repositories = await NetlifyGraph.fetchGithubStarredReposQuery(
    {},
    { accessToken: accessToken }
  )

  return {
    props: {
      tracks,
      repositories: repositories.data.gitHub.user.starredRepositories.edges,
    },
  };
}

export default Home;
