const path = require('path');

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd() + "/dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  }
};

