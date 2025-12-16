const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",   // ✅ garante que os assets sejam resolvidos corretamente
    clean: true
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3000,
    open: true,
    liveReload: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
      // favicon: path.resolve(__dirname, "assets", "icon", "favicon.ico") // opcional
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets", "icon"),
          to: path.resolve(__dirname, "dist", "assets", "icon")
        }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "assets/icon/[name][ext]"
        }
      }
    ]
  }
};