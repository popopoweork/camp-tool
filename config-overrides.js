const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");
const path = require("path");

module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  console.log(config);
  console.log(JSON.stringify(process.env));
  return {
    ...config,
    output: {
      ...config.output,
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
    ],
    resolve: {
      ...config.resolve,
      //   fallback: {
      //     // fs: false,
      //     os: false,
      //     path: false,
      //     crypto: false,
      //   },
    },
  };
};
