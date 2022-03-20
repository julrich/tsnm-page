import React from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { extendTheme, ChakraProvider } from '@chakra-ui/react';

import theme from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/chakra-theme/dist/theme.js';
import '../styles/logo.css';
import '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/style.css';

import '@kickstartds/base/lib/global/base.js';
import '@kickstartds/base/lib/global/base.css';

import type { AppProps } from 'next/app';

import { IconSprite } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/icon-sprite/dist/IconSprite.js';
import { Header } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/header/dist/Header.js';
import { Footer } from '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/footer/dist/Footer.js';

import Teaser from "../components/teaser";
import Grid from "../components/grid";
import Page from "../components/page";
import Feature from "../components/feature";
import Button from "../components/button";
import TrackTeaserBox from "../components/track-teaser-box";
import Section from "../components/section";
import Visual from "../components/visual";

storyblokInit({
  accessToken: "5nEKBbMiAAGVNY7eKXIlQQtt", // preview
  // accessToken: "LzSygSt5XdWfueUQpeTuOAtt", // public
  // accessToken: "OurklwV5XsDJTIE1NJaD2wtt", // demo
  use: [apiPlugin],
  components: {
    teaser: Teaser,
    grid: Grid,
    feature: Feature,
    page: Page,
    button: Button,
    "track-teaser-box": TrackTeaserBox,
    section: Section,
    visual: Visual,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <IconSprite />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
