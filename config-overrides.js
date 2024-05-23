const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    fs: false,
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
  };
  return config;
};
