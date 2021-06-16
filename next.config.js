const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const path = require("path");

module.exports = withBundleAnalyzer({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
});
