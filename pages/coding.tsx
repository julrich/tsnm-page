import NetlifyGraph from "../lib/netlifyGraph";
import type { NextPage } from 'next';
import Head from "next/head";
import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";

import { TeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/teaser-box/dist/TeaserBox.js';
import { Section } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';

//@ts-ignore
const Coding: NextPage = ({ story: initialStory, repositories }) => {
  const story = useStoryblokState(initialStory);

  return (
    <>
      <Head>
        <title>Coding page of TSNM / Jonas Ulrich</title>
        <meta name="description" content="Coding page of TSNM / Jonas Ulrich. Everything I love about coding" />
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
  
export async function getStaticProps({ preview = false }: any) {
  const accessToken = process.env.ONEGRAPH_AUTHLIFY_TOKEN;
  const repositories = await NetlifyGraph.fetchGithubStarredReposQuery(
    {},
    { accessToken: accessToken }
  )

  console.log('repositories index', repositories);

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/coding`, {
    version: "published"
  });

  console.log('story coding', data);

  return {
    props: {
      story: data ? data.story : false,
      preview,
      repositories: repositories?.data?.gitHub?.user?.starredRepositories?.edges,
    },
  };
}

export default Coding;
