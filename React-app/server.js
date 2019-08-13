const ParcelProxyServer = require('parcel-proxy-server');

const server = new ParcelProxyServer({
  entryPoint: './index.html',
  proxies: {
    '/api': {
      target: 'http://localhost:3000/'
    }
  }
});

server.listen(3001, () => {
  console.log("\nParcel proxy server running at \u001b[36m" + "http://localhost:3001" + "\u001b[0m");
});