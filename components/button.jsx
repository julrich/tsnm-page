import React from "react";
import { storyblokEditable } from "@storyblok/react";

import { Button as TSNMButton } from "@backlight-dev/selection-inventory-n5vl9.tsnm-ds/button/dist/Button.js";

const Button = ({ blok }) => {
  const { label, size, variant } = blok;

  return (
    <div {...storyblokEditable(blok)} key={blok._uid} data-test="button">
      <TSNMButton
        label={label}
        size={size}
        variant={variant}
      />
    </div>
  );
};

export default Button;
