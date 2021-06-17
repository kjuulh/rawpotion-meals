const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  silent: false,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports =
  process.env.NODE_ENV === "production"
    ? withSentryConfig(moduleExports, SentryWebpackPluginOptions)
    : {};
