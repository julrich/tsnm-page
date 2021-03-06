import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";

import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/teaser-box/dist/TeaserBox.js';
import { TrackTeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/track-teaser-box/dist/TrackTeaserBox.js';
import { Section } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';

//@ts-ignore
const Home: NextPage = ({ story: initialStory, tracks, repositories }) => {
  const story = useStoryblokState(initialStory);

  return (
    <>
      <Head>
        <title>Personal page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Personal page of TSNM / Jonas Ulrich. Musings about music and Dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section mode="list" width="max" headline={{
        level: 'h2',
        styleAs: 'h3',
        align: 'left',
        content: 'Content injected through Storyblok',
      }}>
        {story.content && <StoryblokComponent blok={story.content} />}
      </Section>

      <Section mode="default" spaceAfter="none" background="default" width="max" headline={{
        level: 'h2',
        styleAs: 'h3',
        align: 'left',
        content: "Have a look at the last songs I've saved on Spotify...",
      }} />
 
      <Section mode="slider" background="dark" width="max">
        {tracks.map((track: any, index: number) =>
          <TrackTeaserBox
            image={track.cover}
            ratio="1:1"
            key={index}
            topic={track.title}
            text={`**Artist**: ${track.artist}`}
            darkStyle
            preview={track.preview}
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
};
  
export async function getStaticProps({ preview = false }: any) {
  const accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const { data: savedTracksData } = await NetlifyGraph.fetchSpotifySavedTracksQuery(
    {},
    { accessToken: accessToken }
  );

  const tracks = await Promise.all(savedTracksData?.spotify?.me?.savedTracks.nodes?.map(async (track) => {
    const { data: coverData } = await NetlifyGraph.fetchSpotifyArtistCoverQuery(
      {
        artistId: track.artists[0].id
      },
      { accessToken: accessToken }
    );  

    return {
      artists: track.artists.map((artist) => artist.name).join(', '),
      artist: track.artists[0].name,
      title: track.name,
      cover: coverData.spotify.artist.images[0].url,
      genres: coverData.spotify.artist.genres.join(', '),
      link: track.externalUrls.spotify,
      length: track.durationMs,
      preview: track.previewUrl,
    }
  }));

  const repositories = await NetlifyGraph.fetchGithubStarredReposQuery(
    {},
    { accessToken: accessToken }
  )

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/home`, {
    version: "published"
  });

  return {
    props: {
      tracks,
      repositories: repositories?.data?.gitHub?.user?.starredRepositories?.edges,
      story: data ? data.story : false,
      preview,
    },
  };
}

export default Home;
