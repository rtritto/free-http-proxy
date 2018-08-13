# free-http-proxy

by default, proxy come from https://www.us-proxy.org/

# usage

```
const P = require('free-http-proxy')

const t = new P('https://free-proxy-list.net/uk-proxy.html');

(async ()=>{
  await t.loadPage(require('fs').readFileSync('test-html.txt',{encoding:'utf-8'}))
  console.log(await t.getProxy())
  console.log(await t.getProxy(true)) //force update
  console.log(await t.getProxy(true)) //force update
  console.log(await t.getProxy(true)) //force update
  console.log(await t.getProxy())
  console.log(await t.getProxy())
})()

/*
{ ip: '45.76.0.232',
  port: '8118',
  code: 'US',
  country: 'United States',
  anonymity: 'elite proxy',
  google: 'no',
  isHttps: true,
  lastChecked: '0 seconds ago',
  url: 'https://45.76.0.232:8118' }
{ ip: '138.68.59.192',
  port: '8080',
  code: 'US',
  country: 'United States',
  anonymity: 'anonymous',
  google: 'no',
  isHttps: false,
  lastChecked: '1 minute ago',
  url: 'http://138.68.59.192:8080' }
{ ip: '50.115.106.98',
  port: '3128',
  code: 'US',
  country: 'United States',
  anonymity: 'anonymous',
  google: 'no',
  isHttps: false,
  lastChecked: '1 minute ago',
  url: 'http://50.115.106.98:3128' }
{ ip: '207.246.112.24',
  port: '80',
  code: 'US',
  country: 'United States',
  anonymity: 'anonymous',
  google: 'no',
  isHttps: false,
  lastChecked: '1 minute ago',
  url: 'http://207.246.112.24:80' }
{ ip: '207.246.112.24',
  port: '80',
  code: 'US',
  country: 'United States',
  anonymity: 'anonymous',
  google: 'no',
  isHttps: false,
  lastChecked: '1 minute ago',
  url: 'http://207.246.112.24:80' }
{ ip: '207.246.112.24',
  port: '80',
  code: 'US',
  country: 'United States',
  anonymity: 'anonymous',
  google: 'no',
  isHttps: false,
  lastChecked: '1 minute ago',
  url: 'http://207.246.112.24:80' }
*/

```