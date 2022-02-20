const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")([
  "@kickstartds/core",
  "@kickstartds/base",
  "@kickstartds/content",
  "@kickstartds/blog",
  "@backlight-dev/selection-inventory-n5vl9.blank-kztxz1qm",
]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM(
  withBundleAnalyzer({
    reactStrictMode: true,
    generateBuildId: () => "build",
  })
);

module.exports = nextConfig;
