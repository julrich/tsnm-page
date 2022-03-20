const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")([
  "@backlight-dev/selection-inventory-n5vl9.tsnm-ds",
  "@kickstartds/core",
  "@kickstartds/base",
  "@kickstartds/content",
  "@kickstartds/blog",
]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    images: {
      domains: ['i1.sndcdn.com'],
    },
    target: 'serverless',
    generateBuildId: () => "build",
    trailingSlash: true,
  })
);

module.exports = nextConfig;
