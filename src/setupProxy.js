const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://jeatest.store/Cakeke",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
