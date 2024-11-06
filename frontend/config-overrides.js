const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "url": require.resolve("url/")
    };
    return config;
};
