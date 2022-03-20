import React from "react";
import { storyblokEditable } from "@storyblok/react";

import { TrackTeaserBox as TSNMTrackTeaserBox } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/track-teaser-box/dist/TrackTeaserBox.js';

const TrackTeaserBox = ({ blok }) => {
  const { topic, text, image, preview } = blok;

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} data-test="track-teaser-box">
      <TSNMTrackTeaserBox
        topic={topic}
        text={text}
        image={image?.filename}
        preview={preview?.filename}
      />
    </div>
  );
};

export default TrackTeaserBox;


