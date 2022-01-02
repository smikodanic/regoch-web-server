const { HTTPServer, ProxyServer } = require('../index.js');

///// HTTP Server /////
const httpOpts = {
  port: 4400,
  timeout: 5 * 60 * 1000, // if 0 never timeout
  retries: 10,
  indexFile: '/client/_dist/views/index.html',
  distDir: '/client/_dist',
  assetsDir: '/client/assets',
  acceptEncoding: 'gzip', // gzip, deflate or ''
  headers: {
    // CORS Headers
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Max-Age': '3600'
  },
  debug: false
};
const httpServer = new HTTPServer(httpOpts);
httpServer.start();

///// Proxy Server /////
const proxyOpts = {
  port: 4401,
  request_host: '127.0.0.1', // HTTP server host
  request_port: 4400, // HTTP Server port
  regexpUA: /bot|spider|crawl/i, // open URL via puppeteer/browser when user agent contains this regular expression
  debug: false
};
const browserOpts = { headless: true, width: 1300, height: 900, position: '700,20' };
const proxyServer = new ProxyServer(proxyOpts, browserOpts);
proxyServer.openBrowser();
proxyServer.start();
