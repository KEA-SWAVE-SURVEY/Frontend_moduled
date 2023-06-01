const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    const backAddress = process.env.REACT_APP_BACK_ADDRESS + ":" + process.env.REACT_APP_BACK_PORT + "/";
    app.use(
        "/api", //첫번째 Path (endpoint)
        createProxyMiddleware({
        target: backAddress,
        changeOrigin: true, })
); }

