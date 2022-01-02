# regoch-web-server
> Regoch Web Server is the HTTP Server and Reverse Proxy. It serves single page applications (SPA).

It's the backend and proxy server for the [Regoch Web ](https://github.com/smikodanic/regoch-web) framework.

## Features
- HTTP Server for single page applications such as apps made in regoch-web framework
- Reverse Proxy Server which makes single page applications SEO optimised for bots like GoogleBot, BingBot ...etc.
- Reverse Proxy is using puppeteer to open SPA on the backend side (server side render)

## Installation
```bash
npm install --save regoch-web-server
```

## Example
```javascript
const { HTTPServer, ProxyServer } = require('regoch-web-server');

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
```

## Documentation
[http://www.regoch.org/web-server](http://www.regoch.org/web-server)


### Licence
Copyright (c) 2020 Saša Mikodanić licensed under [MIT](./LICENSE).
