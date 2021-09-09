const path = require("path");
module.exports = {
  publicPath: "./",
  assetsDir: "./static",
  lintOnSave: false, // 是否开启eslint
  productionSourceMap: false,
  configureWebpack: () => {
    return {
      resolve: {
        alias: {
          "@": path.resolve("src"),
        },
      },
    };
  },
};
