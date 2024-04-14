const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://52.79.120.153:8080/Cakeke",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
