import React from "react";
import { storyblokEditable } from "@storyblok/react";

import { Section as TSNMSection } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/section/dist/Section.js';
import TrackTeaserBox from "./track-teaser-box";

const componentMap = {
  'track-teaser-box': TrackTeaserBox,
};

const Section = ({ blok }) => {
  const { mode, background, blocks } = blok;

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} data-test="section">
      <TSNMSection
        mode={mode}
        background={background}
      >
        {blocks && blocks.length > 0 && blocks.map((blok) => componentMap[blok.component]({blok}))}
      </TSNMSection>
    </div>
  );
};

export default Section;


