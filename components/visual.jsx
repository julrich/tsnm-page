import React from "react";
import { storyblokEditable } from "@storyblok/react";

import { Visual as TSNMVisual } from "@backlight-dev/selection-inventory-n5vl9.tsnm-ds/visual/dist/Visual.js";

const Visual = ({ blok }) => {
  const { height, headline, text, image, horizontal, vertical } = blok;

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} data-test="visual">
      <TSNMVisual
        height={height}
        box={{
          enabled: true,
          headline: {
            level: "p",
            styleAs: "h2",
            content: headline,
            align: "left"
          },
          text: text,
          vertical,
          horizontal,
        }}
        media={{
          mode: 'image',
          image: {
            src: image.filename,
          },
        }}
      />
    </div>
  );
};

export default Visual;
