import * as webpack from "webpack";
import * as path from "path";

const entry: webpack.Entry = {
  main: "./src/main.ts"
}

const output: webpack.Output = {
  filename: "bundle.js",
  path: path.resolve(process.cwd() + "/dist")
}

const module: webpack.Module = {
  rules: [
    {
      test: /\.ts$/,
      use: "ts-loader",
    }
  ]
}

const resolve: webpack.Resolve = {
  extensions: [
    '.ts', '.js',
  ],
}

const config: webpack.Configuration = {
  entry: entry,
  output: output,
  module: module,
  resolve: resolve
};

export default config;

