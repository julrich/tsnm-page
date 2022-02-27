import '../styles/logo.css';
import '@backlight-dev/selection-inventory-n5vl9.tsnm-ds/style.css';

import '@kickstartds/base/lib/global/base.js';
// import '@kickstartds/base/lib/global/base.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
