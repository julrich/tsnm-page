import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";

import { TrackTeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/track-teaser-box/dist/TrackTeaserBox.js';
import { Section } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';

//@ts-ignore
const Music: NextPage = ({ story: initialStory, tracks }) => {
  const story = useStoryblokState(initialStory);

  return (
    <>
      <Head>
        <title>Music page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Music page of TSNM / Jonas Ulrich. Everything I love about music" />
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
    </>
  )
};
  
export async function getStaticProps({ preview = false }: any) {
  const accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;

  const { errors: _, data: savedTracksData } = await NetlifyGraph.fetchSpotifySavedTracksQuery(
    {},
    { accessToken: accessToken }
  );

  const tracks = await Promise.all(savedTracksData?.spotify?.me?.savedTracks.nodes?.map(async (track) => {
    const { errors: _, data: coverData } = await NetlifyGraph.fetchSpotifyArtistCoverQuery(
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

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/music`, {
    version: "published"
  });

  return {
    props: {
      tracks,
      story: data ? data.story : false,
      preview,
    },
  };
}

export default Music;
